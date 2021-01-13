import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const RegisterForm = ({ form, handleRegister, onChange, loading, alert }) => {
  return (
    <Form>
      <Alert
        show={alert.status}
        variant="danger"
        className="rounded-pill py-2 shadow-md mb-3"
      >
        {alert.message}
      </Alert>
      {/**firstname */}
      <Form.Group controlId="firstname" className="mb-3">
        <Form.Control
          placeholder="Nombres"
          required
          className="form-control rounded-pill border-0 shadow-sm px-4"
          autoFocus
          value={form.firstname}
          onChange={onChange}
        />
      </Form.Group>
      {/**lastname */}
      <Form.Group controlId="lastname" className="mb-3">
        <Form.Control
          placeholder="Apellidos"
          required
          className="form-control rounded-pill border-0 shadow-sm px-4"
          value={form.lastname}
          onChange={onChange}
        />
      </Form.Group>
      {/**username */}
      <Form.Group controlId="username" className="mb-3">
        <Form.Control
          placeholder="Nombre de usuario"
          required
          className="form-control rounded-pill border-0 shadow-sm px-4"
          value={form.username}
          onChange={onChange}
        />
      </Form.Group>
      {/**email */}
      <Form.Group controlId="email" className="mb-3">
        <Form.Control
          placeholder="Correo Electronico"
          type="email"
          required
          className="form-control rounded-pill border-0 shadow-sm px-4"
          value={form.email}
          onChange={onChange}
        />
      </Form.Group>
      {/**password */}
      <Form.Group controlId="password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Confirma Contraseña"
          required
          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
          value={form.password}
          onChange={onChange}
        />
      </Form.Group>
      {/**confirmPassword */}
      <Form.Group controlId="confirmPassword" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Confirma contraseña"
          required
          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
          value={form.confirmPassword}
          onChange={onChange}
        />
      </Form.Group>
      <Button
        className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
        onClick={handleRegister}
      >
        {loading ? <PulseLoader color="#fff" /> : "Sign Up"}
      </Button>
      <div className="text-center d-flex justify-content-between mt-4">
        <p>
          Ya tienes una cuenta?{" "}
          <Link to="/login" className="font-italic text-danger">
            <u>Inicia sesion</u>
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default RegisterForm;
