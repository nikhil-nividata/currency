import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../components/homepage'
import Chart from '../components/charts'
import History from '../components/history'


export default function index({ currencyExchangeData }) {
    return (
        <Switch>
            <Route exact path="/" render={
                (props) => <HomePage currencyExchangeData={currencyExchangeData} props={props} />
            } />
            <Route exact path="/chart" render={
                (props) => <Chart currencyExchangeData={currencyExchangeData} props={props} />
            } />
            <Route exact path="/history" render={
                (props) => <History props={props} currencyExchangeData={currencyExchangeData} />
            } />
        </Switch>
    )
}



