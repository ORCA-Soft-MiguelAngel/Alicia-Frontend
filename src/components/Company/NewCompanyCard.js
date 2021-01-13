import axios from "axios";
import React, { useState } from "react";
import { Card, Modal, Button, Form } from "react-bootstrap";
import axiosClient from "../../config/axios";
import createCompany from "../../images/companies/create-company.png";
import useStores from "../../hooks/useStores";
import { parseJWT } from "../../helpers/functions";

const NewCompanyCard = ({ setCompanies = () => {} }) => {
  //GLOBAL STATE
  const { UserStore } = useStores();
  //STATES
  //state related with the modal
  const [modalShow, setModalShow] = React.useState(false);
  //form data
  const [form, setForm] = useState({
    name: "",
    rnc: "",
    sector: "",
    deadline: "",
    owner:
      UserStore.obtainToken !== ""
        ? {
            id: parseJWT(UserStore.obtainToken).jti,
          }
        : null,
  });

  //HANDLERS
  //handle the form change
  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  //handle create the company
  const handleCreate = (e) => {
    e.preventDefault();

    //POST TO DATABASE
    axiosClient
      .post("/companies", form)
      .then((data) => {
        axiosClient
          .get(`/companies/user/${parseJWT(UserStore.obtainToken).jti}`)
          .then((data) => {
            setCompanies(data.data);
            setModalShow(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/**CARD */}
      <Card
        className="shadow rounded w-100 h-100"
        onClick={() => setModalShow(true)}
        style={{ cursor: "pointer" }}
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
        form={form}
        onFormChange={handleFormChange}
        handleCreate={handleCreate}
      />
    </>
  );
};

export default NewCompanyCard;

function MyVerticallyCenteredModal({
  show,
  onHide,
  form,
  onFormChange,
  handleCreate,
}) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Nueva Compañia
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Razon</Form.Label>
            <Form.Control
              placeholder="Nombre de la compañia"
              value={form.name}
              onChange={onFormChange}
            />
          </Form.Group>

          <Form.Group controlId="rnc">
            <Form.Label>RNC</Form.Label>
            <Form.Control
              placeholder="RNC de la compañia"
              value={form.rnc}
              onChange={onFormChange}
            />
          </Form.Group>

          <Form.Group
            controlId="sector"
            value={form.sector}
            onChange={onFormChange}
          >
            <Form.Label>Sector</Form.Label>
            <Form.Control as="select">
              <option>Sector 1</option>
              <option>Sector 2</option>
              <option>Sector 3</option>
              <option>Sector 4</option>
              <option>Sector 5</option>
            </Form.Control>
          </Form.Group>

          <Form.Group
            controlId="deadline"
            value={form.deadline}
            onChange={onFormChange}
          >
            <Form.Label>Fecha de Cierre</Form.Label>
            <Form.Control type="date" placeholder="" />
          </Form.Group>

          <div className="w-100 d-flex justify-content-end">
            <Button
              variant="outline-success"
              type="submit"
              onClick={handleCreate}
            >
              Crear
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
