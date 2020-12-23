import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import MainLayout from "../../components/Layouts/MainLayout";
import DefaultTable from "../../components/Table/DefaultTable";
import AdvancedSearcher from "../../components/Accounting/BalanceElements/AdvancedSearcher";

import { withRouter } from "react-router-dom";
import useStores from "../../hooks/useStores";

//MISC IMP
import { accountingMoveColumns } from "../../helpers/columnData";

const AccountingMovement = ({ history }) => {
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
        title="Movimiento contable"
        description="Realiza busquedas para determinar tu movimiento contable"
      />
      {/**SEARCHER */}
      <Row className="mx-0">
        <Col md={12} lg={6} xl={4}>
          <AdvancedSearcher />
        </Col>
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

export default withRouter(AccountingMovement);
