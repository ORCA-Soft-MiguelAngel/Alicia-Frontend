import React from "react";

import { Route, BrowserRouter as Router } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';

//IMPORT PAGES
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import ChartOfAccounts from "./pages/Accounting/ChartOfAccounts";
import Records from "./pages/Accounting/Records";
import Balance from "./pages/Accounting/Balance";
import AccountingMovement from './pages/Accounting/AccountingMovement'
import Test from './pages/Test'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/accounting/charts" exact component={ChartOfAccounts} />
      <Route path="/accounting/records" exact component={Records} />
      <Route path="/accounting/balance" exact component={Balance} />
      <Route path="/accounting/movement" exact component={AccountingMovement} />
      <Route path="/login" exact component={Login} />
      <Route path="/test" exact component={Test} />
    </Router>
  );
}

export default App;
