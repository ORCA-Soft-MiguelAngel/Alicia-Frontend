import React, { useState } from "react";
import RegisterForm from "../components/Login/RegisterForm";
import axiosClient from "../config/axios";

const Signup = ({ handleRedirect }) => {
  //STATES
  //login form
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  //loading status
  const [loading, setLoading] = useState(false);
  //alert prompt
  const [alert, setAlert] = useState({
    status: false,
    message: "",
  });

  //HANDLERS
  //handle when you change anything of the login
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  //handle register
  const handleRegister = () => {
    setAlert({
      status: false,
      message: "",
    });
    //1st. test no empty fields
    if (
      form.username !== "" &&
      form.password !== "" &&
      form.confirmPassword !== "" &&
      form.email !== "" &&
      form.firstname !== "" &&
      form.lastname !== ""
    ) {
      //2rd. test the password and its confirm
      if (form.password !== form.confirmPassword) {
        setAlert({
          status: true,
          message: "La contraseña y su confirmacion debe coincidir",
        });
        return;
      }

      setLoading(true);

      //3nd. test email and username
      axiosClient
        .post("/auth/exists", form)
        .then((data) => {
          if (data.data) {
            //there is a user, wrong
            setAlert({
              status: true,
              message: "El usuario o correo ya existe",
            });
            setLoading(false);
          } else {
            //there is no user, yay, lets go!
            axiosClient
              .post(`/auth/signup`, form)
              .then((data) => {
                //successfull register, move to login
                setAlert({
                  status: false,
                  message: "",
                });
                setLoading(false);
                handleRedirect("/login");
              })
              .catch((err) => {
                //something went wrong, back
                setAlert({
                  status: true,
                  message:
                    "Hubo un error en la comprobacion, intenta mas tarde",
                });
                setLoading(false);
              });
          }
        })
        .catch((err) => {
          setAlert({
            status: true,
            message: "Hubo un error en la comprobacion, intenta mas tarde",
          });
          setLoading(false);
        });
    } else {
      setAlert({
        status: true,
        message: "No dejes campos vacios",
      });
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
                  <h3 className="display-4">Registro</h3>
                  <p className="text-muted mb-4">Crea una nueva cuenta</p>
                  <RegisterForm
                    form={form}
                    handleRegister={handleRegister}
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
};

export default Signup;
