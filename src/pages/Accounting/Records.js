import React from "react";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import FixedTable from "../../components/Accounting/RecordElements/FixedTable";
import MainLayout from "../../components/Layouts/MainLayout";
const Records = () => {
  return (
    <MainLayout>
      <AccountingHeader
        title="Registros"
        description="Lista de cuentas registradas para COMAPANIA"
      />
      {/**HERE WE GO WITH THE TABLE */}
      <FixedTable/>
    </MainLayout>
  );
};

export default Records;
