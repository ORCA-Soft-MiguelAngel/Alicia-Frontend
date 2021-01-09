import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import MainLayout from "../../components/Layouts/MainLayout";
import DefaultTable from "../../components/Table/DefaultTable";
import AdvancedSearcher from "../../components/Accounting/BalanceElements/AdvancedSearcher";

import { withRouter } from "react-router-dom";
import useStores from "../../hooks/useStores";

import axiosClient from "../../config/axios";

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
    dateFrom: "",
    dateTo: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  //EFFECTS
  //initial effect, prevent load this if you dont have any company assigned
  useEffect(() => {
    if (CompanyStore.obtainCompany === "") {
      history.push("/dashboard");
    }
  }, [CompanyStore, history]);

  //HANDLERS
  //handle onChange form
  const handleOnChangeForm = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    let valid = true;

    //if is account number
    if (id === "accountNumber") {
      if (/^(\d+-?)+\d+$/.test(value) || value === "") {
        showAlert && setShowAlert(false);
      } else {
        !showAlert && setShowAlert(true);
      }
    } else if (id === "accountType") {
      valid = !isNaN(value);
    }
    //if is account type
    if (valid) {
      setSearchForm({
        ...searchForm,
        [e.target.id]: e.target.value,
      });
    }
  };
  //handle when you want to search
  const handleSearch = () => {
    //API and everything you know
    let finalString = `/records/movement?companyId=${CompanyStore.obtainCompany}`;

    //accountNumber test
    if (searchForm.accountNumber !== "") {
      finalString += `&accountNumber=${searchForm.accountNumber}`;
    }

    //accountType test
    if (searchForm.accountType !== "") {
      finalString += `&accountType=${searchForm.accountType}`;
    }

    //dateFrom test
    if (searchForm.dateFrom !== "") {
      finalString += `&dateFrom=${searchForm.dateFrom}`;
    }
    //dateTo test
    if (searchForm.dateTo !== "") {
      finalString += `&dateTo=${searchForm.dateTo}`;
    }

    //AXIOS FETCH
    setData([]);
    setLoading(true);
    axiosClient
      .get(finalString)
      .then((incomingData) => {
        setData(incomingData.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
          <AdvancedSearcher
            form={searchForm}
            handleSearch={handleSearch}
            onChange={handleOnChangeForm}
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
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
