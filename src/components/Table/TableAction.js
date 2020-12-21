import React from "react";
import { Button, Row } from "react-bootstrap";

const TableAction = ({
  actionTitle = "algo",
  addAction = () => {},
  csvAction = () => {},
}) => {
  return (
    <Row className="justify-content-end my-3">
      <Button variant="outline-primary mx-3" onClick={addAction}>
        Agregar {actionTitle}
      </Button>{" "}
      <Button variant="outline-success mx-3" onClick={csvAction}>
        Importar CSV
      </Button>{" "}
    </Row>
  );
};

export default TableAction;
