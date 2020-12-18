import React, { Component } from "react";
import { Row, Col, Preloader } from "react-materialize";
import DrawGraph from "./graph";
import Select from "../homepage/select";
import DatePicker from "./datepicker";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historicData: [],
      ratesArray: [],
      baseCurrency: "",
      startDate: null,
      endDate: null,
      hasData: false,
      isLoading: false,
    };
  }

  changeBaseCurrency = (e) => {
    console.log(e.target.value);
    this.setState(
      {
        baseCurrency: e.target.value,
      },
      () => {
        const { startDate, endDate } = this.state;
        if ((startDate !== null) & (endDate !== null)) {
          if (endDate.getTime() > startDate.getTime())
            this.getComparisionData();
        }
      }
    );
  };

  async getComparisionData() {
    this.setState({ isLoading: true });
    const { startDate, endDate, baseCurrency } = this.state;
    console.log("Base CUrrenncy for our function is " + baseCurrency);
    const sDate = `${startDate.getFullYear()}-${
      startDate.getMonth() + 1
    }-${startDate.getDate()}`;
    const eDate = `${endDate.getFullYear()}-${
      endDate.getMonth() + 1
    }-${endDate.getDate()}`;
    console.log(sDate);
    console.log(eDate);
    const response = await fetch(
      `https://api.exchangeratesapi.io/history?start_at=${sDate}&end_at=${eDate}&base=${baseCurrency}`
    );
    const historicData = await response.json();
    console.log("FETCHED DATA VALUE for " + baseCurrency);
    console.log(historicData);
    console.log("FETCHED DATA VALUE ENDS");
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
    console.log(historicData);
    this.setState({
      historicData,
      ratesArray,
      hasData: true,
      isLoading: false,
    });
  }

  changeStartDate = (date) => {
    this.setState(
      {
        startDate: date,
      },
      () => {
        const { startDate, endDate } = this.state;
        if (endDate === null) return;
        if (endDate.getTime() > startDate.getTime()) this.getComparisionData();
      }
    );
  };

  changeEndDate = (date) => {
    this.setState(
      {
        endDate: date,
      },
      () => {
        const { startDate } = this.state;
        if (startDate !== null) {
          this.getComparisionData();
        }
      }
    );
  };

  render() {
    const {
      baseCurrency,
      startDate,
      endDate,
      hasData,
      isLoading,
      ratesArray,
    } = this.state;
    const maxDate = new Date();
    const minDate = startDate !== null ? new Date(startDate) : undefined;
    if (minDate !== undefined) {
      minDate.setDate(minDate.getDate() + 1);
    }
    maxDate.setDate(maxDate.getDate() - 1);
    console.log(this.state);
    return (
      <div class="container">
        <Row>
          <Col m={4}>
            <Select value={baseCurrency} onChange={this.changeBaseCurrency} />
          </Col>

          {baseCurrency !== "" ? (
            <>
              <Col m={4}>
                <DatePicker
                  name="startDate"
                  placeholder="Start Date"
                  maxDate={maxDate}
                  onChange={this.changeStartDate}
                  value={startDate}
                />
              </Col>
              <Col m={4}>
                <DatePicker
                  name="endDate"
                  placeholder="End Date"
                  maxDate={maxDate}
                  minDate={minDate}
                  onChange={this.changeEndDate}
                  value={endDate}
                />
              </Col>
            </>
          ) : null}
        </Row>
        {hasData ? (
          isLoading ? (
            <Preloader active flashing={false} size="big" color="green" />
          ) : (
            <DrawGraph ratesArray={ratesArray} />
          )
        ) : null}
      </div>
    );
  }
}
