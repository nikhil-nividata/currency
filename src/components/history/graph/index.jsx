import React, { Component } from "react";
import Chart from "chart.js";
import Select from "../../homepage/select";
import CurrencyInfo from "../../../utils/currencyInfo";

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

class DrawGraph extends Component {
  constructor(props) {
    super(props);
    const { ratesArray } = this.props;
    this.state = {
      selectedCurrencies: new Map(),
      ratesArray,
      chartObj: null,
    };
  }

  handleSelect = (e) => {
    const { chartObj } = this.state;
    const selectedCurrencies = new Set();
    for (let i = 0; i < e.target.selectedOptions.length; ++i) {
      selectedCurrencies.add(e.target.selectedOptions.item(i).value);
    }
    const newObj = {
      selectedCurrencies,
    };
    if (chartObj === null) {
      const newChart = new Chart(document.getElementById("lineGraph"), {});
      newObj["chartObj"] = newChart;
    }
    this.setState(newObj);
  };

  componentDidUpdate() {
    console.log("RUN UPDATE");
    const dates = [];
    const datasets = [];
    const { ratesArray, selectedCurrencies, chartObj } = this.state;
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
    const chartOptions = {
      type: "line",
      data: {
        labels: dates,
        datasets: datasets,
      },
    };
    chartObj.options = chartOptions;
    chartObj.config = chartOptions;
    chartObj.update();
  }

  render() {
    const { selectedCurrencies } = this.state;
    return (
      <div>
        <Select
          onChange={this.handleSelect}
          value={Array.from(selectedCurrencies.values())}
          name="historySelectOption"
          multiple={true}
        />
        <canvas id="lineGraph" />
      </div>
    );
  }
}

export default DrawGraph;
