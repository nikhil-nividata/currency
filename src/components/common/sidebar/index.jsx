import React from 'react'
import { SideNav, SideNavItem, Button } from 'react-materialize'
import styles from './index.module.css'

export default function index() {
    return (
        <div className={styles.sideBar}>
            <ul style={{
                margin: 0,
                height: '100%',
                paddingTop: '100px',
                paddingLeft: '10px',
            }}>
                <li
                >
                    <Button
                        flat
                        node="button"
                        waves="light"
                    >
                        <span className={styles.linkButton}>Link 1</span>

                    </Button>
                </li>
                <li>
                    <Button
                        flat
                        node="button"
                        waves="light"
                    >
                        <span className={styles.linkButton}>Link 2</span>
                    </Button>
                </li>
                <li>
                    <Button
                        flat
                        node="button"
                        waves="light"
                    >
                        <span className={styles.linkButton}>Link 3</span>
                    </Button></li>
            </ul>
        </div>
    )
}
