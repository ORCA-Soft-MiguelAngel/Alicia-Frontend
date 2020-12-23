import React, { useState, useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import AccountingHeader from "../../components/Accounting/AccountingHeader";
import NewAccountModal from "../../components/Accounting/ChartOfAccountElements/NewAccountModal";
import MainLayout from "../../components/Layouts/MainLayout";
import DefaultTable from "../../components/Table/DefaultTable";
import { chartOfAccountColumns } from "../../helpers/columnData";

import { withRouter } from "react-router-dom";
import useStores from "../../hooks/useStores";
import axiosClient from "../../config/axios";

//TEMPORAL IMPORTS (REMOVE LATER)
import { accountRows } from "../../helpers/dummyData";

const ChartOfAccounts = ({ history }) => {
  //STATE
  //GLOBAL COMP STATE
  const { CompanyStore } = useStores();
  //if the table is loading by useEffect
  const [loading, setLoading] = useState(false);
  //main content of the table, initially empty
  const [data, setData] = useState([]);

  //EFFECTS
  //initial effect, prevent load this if you dont have any company assigned
  useEffect(() => {
    if (CompanyStore.obtainCompany === "") {
      history.push("/dashboard");
    }
  }, [CompanyStore, history]);
  //main loading effect, to load the table
  useEffect(() => {
    setLoading(true);

    axiosClient
      .get(`/accounts/company/${CompanyStore.obtainCompany}`)
      .then((data) => {
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
        extraButtons={
          <NewAccountModal
            setData={setData}
            companyId={CompanyStore.obtainCompany}
          />
        }
        buttonsBelowTable
      />
    </MainLayout>
  );
};

export default withRouter(ChartOfAccounts);
