import React from "react";
import { Col, Row } from "react-bootstrap";
import { RiStarSmileLine } from "react-icons/ri";

const AccountingHeader = ({
  //title of the header
  title = "",
  //description of the header
  description = "",
}) => {
  return (
    <Row className="mb-5">
      {/**PAGE TITLE HEAD */}
      <Col xs={12} lg={7} className="d-flex align-items-center">
        <div className="mr-3">
          <RiStarSmileLine size={40} />
        </div>
        <div className="ml-3">
          <div>
            <h3>{title}</h3>
          </div>
          <div class="font-weight-light"> {description}</div>
        </div>
      </Col>

      {/**PAGE TITLE ACTIONS */}
      <Col xs={12} lg={5}></Col>
    </Row>
  );
};

export default AccountingHeader;
