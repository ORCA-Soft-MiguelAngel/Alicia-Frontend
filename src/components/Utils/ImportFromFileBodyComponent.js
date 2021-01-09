import React from "react";

import * as d3 from "d3";
import { Form } from "react-bootstrap";

const ImportFromFileBodyComponent = ({ handleImportedContent }) => {
  let fileReader;

  const handleFileRead = (e) => {
    const result = d3.csvParse(fileReader.result);
    // … do something with the 'content' …
    handleImportedContent(result);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;

    //fileReader.readAsText(file);
    fileReader.readAsText(file);
  };

  return (
    <div>
      <input
        type="file"
        id="actual-btn"
        hidden
        onChange={(e) => handleFileChosen(e.target.files[0])}
        accept=".csv"
      />
      <label className="btn btn-outline-success btn-sm" for="actual-btn">
        Buscar archivo...
      </label>
    </div>
  );
};

export default ImportFromFileBodyComponent;
