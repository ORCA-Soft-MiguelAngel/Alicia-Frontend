import React, { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import NewAccountModal from "../../components/Accounting/ChartOfAccountElements/NewAccountModal";
import MainLayout from "../../components/Layouts/MainLayout";
import DefaultTable from "../../components/Table/DefaultTable";
import { chartOfAccountColumns } from "../../helpers/columnData";

//TEMPORAL IMPORTS (REMOVE LATER)
import { accountRows } from "../../helpers/dummyData";

const ChartOfAccounts = () => {
  //STATE
  //if the table is loading by useEffect
  const [loading, setLoading] = useState(false);
  //main content of the table, initially empty
  const [data, setData] = useState([]);

  //EFFECTS
  //main loading effect, to load the table
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setData(accountRows);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <MainLayout>
      <AccountingHeader
        title="Catalogo de cuentas"
        description="Lista de cuentas registradas para COMAPANIA"
      />
      {/**HERE WE GO WITH THE TABLE */}
      <DefaultTable
        columns={chartOfAccountColumns}
        data={data}
        loading={loading}
        keyField="accountNumber"
        extraButtons={<NewAccountModal />}
        buttonsBelowTable
      />
    </MainLayout>
  );
};

export default ChartOfAccounts;
