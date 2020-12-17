import React, { Component } from "react";
import Chart from "chart.js";
import styles from "./index.module.css";
import { Card } from "react-materialize";

export default class index extends Component {
  constructor(props) {
    super(props);
    const { currencyExchangeData } = this.props;
    const currs = new Map();
    currs.set(1, []);
    currs.set(2, []);
    currs.set(3, []);
    currs.set(4, []);
    const rates = new Map();
    rates.set(1, []);
    rates.set(2, []);
    rates.set(3, []);
    rates.set(4, []);
    for (const cur in currencyExchangeData.rates) {
      if (currencyExchangeData.rates[cur] < 40) {
        currs.get(1).push(cur);
        rates.get(1).push(currencyExchangeData.rates[cur]);
      } else if (currencyExchangeData.rates[cur] < 100) {
        currs.get(2).push(cur);
        rates.get(2).push(currencyExchangeData.rates[cur]);
      } else if (currencyExchangeData.rates[cur] < 300) {
        currs.get(3).push(cur);
        rates.get(3).push(currencyExchangeData.rates[cur]);
      } else {
        currs.get(4).push(cur);
        rates.get(4).push(currencyExchangeData.rates[cur]);
      }
    }
    this.state = {
      currencyExchangeData,
      currs,
      rates,
    };
  }

  drawChart() {
    const { currencyExchangeData, currs, rates } = this.state;
    console.log(currs);
    console.log(rates);
    console.log(rates.get(1));
    for (let i = 1; i < 5; ++i)
      new Chart(document.getElementById("comparisionChart" + i), {
        type: "bar",
        data: {
          labels: currs.get(i),
          datasets: [
            {
              label: "relative to USD",
              data: rates.get(i),
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
      });
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return (
      <div>
        <div className={styles.chartContainer}>
          <Card className="container">
            <canvas id="comparisionChart1" width="400" height="160" />
          </Card>
          <Card className="container">
            <canvas id="comparisionChart2" width="400" height="160" />
          </Card>
          <Card className="container">
            <canvas id="comparisionChart3" width="400" height="160" />
          </Card>
          <Card className="container">
            <canvas id="comparisionChart4" width="400" height="160" />
          </Card>
        </div>
      </div>
    );
  }
}
