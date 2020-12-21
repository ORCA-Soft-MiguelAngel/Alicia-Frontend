import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NewAccountModal = () => {
  //STATES
  //state related with the modal
  const [modalShow, setModalShow] = useState(false);
  //state to hold the info of the data
  const [form, setForm] = useState({
    accountNumber: "",
    accountDetails: "",
    accountType: "",
    parentAccount: "",
    company: "",
  });
  //state to show incorrect statements
  const [invalid, setInvalid] = useState({
    accountNumber: false,
    accountDetails: false,
    parentAccount: false,
  });
  const [exists, setExists] = useState(false);

  //HANDLERS
  //handle form change
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    /**Evaluate type first */
    if (id === "accountNumber") {
      if (value !== "" && !isNaN(value) && value.length === 1) {
        console.log("que");
        setForm({
          ...form,
          accountType: value,
          [id]: value,
        });
      } else {
        setForm({
          ...form,
          [id]: value,
        });
      }
    } else {
      setForm({
        ...form,
        [id]: value,
      });
    }

    console.log(form);
  };

  //handle to add a new something
  const handleCreate = (e) => {
    e.preventDefault();

    //1st. clean all incorrect inputs and set loading
    setInvalid({
      accountNumber: true,
      accountDetails: true,
      parentAccount: true,
    });

    //2nd. test the inputs
    let number = false;
    let details = false;
    let parent = false;

    if (form.accountType === "") {
      number = true;
    }

    if (form.accountDetails === "") {
      details = true;
    }

    if (form.parentAccount === "") {
      parent = true;
    }

    //3rd. test the output
    if (!number && !parent && !details) {
      //4th retrieve data to compare if this account exists
      //AXIOS API
      //5th-1 you got something, bring exists message (close loading)
      //5th-2 it doesnt, add and close (close loading)
      setModalShow(false);
    } else {
      //prevent the close
      setInvalid({
        accountNumber: number,
        accountDetails: details,
        parentAccount: parent,
      });
    }
  };

  return (
    <>
      {/**CARD */}
      <Button variant="outline-primary mx-3" onClick={() => setModalShow(true)}>
        Agregar cuenta
      </Button>{" "}
      {/**MODAL */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        handleChange={handleChange}
        handleCreate={handleCreate}
        form={form}
        invalid={invalid}
        exists={exists}
      />
    </>
  );
};

export default NewAccountModal;

function MyVerticallyCenteredModal({
  handleChange,
  handleCreate,
  form,
  invalid,
  exists,
  show,
  onHide,
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
          Agregar Nueva Cuenta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="accountNumber">
            <Form.Label>Cuenta</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={form.accountNumber}
              placeholder="Numero de la cuenta"
            />
            {invalid.accountNumber && (
              <Form.Text className="text-danger">
                Ingresa una cuenta correcta
              </Form.Text>
            )}
            {exists && (
              <Form.Text className="text-danger">
                Esta cuenta ya existe
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="accountDetails">
            <Form.Label>Detalles</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={form.accountDetails}
              placeholder="Detalle de la cuenta"
            />
            {invalid.accountNumber && (
              <Form.Text className="text-danger">
                No dejes el detalle vacio
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="accountType">
            <Form.Label>Tipo de cuenta</Form.Label>
            <Form.Control value={form.accountType} disabled placeholder="" />
          </Form.Group>

          <Form.Group controlId="parentAccount">
            <Form.Label>Cuenta Madre</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={form.parentAccount}
              placeholder="Cuenta madre"
            />
            {invalid.accountNumber && (
              <Form.Text className="text-danger">
                No dejes la cuenta madre vacia
              </Form.Text>
            )}
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
