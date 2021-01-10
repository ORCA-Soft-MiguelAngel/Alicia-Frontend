import React, { useState, useEffect, useCallback } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import DefaultTable, { NoDataIndication } from "../../Table/DefaultTable";

//HELPER IMPORTS
import {
  recordFixedColumns,
  seatFixedColumns,
} from "../../../helpers/columnData";
import RecordsDifference from "./RecordsDifference";
import axiosClient from "../../../config/axios";
import useStores from "../../../hooks/useStores";

const FixedTable = ({
  //data
  data = [{ seatNumber: 1, seatType: "aa" }],
  //setCreateSeats to control the state and change the view
  setCreateSeats = () => {},
  //if this have a seat on it force the search
  forceSearch = null,
}) => {
  //GLOBAL STATE
  const { CompanyStore } = useStores();
  //STATES
  //main seat data
  const [seatData, setSeatData] = useState([]);
  //main table data
  const [recordsData, setRecordsData] = useState([]);
  //total debit and credit
  const [totalDebitAndCredit, setTotalDebitAndCredit] = useState({
    debit: 0,
    credit: 0,
  });
  //input state
  const [searchSeat, setSearchSeat] = useState("");
  //alert state
  const [showAlert, setShowAlert] = useState(false);
  //show alert message if needed
  const [alertMessage, setAlertMessage] = useState(
    "Ingresa un termino correcto para la busqueda de asientos"
  );
  //state of table loading
  const [loadingTableData, setLoadingTableData] = useState(false);
  //no table content message
  const [noContentTableMessage, setNoContentTableMessage] = useState(
    "Busca Algo Primero"
  );

  //HELPERS
  //search function
  const search = useCallback((seatNumber = null) => {
    const tempSeatNumber = seatNumber ? seatNumber : 0;

    //ok if that didnt stop you, lets search
    setLoadingTableData(true);
    setSeatData([]);
    setRecordsData([]);

    axiosClient
      .get(`/seats/company/${CompanyStore.obtainCompany}/${tempSeatNumber}`)
      .then((seatFetch) => {
        axiosClient
          .get(`/records/seat/${CompanyStore.obtainCompany}/${tempSeatNumber}`)
          .then((recordsFetch) => {
            //calculate the total debit and credit
            let totalDebit = 0;
            let totalCredit = 0;
            if (recordsFetch.data.length > 0) {
              recordsFetch.data.forEach((record) => {
                totalDebit += record.debit;
                totalCredit += record.credit;
              });
            }

            //set the data
            setSeatData([seatFetch.data]);
            setRecordsData(recordsFetch.data);
            setTotalDebitAndCredit({ debit: totalDebit, credit: totalCredit });
            setLoadingTableData(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //EFFECTS
  //force search if you got something
  useEffect(() => {
    if (forceSearch !== null) {
      setLoadingTableData(true);
      search(forceSearch);
    }
  }, [forceSearch, search]);

  //HANDLERS
  //handle create seat
  const handleChangeToCreateSeat = () => {
    setCreateSeats(true);
  };
  //handle when you write something in the input searcher
  const handleSearcherInput = (e) => {
    if (!isNaN(e.target.value)) {
      setSearchSeat(e.target.value);
    }
  };
  //handle search a seat for you :)
  const handleSearchSeats = () => {
    setShowAlert(false);
    //first, test if is not empty
    if (searchSeat === "") {
      setShowAlert(true);
      return;
    }

    //use the helper function
    search(searchSeat);
  };

  return (
    <div>
      <Row className="mb-5 align-items-center">
        <Col xs={7}>
          <BootstrapTable
            columns={seatFixedColumns}
            keyField="seatNumber"
            data={seatData}
            bootstrap4
            striped
            bordered
            wrapperClasses="table-responsive" // This is the style provided by bootstrap 4, this will set the parent div with that class
            hover
            headerClasses="text-center align-middle"
            rowClasses="text-center"
            noDataIndication={() => (
              <NoDataIndication loading={loadingTableData} message={""} />
            )}
          />
        </Col>
        <Col xs={5} className="bg-light rounded border shadow-sm p-3">
          <Form.Group className="my-2">
            <Form.Label className="font-weight-bold">
              Buscar Por No. de Asiento
            </Form.Label>
            <Form.Control
              value={searchSeat}
              onChange={(e) => handleSearcherInput(e)}
              placeholder="No. de Asiento"
              className=""
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              variant={`${
                searchSeat === "" ? "outline-secondary" : "outline-primary"
              }`}
              disabled={searchSeat === ""}
              onClick={handleSearchSeats}
            >
              Buscar
            </Button>
            <Button
              variant="outline-success ml-2"
              onClick={handleChangeToCreateSeat}
            >
              Crear Asiento
            </Button>
          </div>
          <Alert show={showAlert} variant="danger" className="mt-2 mb-0">
            {alertMessage}
          </Alert>
        </Col>
      </Row>
      <Row>
        <DefaultTable
          columns={recordFixedColumns}
          data={recordsData}
          keyField="accountNumber"
          disableSearch
          noDataMessage={noContentTableMessage}
          loading={loadingTableData}
          disableImport
        />
      </Row>
      <Row className="mt-3 justify-content-end">
        <Col xs={4}>
          <RecordsDifference
            totalDebit={totalDebitAndCredit.debit}
            totalCredit={totalDebitAndCredit.credit}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FixedTable;
