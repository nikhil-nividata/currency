import React, { Component } from 'react'
import { Row, Col } from 'react-materialize'
import CurrencyInfo from './utils/currencyInfo'
import NavBar from './components/common/navbar'
import SideBar from './components/common/sidebar'
import HomePage from './components/homepage'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './router'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyExchangeData: {},
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
    const { selectData, currencyExchangeData } = this.state
    return (
      <div style={{
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden'
      }}>
        <Router>
          <NavBar />
          <div style={{
            height: '100%'
          }}>
            <Row style={{
              height: '100%',
              overflow: 'hidden'
            }}>
              <Col m={2} style={{ padding: 0, height: '100%' }}>
                <SideBar />
              </Col>
              <Col m={10}>
                <Routes />
              </Col>

            </Row>
          </div>
        </Router>
      </div>
    )
  }
}


export default App;
