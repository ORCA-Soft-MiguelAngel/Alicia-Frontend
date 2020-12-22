import React, { useState } from "react";
import { Col, Collapse, Form } from "react-bootstrap";

const AdvancedSearcher = ({
  //form values (object)
  form = {},
}) => {
  //STATE
  //if advanced search is opened
  const [advanced, setAdvanced] = useState(false);
  
  return (
    <Form>
      <Form.Row>
        <Form.Control placeholder="Numero de cuenta" />
      </Form.Row>
      {/**hidden area */}
      <Collapse in={advanced}>
        <div id="example-collapse-text">
          <Form.Row>
            <Col>
              <Form.Control placeholder="Numero de cuenta" />
            </Col>
            <Col>
              <Form.Control placeholder="Last name" />
            </Col>
          </Form.Row>
        </div>
      </Collapse>
      <Form.Row>
        <Form.Text onClick={() => setAdvanced(!advanced)}>
          {advanced ? "Busqueda simple" : "Busqueda avanzada"}
        </Form.Text>
      </Form.Row>
    </Form>
  );
};

export default AdvancedSearcher;
