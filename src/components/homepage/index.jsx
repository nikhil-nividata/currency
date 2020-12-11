import React, { Component } from 'react'
import { Row, Col, TextInput } from 'react-materialize'
import Select from './select'
import CurrencyInfo from '../../utils/currencyInfo'


export default class index extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currency1: 'USD',
            currency2: 'USD',
            value1: 0,
            value2: 0
        }
    }

    changeValue = (e) => {
        const newObj = {}
        if (/^\d\.?\d*$/.test(e.target.value)) {
            if (e.target.value[0] === '0')
                newObj[e.target.name] = e.target.value.slice(1)
            else
                newObj[e.target.name] = e.target.value
            this.setState(newObj)
        } else if (e.target.value === '') {
            console.log(e.target.value);
            newObj[e.target.name] = "0"
            this.setState(newObj)
        }
    }

    calculateNewMultiplier = () => {
        const { currency1, currency2 } = this.state
        const { currencyExchangeData } = this.props
        const rate1 = currencyExchangeData.rates[currency1]
        const rate2 = currencyExchangeData.rates[currency2]
        return rate1 / rate2
    }

    changeCurrency = (e) => {
        const newObj = {}
        newObj[e.target.name] = e.target.value
        this.setState(newObj)
    }


    render() {
        const { currency1, currency2, value1, value2 } = this.state
        return (
            <div>
                <div
                    style={{
                        backgroundColor: 'rgb(230, 216, 158,0.3)'
                    }}
                    className="container"
                >
                    {currency1} <br />
                    {currency2} <br />
                    {value1} <br />
                    {value2} <br />
                    <Row>

                        <Col s={6}>
                            <TextInput
                                name="value1"
                                id="value1"
                                value={value1}
                                onChange={this.changeValue}
                            />
                        </Col>

                        <Col s={6}>
                            <TextInput
                                name="value2"
                                id="value2"
                                value={value2}
                                onChange={this.changeValue}
                            />
                        </Col>

                    </Row>


                    <Row>

                        <Col s={6}>
                            <Select
                                onChange={this.changeCurrency}
                                value={currency1}
                                name="currency1"
                            />
                        </Col>

                        <Col s={6}>
                            <Select
                                onChange={this.changeCurrency}
                                value={currency2}
                                name="currency2"
                            />
                        </Col>

                    </Row>

                </div>
            </div>
        )
    }
}

