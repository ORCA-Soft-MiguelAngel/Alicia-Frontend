import React, { useEffect, useState } from "react";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import FixedTable from "../../components/Accounting/RecordElements/FixedTable";
import FlexibleTable from "../../components/Accounting/RecordElements/FlexibleTable";
import MainLayout from "../../components/Layouts/MainLayout";

//test csv
import { csv } from "d3";
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
  //check in what state you are, adding a new seat or watching one
  const [createSeats, setCreateSeats] = useState(false);
  //if you already created something, force to search
  const [forceSeatSearch, setForceSeatSearch] = useState(null);

  //EFFECTS
  //initial effect, prevent load this if you dont have any company assigned
  useEffect(() => {
    if (CompanyStore.obtainCompany === "") {
      history.push("/dashboard");
    }
  }, [CompanyStore, history]);
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
      {createSeats ? (
        <FlexibleTable
          companyId={CompanyStore.obtainCompany}
          setCreateSeats={setCreateSeats}
          setForceSeatSearch={setForceSeatSearch}
        />
      ) : (
        <FixedTable
          setCreateSeats={setCreateSeats}
          forceSearch={forceSeatSearch}
        />
      )}
    </MainLayout>
  );
};

export default withRouter(Records);
