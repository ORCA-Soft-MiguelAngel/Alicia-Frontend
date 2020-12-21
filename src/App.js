import React from "react";

import { Route, BrowserRouter as Router } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

//IMPORT PAGES
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import ChartOfAccounts from "./pages/Accounting/ChartOfAccounts";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/accounting/chart" exact component={ChartOfAccounts} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;
