import React from "react";
import { Card } from "react-bootstrap";
import defaultCompany from "../../images/companies/default-company.png";

const CompanyCard = ({
  //complete company object
  company,
  //decide if you want to add a new company
  add = false
}) => {
  return (
    <Card className="shadow rounded" style={{ width: "18rem" }}>
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
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CompanyCard;
