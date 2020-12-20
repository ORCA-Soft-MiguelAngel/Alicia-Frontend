import React from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import createCompany from "../../images/companies/create-company.png";

const NewCompanyCard = () => {
  //STATES
  //state related with the modal
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      {/**CARD */}
      <Card
        className="shadow rounded"
        style={{ width: "18rem" }}
        onClick={() => setModalShow(true)}
      >
        <Card.Img variant="top" src={createCompany} />
        <Card.Body className="text-center font-weight-bold">
          Agregar nueva compañia
        </Card.Body>
      </Card>
      {/**MODAL */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default NewCompanyCard;

function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Nueva Compañia
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Razon</Form.Label>
            <Form.Control placeholder="Nombre de la compañia" />
          </Form.Group>

          <Form.Group controlId="rnc">
            <Form.Label>RNC</Form.Label>
            <Form.Control placeholder="RNC de la compañia" />
          </Form.Group>

          <Form.Group controlId="sector">
            <Form.Label>Sector</Form.Label>
            <Form.Control as="select">
              <option>Sector 1</option>
              <option>Sector 2</option>
              <option>Sector 3</option>
              <option>Sector 4</option>
              <option>Sector 5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="deadline">
            <Form.Label>Fecha de Cierre</Form.Label>
            <Form.Control type="date" placeholder="" />
          </Form.Group>

          <div className="w-100 d-flex justify-content-end">
            <Button variant="outline-success" type="submit">
              Crear
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
