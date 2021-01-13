import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CompanyCard from "./CompanyCard";
import NewCompanyCard from "./NewCompanyCard";

import axiosClient from "../../config/axios";
import useStores from "../../hooks/useStores";
import { parseJWT } from "../../helpers/functions";

const CompanyViews = ({ handleRedirect }) => {
  //STATES
  //mobx state
  const { CompanyStore, UserStore } = useStores();
  //companies that the user has
  const [companies, setCompanies] = useState([]);

  //EFFECTS
  //load companies from API (and delete company token)
  useEffect(() => {
    //LOAD FROM API AND SET THE NEW STATE
    const userId =
      UserStore.obtainToken !== "" ? parseJWT(UserStore.obtainToken).jti : "0";

    axiosClient
      .get(`/companies/user/${userId}`)
      .then((data) => {
        setCompanies(data.data);
      })
      .catch((err) => {
        console.log(err);
        UserStore.removeToken();
        handleRedirect("/login")
      });

    //delete company token here
    CompanyStore.removeCompany();
  }, []);

  //HANDLERS
  //hnadle move to a page
  const handleMovePage = (e, id) => {
    CompanyStore.addCompany(id);
    handleRedirect("/accounting/charts");
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

export default CompanyViews;
