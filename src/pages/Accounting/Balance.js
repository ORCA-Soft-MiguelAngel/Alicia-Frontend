import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import AdvancedSearcher from "../../components/Accounting/BalanceElements/AdvancedSearcher";
import MainLayout from "../../components/Layouts/MainLayout";
import DefaultTable from "../../components/Table/DefaultTable";

import { withRouter } from "react-router-dom";
import useStores from "../../hooks/useStores";

//MISC IMP
import { balanceColumns } from "../../helpers/columnData";

const Balance = ({ history }) => {
  //STATE
  //GLOBAL COMP STATE
  const { CompanyStore } = useStores();
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

  //EFFECTS
  //initial effect, prevent load this if you dont have any company assigned
  useEffect(() => {
    if (CompanyStore.obtainCompany === "") {
      history.push("/dashboard");
    }
  }, [CompanyStore, history]);

  //HANDLERS
  //handle when you want to search
  const handleSearch = () => {
    //API and everything you know
  };

  return (
    <MainLayout>
      <AccountingHeader
        title="Balance contable"
        description="Realiza busquedas para determinar tus balances"
      />
      {/**SEARCHER */}
      <Row>
        <AdvancedSearcher />
      </Row>

      {/**HERE WE GO WITH THE TABLE */}
      <DefaultTable
        columns={balanceColumns}
        data={data}
        loading={loading}
        keyField="accountNumber"
        disableSearch
        disableImport
      />
    </MainLayout>
  );
};

export default withRouter(Balance);
