import React, { Component } from "react";
import Chart from "chart.js";
import { Select } from "react-materialize";
import CurrencyInfo from "../../utils/currencyInfo";

const colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(240, 248, 255,0.6)",
  "rgba(127, 255, 212,0.3)",
  "rgba(255, 235, 205,0.2)",
  "rgba(0, 255, 255,0.2)",
  "rgba(255, 248, 220,0.6)",
  "rgba(255, 0, 255, 0.2)",
  "rgba(255, 215, 0, 0.25)",
  "rgba(124, 252, 0, 0.25)",
  "rgba(255, 160, 122, 0.2)",
  "rgba(250, 50, 230, 0.2)",
  "rgba(221, 160, 221, 0.2)",
  "rgba(176, 224, 230, 0.2)",
  "rgba(70, 130, 180, 0.2)",
  "rgba(192, 192, 192, 0.2)",
  "rgba(216, 191, 216, 0.3)",
  "rgba(100, 58, 58, 0.2)",
  "rgba(0, 255, 0, 0.2)",
  "rgba(25, 250, 240, 0.2)",
  "rgba(105, 105, 105, 0.3)",
];

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historicData: [],
      ratesArray: [],
      selectedCurrencies: new Set(),
    };
  }

  handleSelect = (e) => {
    const selectedCurrencies = new Set();
    for (let i = 0; i < e.target.selectedOptions.length; ++i) {
      selectedCurrencies.add(e.target.selectedOptions.item(i).value);
    }
    this.setState({
      selectedCurrencies,
    });
  };

  async getComparisionData() {
    const response = await fetch(
      "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01"
    );
    const historicData = await response.json();
    const ratesArray = [];
    for (let dateStr in historicData.rates) {
      ratesArray.push({
        date: new Date(dateStr),
        ...historicData.rates[dateStr],
      });
    }
    ratesArray.sort((a, b) => {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      if (a.date.getTime() < b.date.getTime()) return -1;
      else if (a.date.getTime() === b.date.getTime()) return 0;
      else return 1;
    });
    this.setState({
      historicData,
      ratesArray,
    });
  }

  componentDidMount() {
    this.getComparisionData();
  }

  componentDidUpdate() {
    const dates = [];
    const datasets = [];
    const { ratesArray, selectedCurrencies } = this.state;
    let colorIndx = 0;
    selectedCurrencies.forEach((elem) => {
      datasets.push({
        label: CurrencyInfo.get(elem),
        data: [],
        fill: false,
        borderColor: colors[colorIndx],
        backgroundColor: colors[colorIndx++],
      });
    });
    ratesArray.forEach((elem) => {
      dates.push(elem["date"].toDateString());
      let i = 0;
      selectedCurrencies.forEach((curr) => {
        datasets[i++].data.push(elem[curr] === undefined ? 1 : elem[curr]);
      });
    });
    console.log(datasets);
    new Chart(document.getElementById("lineGraph"), {
      type: "line",
      data: {
        labels: dates,
        datasets: datasets,
      },
    });
  }

  render() {
    return (
      <div class="container">
        <Select
          style={{
            width: "100%",
          }}
          id="selectCountries"
          multiple
          options={{
            classes: "",
            dropdownOptions: {
              alignment: "left",
              autoTrigger: true,
              closeOnClick: true,
              constrainWidth: true,
              coverTrigger: true,
              hover: false,
              inDuration: 150,
              onCloseEnd: null,
              onCloseStart: null,
              onOpenEnd: null,
              onOpenStart: null,
              outDuration: 250,
            },
          }}
          value={Array.from(this.state.selectedCurrencies.values())}
          onChange={this.handleSelect}
        >
          <option disabled value="">
            Select Countries
          </option>
          {Array.from(CurrencyInfo.keys()).map((key) => {
            return (
              <option
                style={{
                  color: "black",
                }}
                value={key}
                key={key}
              >
                {CurrencyInfo.get(key)}
              </option>
            );
          })}
        </Select>
        <canvas id="lineGraph"></canvas>
      </div>
    );
  }
}
