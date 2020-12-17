import React from "react";
import { Button, Icon, Navbar, NavItem } from "react-materialize";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

export default function index() {
  return (
    <div>
      <Navbar
        menuIcon={null}
        alignLinks="right"
        brand={
          <div className={"brand-logo " + styles.brandLogoHolder}>
            <Icon
              style={{ fontSize: "2.2rem", cursor: "pointer" }}
              onClick={() => {
                document.getElementById("sideNavToggler").click();
              }}
            >
              menu
            </Icon>
            <Link to="/">
              <span>Foriegn Exchange</span>
            </Link>
          </div>
        }
        centerLogo={false}
        id="full-nav"
        options={{
          draggable: true,
          edge: "left",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <Link style={{ fontSize: "1.6rem" }} to="/">
          Home
        </Link>
        <Link style={{ fontSize: "1.6rem" }} to="/chart">
          Compare Currencies
        </Link>
        <Link style={{ fontSize: "1.6rem", marginRight: "2vw" }} to="/history">
          History
        </Link>
      </Navbar>
    </div>
  );
}
