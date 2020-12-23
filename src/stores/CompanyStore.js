import { makeAutoObservable } from "mobx";

export class CompanyStore {
  constructor() {
    // Call it here
    makeAutoObservable(this);
  }

  // LocalStorage or empty string
  company =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("company"))
      ? JSON.parse(localStorage.getItem("company"))
      : "";

  addCompany = (company) => {
    // save the new company in the local storage
    this.company = company;

    // if added sccesfully, push to local Storage
    typeof window !== "undefined" &&
      localStorage.setItem("company", JSON.stringify(this.company));
  };

  removeCompany = () => {
    this.company = "";

    typeof window !== "undefined" &&
      localStorage.setItem("company", JSON.stringify(this.company));
  };

  get obtainCompany() {
    return this.company;
  }
}
