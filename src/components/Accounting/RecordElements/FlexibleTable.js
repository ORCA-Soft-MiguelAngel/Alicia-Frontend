import React, { useEffect, useState, useRef } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import {
  seatFlexibleColumns,
  recordFlexibleColumns,
} from "../../../helpers/columnData";
import { getDate, gimmeEmptyRecords } from "../../../helpers/functions";
import DefaultTable from "../../Table/DefaultTable";
import cellEditFactory from "react-bootstrap-table2-editor";

import axiosClient from "../../../config/axios";

//SPINNER
import PulseLoader from "react-spinners/PulseLoader";
import RecordsDifference from "./RecordsDifference";

//icons
import { ImArrowLeft } from "react-icons/im";
import ImportedRecordsModal from "./ImportedRecordsModal";

const FlexibleTable = ({
  companyId = "",
  setCreateSeats,
  setForceSeatSearch,
}) => {
  //STATES
  //seat state
  const [seat, setSeat] = useState({
    seatNumber: "",
    seatType: "OTROS",
    transactionDate: "",
    company: {
      id: companyId,
    },
  });
  //records states
  const [records, setRecords] = useState([]);
  //clients for this company
  const [accounts, setAccounts] = useState([]);
  //quantity of new rows
  const [quantityOfNewRows, setQuantityOfNewRows] = useState(5);
  //show alert
  const [showAlert, setShowAlert] = useState(false);
  //loading when creating seat
  const [loading, setLoading] = useState(false);
  //loading table elements
  const [loadingTable, setLoadingTable] = useState(false);
  //success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); //check to delete
  //Extras
  const [totalBalance, setTotalBalance] = useState({
    credit: 0,
    debit: 0,
    balance: 0,
  });
  //modal import data
  const [modalImportData, setModalImportData] = useState([]);
  //show final import modal accounts
  const [showImportModal, setShowImportModal] = useState(false);
  //test effect import
  const [activateImport, setActivateImport] = useState(false);

  //EFFECTS
  //effect to set the date and the number of the seat
  useEffect(() => {
    //get seats
    axiosClient.get(`/seats/company/${companyId}`).then((data) => {
      let largestSeat = 0;

      //compare numbers to get the largest seat
      data.data.forEach((seat) => {
        largestSeat =
          seat.seatNumber > largestSeat
            ? seat.seatNumber
            : seat.seatNumber === largestSeat
            ? largestSeat
            : largestSeat;
      });

      setSeat({
        ...seat,
        seatNumber: largestSeat + 1,
        transactionDate: "",
      });
    });

    axiosClient.get(`/accounts/company/${companyId}`).then((data) => {
      setAccounts(data.data);
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

  //pseudo effect, lets test the move of import data to records
  useEffect(() => {
    if (activateImport && modalImportData.length > 0) {
      let tmpTotalBalance = { credit: 0, debit: 0 };

      records.concat(modalImportData).forEach((elem) => {
        tmpTotalBalance.debit += Number(elem.debit);
        tmpTotalBalance.credit += Number(elem.credit);
      });

      setRecords(records.concat(modalImportData));
      setTotalBalance(tmpTotalBalance);
      setModalImportData([]);
      setActivateImport(false);
    }
  }, [activateImport, modalImportData, records]);

  //HANDLERS
  //handle change the quantity number
  const handleChangeQuantity = (e) => {
    if (!isNaN(e.target.value)) {
      setQuantityOfNewRows(e.target.value);
    }
  };
  //handle add more rows to records
  const handleCreateRows = (e) => {
    e.preventDefault();
    setRecords(gimmeEmptyRecords(quantityOfNewRows, records));
  };

  //handle update?
  const handleUpdateRecords = (newRecords) => {
    setRecords(newRecords);
  };

  //handle create seat with all its records (FINAL)
  const handleFinishThis = () => {
    setLoading(true);
    //if everything is fine, add everything

    let bool = true;
    records.forEach((record) => {
      if (
        record.account.id === "" ||
        record.balance === "0" ||
        record.balance === "--" ||
        record.accountNumber === "" ||
        record.accountDetails === "--" ||
        record.accountType === "--" ||
        record.parentAccount === "--"
      ) {
        if (bool) {
          bool = false;
        }
      }
    });

    //add everything? i guess
    if (bool) {
      axiosClient.post("/seats", seat).then((data) => {
        let tmpArr = [];
        records.forEach((record) => {
          let elem = record;
          elem.seat.id = data.data.id;
          tmpArr.push(elem);
        });
        //last fetch
        tmpArr.forEach((element) => {});
        axiosClient.post("/records/all", tmpArr).then((data) => {
          setLoading(false);
          setShowSuccessModal(true);
        });
      });
    } else {
      //something was wrong, fix it
      setShowAlert(true);
      setForceSeatSearch(seat);
      setLoading(false);
    }
  };

  //handle to change the debit credit and so on
  const handleChangeTotal = (incomingRecords) => {
    let totalDebit = 0;
    let totalCredit = 0;
    incomingRecords.forEach((incomingRecord) => {
      if (!isNaN(incomingRecord.credit) || !isNaN(incomingRecord.debit)) {
        totalDebit = totalDebit + Number(incomingRecord.debit);
        totalCredit = totalCredit + Number(incomingRecord.credit);
      } else {
        return;
      }
    });
    setTotalBalance({
      debit: totalDebit,
      credit: totalCredit,
      balance: totalDebit - totalCredit,
    });
  };

  //handle cell edit main table
  const handleCellEdit = (oldValue, newValue, row, col) => {
    //id is accountNumber, search if exist
    if (col.dataField === "accountNumber" && newValue !== "") {
      let data = accounts.filter(
        ({ accountNumber }) => accountNumber === newValue
      );

      //if is not empty, fill rhe other data with this info
      if (data.length > 0) {
        let tempRecords = records;
        for (let i = 0; i < tempRecords.length; i++) {
          if (row.hiddenId === tempRecords[i].hiddenId) {
            tempRecords[i].accountDetails = data[0].accountDetails;
            tempRecords[i].accountType = data[0].accountType;
            tempRecords[i].parentAccount = data[0].parentAccount;

            /**remember to add the id */
            tempRecords[i].account.id = data[0].id;
          }
        }
        handleUpdateRecords(tempRecords);
      }
    }
    //if is related to credit or debit
    if (col.dataField === "credit" || col.dataField === "debit") {
      if (newValue !== "") {
        let tempRecords = records;
        for (let i = 0; i < tempRecords.length; i++) {
          if (row.hiddenId === tempRecords[i].hiddenId) {
            if (col.dataField === "credit") {
              if (!isNaN(newValue)) {
                tempRecords[i].credit = newValue;
                tempRecords[i].balance =
                  tempRecords[i].debit - tempRecords[i].credit;
              } else {
              }
            } else if (col.dataField === "debit") {
              tempRecords[i].debit = newValue;
              tempRecords[i].balance =
                tempRecords[i].debit - tempRecords[i].credit;
            }
          }
        }
        handleUpdateRecords(tempRecords);
        handleChangeTotal(tempRecords);
      }
    }
  };

  //end this i guess
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setForceSeatSearch(seat.seatNumber);
    setCreateSeats(false);
  };

  //handle back to show seats in case you want to abort
  const handleCloseCreateSeats = () => {
    setCreateSeats(false);
  };

  //HANDLERS 2
  //handle the incoming data
  const handleImportedContent = (data) => {
    //1st. test the columns
    let validColumns = true;
    const columnsArr = [
      "accountNumber",
      "benefactor",
      "nfc",
      "transactionDetails",
      "debit",
    ];

    for (let i = 0; i < columnsArr.length; i++) {
      if (columnsArr[i] !== data.columns[i]) {
        validColumns = false;
      }
    }

    if (!validColumns) {
      return;
    }

    axiosClient.get(`/accounts/company/${companyId}`).then((result) => {
      const fetchedAccounts = result.data;

      //2nd. test each internal data
      let arr = [];
      data.forEach((importedRecord) => {
        let tmpObject = importedRecord;
        tmpObject.status = true;
        tmpObject.message = "valido";

        //test if the account exists
        const filter = fetchedAccounts.filter(
          ({ accountNumber }) => accountNumber === tmpObject.accountNumber
        );

        if (filter.length !== 1) {
          tmpObject.status = false;
          tmpObject.message = "El No. de cuenta no existe";
        } else {
          tmpObject.account = { id: filter[0].id };
          tmpObject.accountDetails = filter[0].accountDetails;
          tmpObject.accountType = filter[0].accountType;
          tmpObject.parentAccount = filter[0].parentAccount;
          tmpObject.seat = { id: "" };
        }

        if (filter.length > 1) {
          tmpObject.status = false;
          tmpObject.message = "Error de repeticion en la cuenta";
        }

        if (isNaN(tmpObject.debit) || isNaN(tmpObject.credit)) {
          tmpObject.status = false;
          tmpObject.message = "Debito o credito deben ser valores aceptables";
        } else {
          tmpObject.balance =
            Number(tmpObject.debit) - Number(tmpObject.credit);
        }

        arr.push(tmpObject);
      });

      //3rd. show the modal i guess
      setModalImportData(arr);
    });
  };

  //handle confirm import data
  const handleConfirmImportData = (data) => {
    const arr = modalImportData.filter(({ status }) => status === false);

    if (arr.length === 0) {
      setActivateImport(true);
      setShowImportModal(false);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <Button
          variant="outline-danger"
          onClick={handleCloseCreateSeats}
          className="d-flex align-items-center"
        >
          <ImArrowLeft size={25} />
          <span className="ml-2">Volver Atras</span>
        </Button>
      </div>
      <Row>
        <Col xs={7}>
          <BootstrapTable
            columns={seatFlexibleColumns}
            keyField="seatNumber"
            data={[seat]}
            bootstrap4
            striped
            bordered
            wrapperClasses="table-responsive" // This is the style provided by bootstrap 4, this will set the parent div with that class
            hover
            headerClasses="text-center align-middle"
            rowClasses="text-center"
            cellEdit={cellEditFactory({
              mode: "click",
              blurToSave: true,
              afterSaveCell: (oldValue, newValue, row, col) => {
                setSeat({
                  ...seat,
                  [col.dataField]: newValue,
                });
              },
            })}
          />
        </Col>
      </Row>
      <AlertDissmisible show={showAlert} setShow={setShowAlert} />
      <Row>
        <DefaultTable
          columns={recordFlexibleColumns}
          data={records}
          keyField="hiddenId"
          disableSearch
          noDataMessage="Selecciona el numero de filas que deseas insertar abajo"
          loading={loadingTable}
          editable
          editableProperties={{
            mode: "click",
            blurToSave: true,
            beforeSaveCell: handleCellEdit,
          }}
          handleImportedContent={handleImportedContent}
        />
      </Row>
      <Row className="mt-3 justify-content-between align-items-start">
        <Col className="">
          <Form>
            <Form.Group as={Row} controlId="quantity">
              <Form.Label column sm="3">
                Agregar Filas:
              </Form.Label>
              <Col sm="1" className="mx-0 px-0">
                <Form.Control
                  value={quantityOfNewRows}
                  onChange={handleChangeQuantity}
                />
              </Col>
              <Col sm="1">
                <Button onClick={handleCreateRows}>Crear</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        {/**-------------------------TOTAL BALANCE ------------------------------- */}
        <Col xs={4}>
          <RecordsDifference
            totalDebit={totalBalance.debit}
            totalCredit={totalBalance.credit}
          />
        </Col>
      </Row>
      <Row className="justify-content-end mx-0">
        <Button
          onClick={handleFinishThis}
          size="lg"
          className="text-center"
          style={{ minWidth: "157px" }}
          disabled={records.length === 0}
        >
          {!loading ? "Crear Asiento" : <PulseLoader size={20} color="white" />}
        </Button>
      </Row>
      <div>
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title className="text-success">Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tus registros han sido creados exitosamente!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSuccessModal}>
              Salir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <ImportedRecordsModal
          show={showImportModal}
          setShow={setShowImportModal}
          importData={modalImportData}
          setImportData={setModalImportData}
          handleConfirmImport={handleConfirmImportData}
        />
      </div>
    </div>
  );
};

export default FlexibleTable;

function AlertDissmisible({ show, setShow }) {
  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Tienes datos incompletos en tu tabla!</Alert.Heading>
        <p>
          no podemos guardar este asiento porque hay datos incompletos dentro de
          la tabla, asegurate de llenarlos todos antes de proceder
        </p>
      </Alert>
    );
  }
  return <div className="d-none"></div>;
}
