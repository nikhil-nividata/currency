import React from 'react'
import { SideNav, SideNavItem } from 'react-materialize'

export default function index() {
    return (
        <div>
            <SideNav
                id="sidenav-10"
            >

                <div
                    style={{
                        height: '20vh'
                    }}
                >

                </div>

                <SideNavItem
                    href="#"
                >
                    Link 1
          </SideNavItem>

                <SideNavItem
                    href="#"
                >
                    Link 2
          </SideNavItem>

                <SideNavItem
                    href="#"
                >
                    Link 3
          </SideNavItem>

            </SideNav>

        </div>
    )
}
