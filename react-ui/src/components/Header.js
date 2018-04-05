import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";

const Header = ({apiStatus, total}) => (
  <Navbar color="light" light>
    <NavbarBrand href="/">Bank Kata</NavbarBrand>
    <span>Total Balance: {total}€</span>
    <Nav className="ml-auto" navbar>
      <NavItem className={apiStatus === 'OK' ? 'text-success' : 'text-danger'}>
        API is {apiStatus}
      </NavItem>
    </Nav>
  </Navbar>
);

export default Header;
