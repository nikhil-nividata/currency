import React from 'react'
import { SideNav, SideNavItem, Button } from 'react-materialize'
import styles from './index.module.css'
import { Link } from 'react-router-dom'


export default function index() {
    return (
        <div className={styles.sideBar}>
            <ul style={{
                margin: 0,
                height: '100%',
                paddingTop: '100px',
                paddingLeft: '10px',
            }}>
                <Link to="/">
                    <li
                        className={styles.linkStyle}
                    >
                        <span className={styles.linkButton}>Home</span>
                    </li>
                </Link>
                <Link to="/chart">
                    <li className={styles.linkStyle}>
                        <span className={styles.linkButton}>Compare Currencies</span>
                    </li>
                </Link>
                <Link to="/history">
                    <li className={styles.linkStyle}>
                        <span className={styles.linkButton}>History</span>
                    </li>
                </Link>
            </ul>
        </div>
    )
}
