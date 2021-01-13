import React, { useState } from "react";
import { Button, Dropdown, Nav, Navbar } from "react-bootstrap";
import avatar from "../../images/user/avatar.png";
import useStores from "../../hooks/useStores";
import { withRouter } from "react-router-dom";

//ICONS
import { BsSearch } from "react-icons/bs";
import { BsTextIndentLeft, BsTextIndentRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = ({
  //state of the sidebar
  openSidebar = false,
  //open or closes sidebar
  handleSidebar = () => {},
  //history
  history,
}) => {
  //GLOBAL STATE
  const { UserStore } = useStores();

  //HANDLERS
  //handle logout
  const handleLogout = () => {
    UserStore.removeToken();
    history.push("/login");
  };

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
          <Notification handleLogout={handleLogout} />
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

export default withRouter(Header);

//NOTIFICATION COMPONENT
const Notification = ({ handleLogout }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        size="lg"
        className="_bg-transparent border-0 p-0 mx-2"
      ></Dropdown.Toggle>

      <Dropdown.Menu align="right" className="mt-3">
        <Dropdown.Item href="">Perfil</Dropdown.Item>
        <Dropdown.Item href="" onClick={handleLogout}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
