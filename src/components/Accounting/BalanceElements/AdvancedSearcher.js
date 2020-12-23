import React, { useState } from "react";
import { Button, Card, Col, Collapse, Form } from "react-bootstrap";

const AdvancedSearcher = ({
  //form values (object)
  form = {},
}) => {
  //STATE
  //if advanced search is opened
  const [advanced, setAdvanced] = useState(false);

  return (
    <Card className="mb-4 shadow rounded">
      <Form className="w-100 p-3">
        <Form.Row className="mb-3 mx-0">
          <Form.Control placeholder="Numero de cuenta" />
        </Form.Row>
        {/**hidden area */}
        <Collapse in={advanced}>
          <div id="example-collapse-text">
            <Form.Row className="my-2 mx-0">
              <Form.Control placeholder="Tipo de cuenta" />
            </Form.Row>
            <Form.Row className="mx-0">
              <Col className="px-0">
                <Form.Label>Desde:</Form.Label>
                <Form.Control type="date" />
              </Col>
              <Col className="px-0">
                <Form.Label>Hasta:</Form.Label>
                <Form.Control type="date" />
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
          <Button size="sm" variant="outline-primary">
            Buscar
          </Button>
        </Form.Row>
      </Form>
    </Card>
  );
};

export default AdvancedSearcher;
