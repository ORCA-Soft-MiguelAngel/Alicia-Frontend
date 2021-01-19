import React, { useEffect, useState } from "react";

import { Route, Redirect, useHistory, withRouter } from "react-router-dom";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";

//IMPORT PAGES
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import ChartOfAccounts from "./pages/Accounting/ChartOfAccounts";
import Records from "./pages/Accounting/Records";
import Balance from "./pages/Accounting/Balance";
import AccountingMovement from "./pages/Accounting/AccountingMovement";
import useStores from "./hooks/useStores";
import axiosClient from "./config/axios";
import Signup from "./pages/Signup";
import HashLoader from "react-spinners/HashLoader";

function App() {
  //GLOBAL STATES
  const { UserStore } = useStores();
  const history = useHistory();

  //STATE
  //pseudo login state
  const [logged, setLogged] = useState("checking");

  //EFFECTS
  //initial effect
  useEffect(() => {
    if (UserStore.obtainToken !== "") {
      axiosClient
        .post("auth/validate", {
          token: UserStore.obtainToken,
        })
        .then((result) => {
          if (!result.data.status) {
            UserStore.removeToken();
            setLogged("unauthorized");
          } else {
            UserStore.addToken(result.data.token);
            setLogged("authorized");
          }
        })
        .catch((err) => {
          UserStore.removeToken();
          setLogged("unauthorized");
        });
    } else {
      setLogged("unauthorized");
    }
  }, [UserStore.obtainToken]);

  const handleRedirect = (location) => {
    history.push(location);
  };

  return (
    <div>
      {logged !== "checking" ? (
        <div>
          <Route path="/" exact>
            {logged === "authorized" ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/dashboard" exact>
            {logged === "unauthorized" ? (
              <Redirect to="/login" />
            ) : (
              <Dashboard handleRedirect={handleRedirect} />
            )}
          </Route>
          <Route path="/accounting/charts" exact>
            {logged === "unauthorized" ? (
              <Redirect to="/login" />
            ) : (
              <ChartOfAccounts handleRedirect={handleRedirect} />
            )}
          </Route>
          <Route path="/accounting/records" exact>
            {logged === "unauthorized" ? (
              <Redirect to="/login" />
            ) : (
              <Records handleRedirect={handleRedirect} />
            )}
          </Route>
          <Route path="/accounting/balance" exact>
            {logged === "unauthorized" ? (
              <Redirect to="/login" />
            ) : (
              <Balance handleRedirect={handleRedirect} />
            )}
          </Route>
          <Route path="/accounting/movement" exact>
            {logged === "unauthorized" ? (
              <Redirect to="/login" />
            ) : (
              <AccountingMovement handleRedirect={handleRedirect} />
            )}
          </Route>
          <Route path="/login" exact>
            {logged === "authorized" ? (
              <Redirect to="/dashboard" />
            ) : (
              <Login handleRedirect={handleRedirect} />
            )}
          </Route>
          <Route path="/signup" exact>
            {logged === "authorized" ? (
              <Redirect to="/dashboard" />
            ) : (
              <Signup handleRedirect={handleRedirect} />
            )}
          </Route>
        </div>
      ) : (
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <div>
            <div>
              <HashLoader color="#36D7B7" size={125} />
            </div>
            <h3 className="font-weight-bold my-5">Cargando...</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(App);
