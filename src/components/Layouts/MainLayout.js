import React from "react";
import { Col, Row } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({
  //children component
  children,
  //do you want the header?
  header = true,
  //do you want the footer?
  footer = true,
  //do you want the aside?
  sidebar = true,
}) => {
  return (
    <Row>
      {sidebar && (
        <Col md={1} lg={2} className="d-none d-md-block">
          <Sidebar />
        </Col>
      )}
      <Col md={sidebar ? 11 : 12} lg={sidebar ? 10 : 12}>
        {header && <Header />}
        <div className="_body-bg">{children}</div>
        {footer && <Footer />}
      </Col>
    </Row>
  );
};

export default MainLayout;
