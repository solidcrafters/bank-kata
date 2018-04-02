import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem} from "reactstrap";

const Header = ({apiStatus}) => (
  <Navbar color="light" light>
    <NavbarBrand href="/">Bank Kata</NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem className={apiStatus === 'OK' ? 'text-success' : 'text-danger'}>
        API is {apiStatus}
      </NavItem>
    </Nav>
  </Navbar>
);

export default Header;
