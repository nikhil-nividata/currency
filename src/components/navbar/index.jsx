import React from 'react'
import { Navbar } from 'react-materialize'

export default function index() {
    return (
        <div>
            <Navbar
                alignLinks="right"
                brand={<a className="brand-logo" href="#">Foriegn Exchange</a>}
                centerLogo
                id="full-nav"
                options={{
                    draggable: true,
                    edge: 'left',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    outDuration: 200,
                    preventScrolling: true
                }}
            >
            </Navbar>
        </div>
    )
}
