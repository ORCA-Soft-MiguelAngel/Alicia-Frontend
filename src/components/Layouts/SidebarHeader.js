import React from "react";
import { Navbar } from "react-bootstrap";

const SidebarHeader = () => {
  return (
    <Navbar variant="dark" className="_header_bg shadow py-2" style={{height:66}}>
      <Navbar.Brand>
          <span className="d-none d-lg-block">Alicia</span>
          <span className="d-lg-none">A</span>
      </Navbar.Brand>
    </Navbar>
  );
};

export default SidebarHeader;
