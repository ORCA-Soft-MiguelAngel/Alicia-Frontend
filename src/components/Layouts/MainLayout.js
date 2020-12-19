import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
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
  //STATES
  //state related with the status of the sidebar
  const [openSidebar, setOpenSidebar] = React.useState(false);

  //HANDLERS
  //handler to close or open the sidebar
  const handleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <div>
      <Header openSidebar={openSidebar} handleSidebar={handleSidebar} />

      <div id="_wrapper" className={openSidebar ? "menuDisplayed" : ""}>
        {/**SIDEBAR */}
        <Sidebar openSidebar={openSidebar}/>

        {/**MAIN CONTENT */}
        <div id="_page-content-wrapper">
          <Container fluid>{children}</Container>
        </div>
      </div>
    </div>
  );

  /*
  return (
    <Row>
      {sidebar && (
        <Col md={1} lg={2} className="d-none d-md-block pr-0 h-100">
          <Sidebar />
        </Col>
      )}
      <Col md={sidebar ? 11 : 12} lg={sidebar ? 10 : 12} className="pl-0">
        {header && <Header />}
        <div className="_body-bg">{children}</div>
        {footer && <Footer />}
      </Col>
    </Row>
  );*/
};

export default MainLayout;
