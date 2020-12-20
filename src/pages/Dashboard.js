import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CompanyViews from "../components/Company/CompanyViews";
import MainLayout from "../components/Layouts/MainLayout";
import { RiStarSmileLine } from "react-icons/ri";

function Dashboard() {
  return (
    <MainLayout>
      <Row className="mb-5">
        {/**PAGE TITLE HEAD */}
        <Col xs={12} lg={7} className="d-flex align-items-center">
          <div className="mr-3">
            <RiStarSmileLine size={40} />
          </div>
          <div className="ml-3">
            <div>
              <h3>Companias</h3>
            </div>
            <div class="font-weight-light">
              {" "}
              Aqui se muestran todas las companias que tienes registradas
            </div>
          </div>
        </Col>

        {/**PAGE TITLE ACTIONS */}
        <Col xs={12} lg={5}></Col>
      </Row>
      <Container fluid>
        <CompanyViews />
      </Container>
    </MainLayout>
  );
}

export default Dashboard;
