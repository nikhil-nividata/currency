import React, { Component } from "react";
import styles from "./index.module.css";
import { Card } from "react-materialize";
import ChartDrawer from "./chart";
import Select from "../homepage/select";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: "",
      currencyExchangeData: [],
    };
  }
  onChange = async (e) => {
    const response = await fetch(
      `https://api.exchangeratesapi.io/latest?base=${e.target.value}`
    );
    const data = await response.json();
    const currencyExchangeData = [];
    for (let elem in data.rates) {
      currencyExchangeData.push({
        currency: elem,
        rate: data.rates[elem],
      });
    }
    currencyExchangeData.sort((a, b) => {
      if (a.rate < b.rate) return -1;
      else if (a.rate === b.rate) return 0;
      else return 1;
    });
    this.setState({
      baseCurrency: e.target.value,
      currencyExchangeData,
    });
  };
  render() {
    const { baseCurrency, currencyExchangeData } = this.state;
    console.log(currencyExchangeData);
    return (
      <div>
        <div className={styles.chartContainer}>
          <Select
            name="baseCurrencySelector"
            value={baseCurrency}
            onChange={this.onChange}
          />
          {baseCurrency !== "" ? (
            <>
              <Card className="container">
                <ChartDrawer
                  label={baseCurrency}
                  chartId="chartFirst"
                  currencyExchangeData={currencyExchangeData.slice(0, 21)}
                />
              </Card>
              <Card className="container">
                <ChartDrawer
                  label={baseCurrency}
                  chartId="chartSecond"
                  currencyExchangeData={currencyExchangeData.slice(21, 30)}
                />
              </Card>
              <Card className="container">
                <ChartDrawer
                  label={baseCurrency}
                  chartId="chartThird"
                  currencyExchangeData={currencyExchangeData.slice(30)}
                />
              </Card>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
