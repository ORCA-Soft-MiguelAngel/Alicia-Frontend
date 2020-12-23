import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CompanyCard from "./CompanyCard";
import NewCompanyCard from "./NewCompanyCard";

import axiosClient from "../../config/axios";
import useStores from "../../hooks/useStores";
import { withRouter } from "react-router-dom";

const CompanyViews = ({ history }) => {
  //STATES
  //mobx state
  const { CompanyStore } = useStores();
  //companies that the user has
  const [companies, setCompanies] = useState([]);

  //EFFECTS
  //load companies from API (and delete company token)
  useEffect(() => {
    //LOAD FROM API AND SET THE NEW STATE
    axiosClient
      .get(`/companies/user/${process.env.REACT_APP_TEST_USER}`)
      .then((data) => {
        setCompanies(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    //delete company token here
    CompanyStore.removeCompany();
  }, [companies, CompanyStore]);

  //HANDLERS
  //hnadle move to a page
  const handleMovePage = (e, id) => {
    CompanyStore.addCompany(id);
    history.push("/accounting/charts");
  };

  return (
    <Row>
      {companies.length > 0 &&
        companies.map((company, i) => (
          <Col
            xs={12}
            md={6}
            lg={4}
            xl={3}
            key={i}
            className="mb-4"
            onClick={(e) => handleMovePage(e, company.id)}
          >
            <CompanyCard company={company} />
          </Col>
        ))}
      <Col xs={12} md={6} lg={4} xl={3} className="mb-4">
        <NewCompanyCard setCompanies={setCompanies} />
      </Col>
    </Row>
  );
};

export default withRouter(CompanyViews);
