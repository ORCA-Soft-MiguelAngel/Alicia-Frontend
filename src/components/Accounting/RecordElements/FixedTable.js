import React from "react";
import { Col, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import DefaultTable from "../../Table/DefaultTable";

//HELPER IMPORTS
import {
  recordFixedColumns,
  seatFixedColumns,
} from "../../../helpers/columnData";

const FixedTable = ({
  //data
  data = [{seatNumber:1,seatType:'aa'}],
}) => {
  return (
    <div>
      <Row>
        <Col xs={7}>
          <BootstrapTable
            columns={seatFixedColumns}
            keyField="seatNumber"
            data={data}
            bootstrap4
            striped
            bordered
            wrapperClasses="table-responsive" // This is the style provided by bootstrap 4, this will set the parent div with that class
            hover
            headerClasses="text-center align-middle"
            
            rowClasses="text-center"
          />
        </Col>
      </Row>
      <Row>
        <DefaultTable
          columns={recordFixedColumns}
          data={data}
          keyField="accountNumber"
          disableSearch
        />
      </Row>
      <Row className="mt-3 justify-content-end">
          Se supone que aqui pondre el total... de algun modo
      </Row>
    </div>
  );
};

export default FixedTable;
