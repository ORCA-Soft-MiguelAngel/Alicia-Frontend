import { Type } from 'react-bootstrap-table2-editor'

export const chartOfAccountColumns = [
  {
    dataField: "accountNumber",
    text: "Numero de cuenta",
  },
  {
    dataField: "accountDetails",
    text: "Detalles de la cuenta",
    sort: true,
  },
  {
    dataField: "accountType",
    text: "Tipo de cuenta",
  },
  {
    dataField: "parentAccount",
    text: "Cuenta madre",
    sort: true,
  },
];

export const seatFixedColumns = [
  {
    dataField: "seatNumber",
    text: "No. de asiento",
  },
  {
    dataField: "seatType",
    text: "Tipo de asiento",
  },
  {
    dataField: "transactionDate",
    text: "Fecha de transaccion",
  },
];

export const seatFlexibleColumns = [
  {
    dataField: "seatNumber",
    text: "No. de asiento",
  },
  {
    dataField: "seatType",
    text: "Tipo de asiento",
    editor: {
      type: Type.SELECT,
      options: [
        {
          value: "NOMINA",
          label: "Asiento de nomina",
        },
        {
          value: "VENTAS",
          label: "Asiento de ventas",
        },
        {
          value: "COMPRAS",
          label: "Asiento de compras",
        },
        {
          value: "PAGO",
          label: "Asiento de pago",
        },
        {
          value: "COBRO",
          label: "Asiento de cobro",
        },
        {
          value: "OTROS",
          label: "Otros tipos de asiento",
        },
      ],
    },
  },
  {
    dataField: "transactionDate",
    text: "Fecha de transaccion",
  },
];

export const recordFixedColumns = [
  {
    dataField: "accountNumber",
    text: "No. de cuenta",
  },
  {
    dataField: "accountDetail",
    text: "Detalle de cuenta",
  },
  {
    dataField: "accountType",
    text: "Tipo de cuenta",
  },
  {
    dataField: "parentAccount",
    text: "Cuenta madre",
  },
  {
    dataField: "benefactor",
    text: "Nombre de cliente / beneficiario / benefactor",
  },
  {
    dataField: "ncf",
    text: "Numero de NFC",
  },
  {
    dataField: "transactionDetails",
    text: "Detalle de la transaccion",
  },
  {
    dataField: "credit",
    text: "Credito",
  },
  {
    dataField: "debit",
    text: "Debito",
  },
  {
    dataField: "balance",
    text: "Balance",
  },
];

export const recordFlexibleColumns = [
  {
    dataField: "accountNumber",
    text: "No. de cuenta",
  },
  {
    dataField: "accountDetail",
    text: "Detalle de cuenta",
  },
  {
    dataField: "accountType",
    text: "Tipo de cuenta",
  },
  {
    dataField: "parentAccount",
    text: "Cuenta madre",
  },
  {
    dataField: "benefactor",
    text: "Nombre de cliente / beneficiario / benefactor",
    editable:true
  },
  {
    dataField: "ncf",
    text: "Numero de NFC",
    editable:true
  },
  {
    dataField: "transactionDetails",
    text: "Detalle de la transaccion",
    editable:true
  },
  {
    dataField: "credit",
    text: "Credito",
    editable:true
  },
  {
    dataField: "debit",
    text: "Debito",
    editable:true
  },
  {
    dataField: "balance",
    text: "Balance",
  },
];

export const balanceColumns = [
  {
    dataField: "accountNumber",
    text: "Numero de cuenta",
  },
  {
    dataField: "accountDetails",
    text: "Detalle de cuenta",
  },
  {
    dataField: "accountType",
    text: "Tipo de cuenta",
  },
  {
    dataField: "parentAccount",
    text: "Cuenta madre",
  },
  {
    dataField: "balance",
    text: "Saldo",
  },
]

export const accountingMoveColumns = [
  {
    dataField: "accountNumber",
    text: "No. de cuenta",
  },
  {
    dataField: "accountDetail",
    text: "Detalle de cuenta",
  },
  {
    dataField: "accountType",
    text: "Tipo de cuenta",
  },
  {
    dataField: "parentAccount",
    text: "Cuenta madre",
  },
  {
    dataField: "benefactor",
    text: "Nombre de cliente / beneficiario / benefactor",
  },
  {
    dataField: "ncf",
    text: "Numero de NFC",
  },
  {
    dataField: "transactionDetails",
    text: "Detalle de la transaccion",
  },
  {
    dataField: "credit",
    text: "Credito",
  },
  {
    dataField: "debit",
    text: "Debito",
  },
  {
    dataField: "balance",
    text: "Balance",
  },
  {
    dataField: "seatNumber",
    text: "Numero de asiento",
  },
  {
    dataField: "seatType",
    text: "Tipo de asiento",
  },
  {
    dataField: "transactionDate",
    text: "Fecha de transaccion",
  },
];