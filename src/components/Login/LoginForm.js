import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

const LoginForm = ({ form, handleLogin, onChange, loading,alert }) => {
  return (
    <Form>
      <Alert show={alert.status} variant="danger" className="rounded-pill py-2 shadow-md mb-3">{alert.message}</Alert>
      <Form.Group controlId="username" className="mb-3">
        <Form.Control
          placeholder="Usuario o Correo Electronico"
          required
          className="form-control rounded-pill border-0 shadow-sm px-4"
          autoFocus
          value={form.username}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group controlId="password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          required
          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
          value={form.password}
          onChange={onChange}
        />
      </Form.Group>
      <div className="custom-control custom-checkbox mb-3">
        <input
          id="customCheck1"
          type="checkbox"
          className="custom-control-input"
        />
        <label for="customCheck1" className="custom-control-label">
          Mantener sesion
        </label>
      </div>
      <Button
        className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
        onClick={handleLogin}
      >
        {loading ? <PulseLoader color="#fff" /> : "Log In"}
      </Button>
      <div className="text-center d-flex justify-content-between mt-4">
        <p>
          No tienes una cuenta?{" "}
          <Link to="/signup" className="font-italic text-danger">
            <u>Create una</u>
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
