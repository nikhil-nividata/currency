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
            value1: 1,
            value2: 1,
            multiplier1: 1,
            multiplier2: 1
        }
    }

    changeValue = (e) => {
        const src = e.target.name === 'value1' ? '1' : '2'
        const destination = e.target.name === 'value1' ? '2' : '1'
        const newObj = {}
        console.log("Here");
        console.log(e.target.value);
        if (/^\d\.?\d*$/.test(e.target.value)) {
            if (e.target.value[0] === '0')
                newObj[e.target.name] = e.target.value.slice(1)
            else
                newObj[e.target.name] = e.target.value
            const destValue = Number.parseFloat(e.target.value) * this.state['multiplier' + src]
            newObj['value' + destination] = `${destValue}`
            console.log("HERE");
            console.log(newObj);
            this.setState(newObj)
        } else if (e.target.value === '') {
            newObj[e.target.name] = "0"
            newObj['value' + destination] = "0"
            this.setState(newObj)
        }
    }



    changeCurrency = (e) => {
        const { currencyExchangeData } = this.props
        const src = e.target.name === 'currency1' ? '1' : '2'
        const destination = e.target.name === 'currency1' ? '2' : '1'

        const srcCurrency = e.target.value
        const destCurrency = this.state['currency' + destination]
        const srcRate = currencyExchangeData.rates[srcCurrency]
        const destRate = currencyExchangeData.rates[destCurrency]

        const srcMultiplier = destRate / srcRate
        const destMultiplier = srcRate / destRate

        const srcValue = this.state['value' + destination] * destMultiplier

        const newObj = {}
        newObj[e.target.name] = e.target.value
        newObj['multiplier' + src] = srcMultiplier
        newObj['multiplier' + destination] = destMultiplier
        newObj['value' + src] = srcValue
        this.setState(newObj)
    }


    render() {
        const { currency1, currency2, value1, value2 } = this.state
        return (
            <div>
                <div
                    style={{
                        backgroundColor: 'rgb(230, 216, 158,0.3)',
                        marginTop: '150px'
                    }}
                    className="container"
                >
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

