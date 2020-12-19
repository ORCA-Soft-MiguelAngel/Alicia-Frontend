import React, { useState } from "react";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import avatar from "../../images/user/avatar.png";

//ICONS
import { BsSearch } from "react-icons/bs";
import { BsTextIndentLeft, BsTextIndentRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({
  //state of the sidebar
  openSidebar = false,
  //open or closes sidebar
  handleSidebar = () => {},
}) => {
  return (
    <Navbar variant="dark" className="_header_bg shadow py-2">
      <Navbar.Brand>
        <div className="pl-2 _header-sidebar-button">
          {openSidebar ? (
            <BsTextIndentRight size={35} onClick={handleSidebar} />
          ) : (
            <BsTextIndentLeft size={35} onClick={handleSidebar} />
          )}
        </div>
      </Navbar.Brand>
      <Nav className="mr-auto align-items-center">
        <Navbar.Brand className="ml-3">
          <b>Alicia - Dashboard</b>
        </Navbar.Brand>
        <Nav.Item>
          <BsSearch color="white" />
        </Nav.Item>
      </Nav>
      <div className="d-flex align-items-center">
        <img src={avatar} alt="Avatar" className="_avatar" />
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
      <Dropdown.Toggle
        size="lg"
        className="_bg-transparent border-0 p-0 mx-2"
      ></Dropdown.Toggle>

      <Dropdown.Menu align="right" className="mt-3">
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
