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
import ImportedAcoountsModal from "../../components/Accounting/ChartOfAccountElements/ImportedAcoountsModal";

const ChartOfAccounts = ({ history }) => {
  //STATE
  //GLOBAL COMP STATE
  const { CompanyStore } = useStores();
  //if the table is loading by useEffect
  const [loading, setLoading] = useState(false);
  //main content of the table, initially empty
  const [data, setData] = useState([]);

  //special data of the final modal, in case of import
  const [modalImportData, setModalImportData] = useState([]);
  //show final import modal accounts
  const [showImportModal, setShowImportModal] = useState(false);

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
  //effect when the data of the import change, to open the modal
  useEffect(() => {
    if (modalImportData.length > 0) {
      setShowImportModal(true);
    }
  }, [modalImportData]);

  //HANDLERS
  //handle imported content
  const handleImportedContent = (data) => {
    //1st. test the column data
    let validColumns = true;
    const columnsArr = [
      "accountNumber",
      "accountDetails",
      "accountType",
      "parentAccount",
    ];

    for (let i = 0; i < columnsArr.length; i++) {
      if (columnsArr[i] !== data.columns[i]) {
        validColumns = false;
      }
    }

    if (!validColumns) {
      return;
    }

    //2nd. test each internal data
    let arr = [];
    data.forEach((account) => {
      axiosClient
        .get(`/accounts/number/${account.accountNumber}`)
        .then((fetchedData) => {
          let tmpOject = account;
          tmpOject.status = true;
          tmpOject.message = "Valido";

          //test 1
          if (account.accountType !== account.accountNumber[0]) {
            tmpOject.status = false;
            tmpOject.message = "El tipo y el No. de Cuenta no coinciden";
          }

          //test 2
          if (fetchedData.data.length > 0) {
            //this account already exists
            tmpOject.status = false;
            tmpOject.message = "Esta cuenta ya existe";
          }

          //test 3
          if (
            data.filter(
              ({ accountNumber }) => accountNumber === account.accountNumber
            ).length > 1
          ) {
            tmpOject.status = false;
            tmpOject.message = "Esta cuenta se repite en el .CSV";
          }

          arr.push(tmpOject);
        });
    });

    //3rd now recreate the final modal, with the data
    console.log(data.length * 100);

    setTimeout(() => {
      setModalImportData(arr);
    }, data.length * 75);
  };

  //handle confirm import data
  const handleConfirmImportData = (data) => {
    const arr = data.filter(({ status }) => status === false);

    //only add this info if there is no problem
    if (arr.length === 0) {
      let finalPostAccountsArray = [];
      arr.forEach((account) => {
        let e = account;
        e.company = { id: CompanyStore.obtainCompany };
        finalPostAccountsArray.push(e);
      });
      //LETS FETCH Dude
      axiosClient
        .post(`/accounts/all`, finalPostAccountsArray)
        .then((data) => {
          //another axios client to fetch all accounts again
          setShowImportModal(false)
          setLoading(true);

          axiosClient
            .get(`/accounts/company/${CompanyStore.obtainCompany}`)
            .then((data) => {
              setData(data.data);
              setLoading(false);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
        noDataMessage="No hay cuentas registradas"
        buttonsBelowTable
        handleImportedContent={handleImportedContent}
      />
      {/**IMPORT CONFIRM MODAL */}
      <ImportedAcoountsModal
        show={showImportModal}
        setShow={setShowImportModal}
        importData={modalImportData}
        setImportData={setModalImportData}
        handleConfirmImport={handleConfirmImportData}
      />
    </MainLayout>
  );
};

export default withRouter(ChartOfAccounts);
