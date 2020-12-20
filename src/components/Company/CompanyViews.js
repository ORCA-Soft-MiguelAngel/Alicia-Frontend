import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CompanyCard from "./CompanyCard";
import NewCompanyCard from "./NewCompanyCard";

const CompanyViews = () => {
  //STATES
  //companies that the user has
  const [companies, setCompanies] = useState([]);

  //EFFECTS
  //load companies from API
  useEffect(() => {
    //LOAD FROM API AND SET THE NEW STATE
  }, [companies]);

  return (
    <Row>
      {companies.length > 0 &&
        companies.map((company,i) => (
          <Col lg={4} key={i}>
            <CompanyCard company={company} />
          </Col>
        ))}
      <Col lg={4}>
        <NewCompanyCard />
      </Col>
    </Row>
  );
};

export default CompanyViews;
