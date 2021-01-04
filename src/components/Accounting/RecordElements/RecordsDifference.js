import React from "react";
import { Table } from "react-bootstrap";

const RecordsDifference = ({
  totalCredit = "",
  totalDebit = "",
}) => {
  return (
    <Table borderless className="text-right">
      <thead className="text-center">
        <tr>
          <th></th>
          <th className="bg-dark text-white border border-white">Debito Total</th>
          <th className="bg-dark text-white border border-white">Credito Total</th>
        </tr>
      </thead>
      <tbody className="">
        <tr className="">
          <td>{``}</td>
          <td className="bg-light border">
            <span>$</span>
            <span className="">{totalDebit}</span>
          </td>
          <td className="bg-light border">
            <span>$</span>
            <span className="">{totalCredit}</span>
          </td>
        </tr>
        <tr>
          <td>Verificacion:</td>
          <td colSpan="2" className="bg-light border">
            <span className="">$</span>
            <span className={`font-weight-bold ${totalDebit-totalCredit === 0 ? 'text-success':'text-danger'}`}>{totalDebit - totalCredit}</span>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default RecordsDifference;
