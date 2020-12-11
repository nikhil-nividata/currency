import React, { Component } from 'react'
import { Autocomplete, Row, Col } from 'react-materialize'
import CurrencyInfo from './utils/currencyInfo'
import NavBar from './components/navbar'
import SideBar from './components/sidebar'

class App extends Component {
  constructor(props) {
    super(props)
    const autocompleteData = new Map()
    for (const [key, value] of CurrencyInfo.entries()) {
      autocompleteData[key] = null
    }
    this.state = {
      currencyExchangeData: {},
      autocompleteData
    }
  }

  fetchCurrencyData = async () => {
    const response = await fetch('https://api.exchangeratesapi.io/latest?base=USD')
    const currencyExchangeData = await response.json()
    this.setState({
      currencyExchangeData
    })
  }

  componentDidMount() {
    this.fetchCurrencyData()
  }

  render() {
    const { autocompleteData } = this.state
    return (
      <div>

        <NavBar />
        <SideBar />


        <div className="container">

          <Row>
            <Col s={6}>
              <Autocomplete
                id="currency1"
                options={{
                  data: autocompleteData
                }}
                placeholder="Insert here"
              />
            </Col>
            <Col s={6}>
              <Autocomplete
                id="currency2"
                options={{
                  data: autocompleteData
                }}
                placeholder="Insert here"
              />
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}


export default App;
