import React, { useEffect, useState } from "react";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import FixedTable from "../../components/Accounting/RecordElements/FixedTable";
import MainLayout from "../../components/Layouts/MainLayout";

//test csv
import { csv } from "d3";
import test from "../../helpers/record.csv";
import { Row } from "react-bootstrap";
import ImportFromFileBodyComponent from "../../components/Utils/ImportFromFileBodyComponent";

import { withRouter } from "react-router-dom";
import useStores from "../../hooks/useStores";

const Records = ({ history }) => {
  //STATE
  //GLOBAL COMP STATE
  const { CompanyStore } = useStores();
  //import data
  const [importData, setImportData] = useState([]);

  //EFFECTS
  //EFFECTS
  //initial effect, prevent load this if you dont have any company assigned
  useEffect(() => {
    if (CompanyStore.obtainCompany === "") {
      history.push("/dashboard");
    }
  }, [CompanyStore, history]);
  //load csv?
  useEffect(() => {
    csv(test).then((data) => {
      // console.log(data);
    });
  }, []);

  //effect when import data change
  useEffect(() => {
    if (importData !== []) {
    }
  }, [importData]);

  return (
    <MainLayout>
      <AccountingHeader
        title="Registros"
        description="Lista de cuentas registradas para COMAPANIA"
      />

      {/**HERE WE GO WITH THE TABLE */}
      <FixedTable />
    </MainLayout>
  );
};

export default withRouter(Records);
