import React, { useState } from "react";
import { Row } from "react-bootstrap";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import MainLayout from "../../components/Layouts/MainLayout";
import DefaultTable from "../../components/Table/DefaultTable";
import AdvancedSearcher from '../../components/Accounting/BalanceElements/AdvancedSearcher'

//MISC IMP
import { accountingMoveColumns } from "../../helpers/columnData";

const AccountingMovement = () => {
  //STATE
  //if the table is loading by useEffect
  const [loading, setLoading] = useState(false);
  //main content of the table, initially empty
  const [data, setData] = useState([]);
  //search form
  const [searchForm, setSearchForm] = useState({
    accountNumber: "",
    accountType: "",
    from: "",
    to: "",
  });

  //HANDLERS
  //handle when you want to search
  const handleSearch = () => {
    //API and everything you know
  };

  return (
    <MainLayout>
      <AccountingHeader
        title="Movimiento contable"
        description="Realiza busquedas para determinar tu movimiento contable"
      />
      {/**SEARCHER */}
      <Row>
        <AdvancedSearcher/>
      </Row>

      {/**HERE WE GO WITH THE TABLE */}
      <DefaultTable
        columns={accountingMoveColumns}
        data={data}
        loading={loading}
        keyField="accountNumber"
        disableSearch
        disableImport
      />
    </MainLayout>
  );
};

export default AccountingMovement;
