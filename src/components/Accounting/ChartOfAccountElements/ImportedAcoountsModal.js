import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import { chartOfAccountImportColumns } from "../../../helpers/columnData";
import PulseLoader from "react-spinners/PulseLoader";

const ImportedAcoountsModal = ({
  show = false,
  setShow = () => {},
  importData = [],
  setImportData = () => {},
  handleConfirmImport = () => {},
  loading = false,
  setLoading = ()=>{}
}) => {
  //STATE
  //to print info about if every data is fine
  const [importStatus, setImportStatus] = useState(true);
  
  //EFFECTS
  //effect to prevent show a wrong message status
  useEffect(() => {
    const arr = importData.filter(({ status }) => status === false);
    arr.length > 0 ? setImportStatus(false) : setImportStatus(true);
  }, []);

  //HANDLERS
  //handle when close modal
  const onCloseModal = () => {
    setImportData([]);
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
              columns={chartOfAccountImportColumns}
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
        <Button
          variant="outline-success"
          disabled={!importStatus}
          onClick={handleConfirmStartLoad}
        >
          IMPORTAR
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImportedAcoountsModal;
