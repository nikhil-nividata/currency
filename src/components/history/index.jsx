import React, { Component } from 'react'
import Chart from 'chart.js';
import { Select } from 'react-materialize'
import CurrencyInfo from '../../utils/currencyInfo'

export default class index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            historicData: [],
            ratesArray: [],
            selectedCurrencies: new Set()
        }
    }

    handleSelect = (e) => {
        const selectedCurrencies = new Set()
        for (let i = 0; i < e.target.selectedOptions.length; ++i) {
            selectedCurrencies.add(e.target.selectedOptions.item(i).value)
        }
        this.setState({
            selectedCurrencies
        })
    }

    async getComparisionData() {
        const response = await fetch('https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01')
        const historicData = await response.json()
        const ratesArray = []
        for (let dateStr in historicData.rates) {
            ratesArray.push({
                date: new Date(dateStr),
                ...historicData.rates[dateStr]
            })
        }
        ratesArray.sort((a, b) => {
            // Compare two dates (could be of any type supported by the convert
            // function above) and returns:
            //  -1 : if a < b
            //   0 : if a = b
            //   1 : if a > b
            if (a.date.getTime() < b.date.getTime())
                return -1
            else if (a.date.getTime() === b.date.getTime())
                return 0
            else return 1
        })
        this.setState({
            historicData,
            ratesArray
        })
    }

    componentDidMount() {
        this.getComparisionData()
    }

    componentDidUpdate() {
        const dates = []
        const datasets = []
        const { ratesArray, selectedCurrencies } = this.state
        selectedCurrencies.forEach((elem) => {
            datasets.push({
                label: CurrencyInfo.get(elem),
                data: [],
                fill: false
            })
        })
        ratesArray.forEach((elem) => {
            dates.push(elem['date'].toDateString())
            let i = 0
            selectedCurrencies.forEach((curr) => {
                datasets[i++].data.push(elem[curr] === undefined ? 1 : elem[curr])
            })
        })
        console.log(datasets);
        new Chart(
            document.getElementById('lineGraph')
            , {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: datasets
                }
            })
    }

    render() {
        return (
            <div style={{}}>
                <Select
                    style={{
                        width: '100%'
                    }}
                    id="selectCountries"
                    multiple
                    options={{
                        classes: '',
                        dropdownOptions: {
                            alignment: 'left',
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
                            outDuration: 250
                        }
                    }}
                    value={Array.from(this.state.selectedCurrencies.values())}
                    onChange={this.handleSelect}
                >
                    <option
                        disabled
                        value=""
                    >
                        Select Countries
                    </option>
                    {
                        Array.from(CurrencyInfo.keys()).map(
                            key => {
                                return (<option
                                    style={{
                                        color: 'black'
                                    }}
                                    value={key}
                                    key={key}
                                >
                                    {CurrencyInfo.get(key)}
                                </option>)
                            }
                        )
                    }
                </Select>
                <canvas id="lineGraph"></canvas>
            </div>
        )
    }
}
