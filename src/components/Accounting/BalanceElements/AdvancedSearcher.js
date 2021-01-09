import React, { useState } from "react";
import { Alert, Button, Card, Col, Collapse, Form } from "react-bootstrap";

const AdvancedSearcher = ({
  //form values (object)
  form = { accountNumber: "", accountType: "", dateFrom: "", dateTo: "" },
  //handle onChange
  onChange = () => {},
  //search button handle
  handleSearch = () => {},
  //show alert state
  showAlert = true,
  //setShowAlertState
  setShowAlert = () => {},
}) => {
  //STATE
  //if advanced search is opened
  const [advanced, setAdvanced] = useState(false);

  return (
    <Card className="mb-4 shadow rounded">
      <Form className="w-100 p-3">
        <Form.Row className="mb-3 mx-0">
          <Form.Control
            id="accountNumber"
            value={form.accountNumber}
            onChange={onChange}
            placeholder="Numero de cuenta"
            disabled={form.accountType === "" ? false : true}
          />
        </Form.Row>
        {/**account number alert */}
        <Alert
          variant="danger"
          dismissible
          show={showAlert}
          onClose={() => setShowAlert(false)}
        >
          No. de Cuenta incorrecto
        </Alert>
        {/**hidden area */}
        <Collapse in={advanced}>
          <div id="example-collapse-text">
            <Form.Row className="my-2 mx-0">
              <Form.Control
                id="accountType"
                value={form.accountType}
                onChange={onChange}
                placeholder="Tipo de cuenta"
              />
            </Form.Row>
            <Form.Row className="mx-0">
              <Col className="px-0">
                <Form.Label>Desde:</Form.Label>
                <Form.Control
                  id="dateFrom"
                  type="date"
                  value={form.dateFrom}
                  onChange={onChange}
                />
              </Col>
              <Col className="px-0">
                <Form.Label>Hasta:</Form.Label>
                <Form.Control
                  id="dateTo"
                  type="date"
                  value={form.dateTo}
                  onChange={onChange}
                />
              </Col>
            </Form.Row>
          </div>
        </Collapse>
        <Form.Row style={{ cursor: "pointer" }} className="mx-0">
          <Form.Text onClick={() => setAdvanced(!advanced)}>
            {advanced ? "Busqueda simple" : "Busqueda avanzada"}
          </Form.Text>
        </Form.Row>
        <Form.Row className="justify-content-end mt-3 mx-0">
          <Button size="sm" variant="outline-primary" disabled={showAlert} onClick={handleSearch}>
            Buscar
          </Button>
        </Form.Row>
      </Form>
    </Card>
  );
};

export default AdvancedSearcher;
