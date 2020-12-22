import React, { useEffect, useState } from "react";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import FixedTable from "../../components/Accounting/RecordElements/FixedTable";
import MainLayout from "../../components/Layouts/MainLayout";

//test csv
import { csv } from "d3";
import test from "../../helpers/record.csv";
import { Row } from "react-bootstrap";
import ImportFromFileBodyComponent from "../../components/Utils/ImportFromFileBodyComponent";

const Records = () => {
  //STATE
  //import data
  const [importData, setImportData] = useState([]);

  //EFFECTS
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

export default Records;
