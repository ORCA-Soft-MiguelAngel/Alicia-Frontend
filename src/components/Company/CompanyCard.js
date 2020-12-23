import React from "react";
import { Card } from "react-bootstrap";
import defaultCompany from "../../images/companies/default-company.png";

const CompanyCard = ({
  //complete company object
  company,
  //decide if you want to add a new company
  add = false,
}) => {
  return (
    <Card className="shadow rounded" style={{ cursor: "pointer" }}>
      <Card.Img
        variant="top"
        src={
          company
            ? company.image
              ? company.image
              : defaultCompany
            : defaultCompany
        }
      />
      <Card.Body>
        <Card.Title className="text-center">
          {company ? company.name : "Company Name"}
        </Card.Title>
        <Card.Text className="d-flex justify-content-between align-items-center">
          <div>
            {" "}
            <b>RNC:</b>{" "}
          </div>
          <div>{company.rnc}</div>
        </Card.Text>
        <Card.Text className="d-flex justify-content-between align-items-center">
          {" "}
          <b>Fecha de cierre:</b> <div>{company.deadline}</div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;
