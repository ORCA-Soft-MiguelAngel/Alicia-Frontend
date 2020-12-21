import React, { useState, useEffect } from "react";
import {  } from "react-bootstrap";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import MainLayout from "../../components/Layouts/MainLayout";
import DefaultTable from "../../components/Table/DefaultTable";
import TableAction from "../../components/Table/TableAction";
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

  //HANDLERS
  const handleAdd = () => {};

  const handleCSV = () => {};

  return (
    <MainLayout>
      <AccountingHeader
        title="Catalogo de cuentas"
        description="Lista de cuentas registradas para COMAPANIA"
      />
      {/**HERE WE GO WITH THE TABLE */}
      <TableAction
        actionTitle="cuenta"
        addAction={handleAdd}
        csvAction={handleCSV}
      />
      <DefaultTable
        columns={chartOfAccountColumns}
        data={data}
        loading={loading}
      />
      <TableAction
        actionTitle="cuenta"
        addAction={handleAdd}
        csvAction={handleCSV}
      />
    </MainLayout>
  );
};

export default ChartOfAccounts;
