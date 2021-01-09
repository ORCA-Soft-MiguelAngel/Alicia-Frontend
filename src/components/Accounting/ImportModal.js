import React, { useMemo, useState, useCallback } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import ImportFromFileBodyComponent from "../Utils/ImportFromFileBodyComponent";
import csvImportImage from "../../images/imports/csv-import.jpeg";
import * as d3 from "d3";

/**RELATED WITH THE MODAL STYLE */
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",

  height: "400px",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const ImportModal = ({ modalTitle = "Import", handleImportedContent }) => {
  //STATES
  //state related with the modal
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      {/**CARD */}
      <Button variant="outline-success mx-3" onClick={() => setModalShow(true)}>
        Importar CSV
      </Button>{" "}
      {/**MODAL */}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalTitle}
        handleImportedContent={handleImportedContent}
      />
    </>
  );
};

export default ImportModal;

function MyVerticallyCenteredModal({
  show,
  onHide, //Modal title
  title = "Import", //modal title
  handleImportedContent,
}) {

  //DROPZONE FUNCTION WHEN YPU DROP A FILE
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        //process everything
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          handleImportedContent(d3.csvParse(reader.result));
          onHide()
        }
        reader.readAsText(file);
      });
    },
    []
  );

  //DROPZONE CHOOK CALL
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "text/csv", onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <Modal
      centered
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} lg={6} className="px-0">
            {/**DRAG n DROP */}
            <Row className="mx-0">
              <div className="container">
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  <p className="text-center">
                    Suelta los archivos que necesites aqui, nos encargaremos del
                    resto :)
                  </p>
                </div>
              </div>
            </Row>
            <Row className="mx-0 mt-4 justify-content-center">
              <ImportFromFileBodyComponent
                handleImportedContent={handleImportedContent}
              />
            </Row>
          </Col>
          <Col xs={12} lg={6}>
            <Row className="mx-0" style={{ height: "400px" }}>
              <Card>
                <Card.Img variant="top" src={csvImportImage} />
                <Card.Body>
                  <Card.Title>Descarga plantilla</Card.Title>
                  <Card.Text>
                    <p>
                      Los archivos que deseas importar deben de coincidir con
                      los datos que seran integrados a la tabla.
                    </p>
                    <p className="mb-0">
                      Si no sabes exactamente cuales necesitas, descarga la
                      plantilla!
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
            <Row className="mx-0 mt-4 justify-content-center">
              <Button size="sm" variant="outline-primary">
                Descargar plantilla
              </Button>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
