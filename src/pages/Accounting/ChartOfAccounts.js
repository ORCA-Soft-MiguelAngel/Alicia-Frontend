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
import { Collapse } from "bootstrap";

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
  //import modal loading
  const [importLoading, setImportLoading] = useState(false);

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
    setTimeout(() => {
      if (modalImportData.length > 0) {
        setShowImportModal(true);
      }
    }, 150);
  }, [modalImportData]);

  //HANDLERS
  //handle imported content
  const handleImportedContent = (impData) => {
    //1st. test the column impData
    let validColumns = true;
    const columnsArr = [
      ["accountNumber", "Numero de cuenta"],
      ["accountDetails", "Detalles de la cuenta"],
      ["accountType", "Tipo de cuenta"],
      ["parentAccount", "Cuenta madre"],
    ];

    let count = 0;
    impData.columns.forEach((column) => {
      if (count < 4) {
        const exists = columnsArr[count].some(
          (element) =>
            element.toString().toLowerCase() === column.toString().toLowerCase()
        );
        if (!exists) {
          validColumns = false;
        }
        count++;
      }
    });

    if (!validColumns) {
      return;
    }

    //1.5 conversion columns
    let data = [];
    impData.forEach((element) => {
      let objArr = Object.values(element);
      let object = {};
      object.accountNumber = objArr[0];
      object.accountDetails = objArr[1];
      object.accountType = objArr[2];
      object.parentAccount = objArr[3];
      data.push(object);
    });

    //2nd. test each internal data
    let arr = [];

    axiosClient
      .get(`/accounts/company/${CompanyStore.obtainCompany}`)
      .then((incomingAccounts) => {
        data.forEach((account) => {
          //add all
          let tmpOject = account;
          tmpOject.status = true;
          tmpOject.message = "Valido";

          //test 1
          if (account.accountType !== account.accountNumber[0]) {
            tmpOject.status = false;
            tmpOject.message = "El tipo y el No. de Cuenta no coinciden";
          }

          //test 2
          const exists = incomingAccounts.data.some(
            ({ accountNumber }) => accountNumber === account.accountNumber
          );
          if (exists) {
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

          //push to
          arr.push(tmpOject);
        });

        //move to
        //3rd now recreate the final modal, with the data
        setTimeout(() => {
          setModalImportData(arr);
        }, 150);
      });
  };

  //handle confirm import data
  const handleConfirmImportData = (data) => {
    const arr = data.filter(({ status }) => status === false);

    //only add this info if there is no problem
    if (arr.length === 0) {
      let finalPostAccountsArray = [];
      data.forEach((account) => {
        let e = account;
        e.company = { id: CompanyStore.obtainCompany };
        finalPostAccountsArray.push(e);
      });
      //LETS FETCH Dude
      axiosClient
        .post(`/accounts/all`, finalPostAccountsArray)
        .then((result) => {
          //another axios client to fetch all accounts again
          setImportLoading(false);
          setLoading(true);
          setShowImportModal(false);

          axiosClient
            .get(`/accounts/company/${CompanyStore.obtainCompany}`)
            .then((updateResult) => {
              setData(updateResult.data);
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
        loading={importLoading}
        setLoading={setImportLoading}
      />
    </MainLayout>
  );
};

export default withRouter(ChartOfAccounts);
