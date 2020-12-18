import React, { useState } from "react";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import avatar from "../../images/user/avatar.png";

//ICONS
import { BsSearch } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar variant="dark" className="_header_bg shadow py-2">
      <Nav className="mr-auto">
        <Nav.Item>
          <BsSearch color="white" />
        </Nav.Item>
      </Nav>
      <div className="d-flex align-items-center">
        <img src={avatar} alt="Avatar" class="_avatar" />
        <div>
          <Notification />
        </div>

        <div className="d-flex flex-column px-2 text-light">
          <div>
            {" "}
            <b>Katherin Lisbeth</b>{" "}
          </div>
          <div>Free Tier</div>
        </div>
      </div>
    </Navbar>
  );
};

export default Header;

//NOTIFICATION COMPONENT
const Notification = () => {



  return (
    <Dropdown>
      <Dropdown.Toggle size="lg" className="_bg-transparent border-0 p-0 mx-2"></Dropdown.Toggle>

      <Dropdown.Menu align="right" className="mt-3">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
