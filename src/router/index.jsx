import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from '../components/homepage'
import Chart from '../components/charts'
import History from '../components/history'


export default function index() {
    return (
        <Switch>
            <Route exact path="/" render={
                (props) => <HomePage props={props} />
            } />
            <Route exact path="/chart" render={
                (props) => <Chart props={props} />
            } />
            <Route exact path="/history" render={
                (props) => <History props={props} />
            } />
        </Switch>
    )
}



