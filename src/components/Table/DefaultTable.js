import React from "react";
import { Row, Col } from "react-bootstrap";
//TABLE IMPORTS
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";

//SPINNER LOAD
import PulseLoader from "react-spinners/PulseLoader";
import ImportModal from "../Accounting/ImportModal";

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;

const DefaultTable = ({
  //columns
  columns,
  //rows
  data,
  //loading state, comes from outside because of the useEffects
  loading = false,
  //you need to specify the keyfield
  keyField = 1,
  //editable columns?
  editable = false,
  //if editable, which properties do you want?
  editableProperties = { mode: "click" },
  //disable search
  disableSearch = false,
  //disable imports
  disableImport = false,
  //modalTitle
  modalTitle = "Import",
  //extra buttons
  extraButtons = <></>,
  //buttons also below table?
  buttonsBelowTable = false,
  //message if there is no data in the table to show
  noDataMessage = "Todavia no hay registros :(",
  //ref
  ref,
  //handle import content if not disabled
  handleImportedContent = (data) => {}
}) => {
  return (
    <ToolkitProvider
      ref={ref && ref}
      columns={columns}
      data={data}
      keyField={keyField}
      bootstrap4
      search
      exportCSV
    >
      {(props) => (
        <div>
          <Row className="align-items-center justify-content-between">
            <Col xs={12} lg={6} className="d-flex align-items-center">
              {!disableSearch && (
                <React.Fragment>
                  <h5>Buscar:</h5>
                  <SearchBar
                    {...props.searchProps}
                    className="ml-3"
                    placeholder="Buscar por cualquier elemento..."
                  />
                </React.Fragment>
              )}
            </Col>
            <Col xs={12} lg={6} className="text-right">
              {extraButtons}
              {!disableImport && <ImportModal modalTitle={modalTitle} handleImportedContent={handleImportedContent} />}
              <ExportCSVButton
                className="btn btn-outlined-success"
                {...props.csvProps}
              >
                Exportar CSV
              </ExportCSVButton>
            </Col>
          </Row>
          <hr className="mt-2" />
          <BootstrapTable
            pagination={paginationFactory(paginationOptions(data))}
            noDataIndication={() => (
              <NoDataIndication loading={loading} message={noDataMessage} />
            )}
            bootstrap4
            search
            striped
            tabIndexCell
            bordered={false}
            wrapperClasses="table-responsive" // This is the style provided by bootstrap 4, this will set the parent div with that class
            hover
            cellEdit={editable && cellEditFactory(editableProperties)}
            headerClasses="text-center align-middle"
            {...props.baseProps}
            rowClasses="text-center"
          />
          {buttonsBelowTable && (
            <Row className="justify-content-end">
              {extraButtons}
              {!disableImport && <ImportModal modalTitle={modalTitle} handleImportedContent={handleImportedContent} />}
              <ExportCSVButton
                className="btn btn-outlined-success"
                {...props.csvProps}
              >
                Exportar CSV
              </ExportCSVButton>
            </Row>
          )}
        </div>
      )}
    </ToolkitProvider>
  );
};

export default DefaultTable;

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    Showing {from} to {to} of {size} Results
  </span>
);

const paginationOptions = (data) => {
  return {
    paginationSize: 4,
    pageStartIndex: 1,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Back",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: data.length,
      },
    ], // A numeric array is also available. the purpose of above example is custom the text
  };
};

export const NoDataIndication = ({
  loading,
  message = "Todavia no hay registros :(",
}) => (
  <div className="my-5">
    {!loading ? (
      <h3>{message}</h3>
    ) : (
      <PulseLoader size={25} color={`#38ef7d`} loading />
    )}
  </div>
);
