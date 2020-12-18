import React from "react";

import { Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;
