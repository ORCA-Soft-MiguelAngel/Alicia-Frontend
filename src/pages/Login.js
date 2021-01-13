//MAIN IMPORTS
import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import LoginForm from "../components/Login/LoginForm";
import axiosClient from "../config/axios";
import useStores from "../hooks/useStores";

//CSS IMPORTS
import "../scss/main.scss";

function Login({ handleRedirect }) {
  //GLOBAL STATE
  const { UserStore } = useStores();
  //STATES
  //login form
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  //loading status
  const [loading, setLoading] = useState(false);
  //alert prompt
  const [alert, setAlert] = useState({
    status: false,
    message: "nono",
  });

  //HANDLERS
  //handle when you change anything of the login
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  //handle when you login
  const handleLogin = () => {
    if (form.username !== "" && form.password !== "") {
      setAlert({ status: false, message: "" });
      setLoading(true);
      axiosClient
        .post("/auth/login", form)
        .then((data) => {
          //you got the token, lets go
          UserStore.addToken(data.data.token);
          setLoading(false);
          if (window) {
            window.location.reload();
          }
        })
        .catch((err) => {
          //you didnt, dang
          console.log(err);
          setAlert({ status: true, message: "Credenciales incorrectas" });
          setLoading(false);
        });
    } else {
      //empty fields
      setAlert({ status: true, message: "no dejes campos vacios" });
      setTimeout(() => {
        setAlert({ status: false, message: "" });
      }, 3000);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        {/**<!-- The image half --> */}
        <div className="col-md-6 d-none d-md-flex bg-image"></div>

        {/**<!-- The content half --> */}
        <div className="col-md-6 bg-light">
          <div className="login d-flex align-items-center py-5">
            {/**<!-- Demo content--> */}
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <h3 className="display-4">Login</h3>
                  <p className="text-muted mb-4">
                    Inicia sesion con tus credenciales
                  </p>
                  <LoginForm
                    form={form}
                    handleLogin={handleLogin}
                    onChange={onChange}
                    loading={loading}
                    alert={alert}
                  />
                </div>
                <div></div>
              </div>
            </div>
            {/**<!-- End --> */}
          </div>
        </div>
        {/**<!-- End --> */}
      </div>
    </div>
  );
}

export default Login;
