export function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;
  return today;
}

export function getANewRecordColumn(id = 0, seatId) {
  return {
    accountNumber: "",
    accountDetails: "--",
    accountType: "--",
    parentAccount: "--",
    benefactor: "",
    nfc: "",
    transactionDetails: "",
    credit: "0",
    debit: "0",
    balance: "--",
    //hidden id to match in react-table2
    hiddenId: id,
    //hidden data needed for fetch
    account: {
      id: "",
    },
    seat: {
      id: "",
    },
  };
}

export function gimmeEmptyRecords(numberOfRecords, previousRecods) {
  let newArr = [];
  let actualNumber = previousRecods.length + 1;

  //fill the previous records
  previousRecods.forEach((record) => {
    newArr.push(record);
  });

  for (let i = 0; i < numberOfRecords; i++) {
    newArr.push(getANewRecordColumn(actualNumber));
    actualNumber++;
  }

  return newArr;
}
