import React, { Component } from "react";
import Chart from "chart.js";

class DrawChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartObj: {},
    };
  }

  getOptions = () => {
    const { label, currencyExchangeData } = this.props;
    const dataLabels = [];
    const data = [];
    currencyExchangeData.forEach((element) => {
      dataLabels.push(element.currency);
      data.push(element.rate);
    });
    return {
      type: "bar",
      data: {
        labels: dataLabels,
        datasets: [
          {
            label: `relative to ${label}`,
            data: data,
            backgroundColor: [
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
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgb(0, 0, 0,.15)",
              "aquamarine",
              "blanchedalmond",
              "cyan",
              "rgb(0, 0, 0,.15)",
              "magenta",
              "gold",
              "lawngreen",
              "lightsalmon",
              "rgb(250, 50, 230, 1)",
              "plum",
              "powderblue",
              "steelblue",
              "silver",
              "thistle",
              "rgba(0, 0, 0,.15)",
              "lime",
              "rgba(0, 0, 0,.15)",
              "dimgrey",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  };

  drawChart = () => {
    const { chartId } = this.props;
    const chartObj = new Chart(
      document.getElementById(chartId),
      this.getOptions()
    );
    this.setState({
      chartObj,
    });
  };

  updateChart = () => {
    const { chartObj } = this.state;
    chartObj.options = this.getOptions();
    chartObj.config = this.getOptions();
    chartObj.update();
  };

  componentDidUpdate() {
    this.updateChart();
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    const { chartId } = this.props;
    return <div>{<canvas id={chartId} width="400" height="160" />}</div>;
  }
}

export default DrawChart;
