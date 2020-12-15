import React from 'react'
import { SideNav, SideNavItem, Button } from 'react-materialize'
import styles from './index.module.css'
import { Link } from 'react-router-dom'


export default function index() {
    return (
        <SideNav
            id="sideNav"
            options={{
                edge: 'left',
                draggable: true
            }}
            trigger={<Button className={styles.trigger} node="button" id="sideNavToggler">Toggle</Button>}
        >
            <div style={{ height: '20vh' }}></div>
            <Link to="/">
                <SideNavItem >
                    <span style={{ color: 'black', fontSize: '1.4rem' }}>Home</span>

                </SideNavItem>
            </Link>
            <Link to="/chart">
                <SideNavItem >
                    <span style={{ color: 'black', fontSize: '1.4rem' }}>Comparing Currencies</span>

                </SideNavItem>
            </Link>
            <Link to="/history">
                <SideNavItem >
                    <span style={{ color: 'black', fontSize: '1.4rem' }}>History</span>

                </SideNavItem>
            </Link>

        </SideNav>
    )
}
