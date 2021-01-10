import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { recordsImportColumns } from "../../../helpers/columnData";
import PulseLoader from "react-spinners/PulseLoader";

const ImportedRecordsModal = ({
  show = false,
  setShow = () => {},
  importData = [],
  setImportData = () => {},
  handleConfirmImport = () => {},
}) => {
  //STATE
  //to print info about if every data is fine
  const [importStatus, setImportStatus] = useState(true);
  //loader effect
  const [loading, setLoading] = useState(false);

  //EFFECTS
  //effect to prevent show a wrong message status
  useEffect(() => {
    setLoading(false);
    const arr = importData.filter(({ status }) => status === false);
    arr.length > 0 ? setImportStatus(false) : setImportStatus(true);
  }, []);

  useEffect(() => {
    if (show) {
      setLoading(false);
    }
  }, [show]);

  //HANDLERS
  //handle when close modal
  const onCloseModal = () => {
    setImportData([]);
    setLoading(false);
    setShow(false);
  };

  //handle confirm
  const handleConfirmStartLoad = () => {
    setLoading(true);
    handleConfirmImport(importData);
  };

  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      dialogClassName="w-75 mw-100"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Cuentas a Importar
        </Modal.Title>
      </Modal.Header>
      {loading ? (
        <div className="w-100 d-flex justify-content-center my-5">
          <PulseLoader size={35} color="#5cb85c" />
        </div>
      ) : (
        <Modal.Body>
          <h5>
            {importStatus
              ? "Confirma para agregar todas las cuentas"
              : "No puedes importar debido a error en la informacion proporcionada, revisa la tabla para ver los detalles"}
          </h5>
          <div>
            <BootstrapTable
              columns={recordsImportColumns}
              data={importData}
              keyField="accountNumber"
            />
          </div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => setShow(false)}>
          Cerrar
        </Button>
        {importData.filter(({ status }) => status === false).length === 0 && (
          <Button variant="outline-success" onClick={handleConfirmStartLoad}>
            IMPORTAR
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ImportedRecordsModal;
