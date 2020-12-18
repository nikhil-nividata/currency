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
          <h4>Compare Different Currencies</h4>
          <div
            style={{
              display: "flex",
            }}
          >
            <h6 className="valign-wrapper" style={{ paddingRight: "20px" }}>
              {" "}
              Select a base Currency{" "}
            </h6>
            <Select
              name="baseCurrencySelector"
              value={baseCurrency}
              onChange={this.onChange}
            />
          </div>
          {baseCurrency !== "" ? (
            <>
              <Card className="container">
                <ChartDrawer
                  label={baseCurrency}
                  chartId="chartFirst"
                  chartLabel={`Currencies edging low wrt ${baseCurrency}`}
                  currencyExchangeData={currencyExchangeData.slice(0, 21)}
                />
              </Card>
              <Card className="container">
                <ChartDrawer
                  label={baseCurrency}
                  chartId="chartSecond"
                  chartLabel={`Currencies edging moderately wrt ${baseCurrency}`}
                  currencyExchangeData={currencyExchangeData.slice(21, 30)}
                />
              </Card>
              <Card className="container">
                <ChartDrawer
                  label={baseCurrency}
                  chartLabel={`Currencies edging high wrt ${baseCurrency}`}
                  chartId="chartThird"
                  currencyExchangeData={currencyExchangeData.slice(30)}
                />
              </Card>
              <div style={{ height: "20px" }}></div>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}
