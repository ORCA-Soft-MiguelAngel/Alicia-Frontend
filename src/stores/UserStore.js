import { makeAutoObservable } from "mobx";

export class UserStore {
  constructor() {
    // Call it here
    makeAutoObservable(this);
  }

  // LocalStorage or empty string
  user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : "";

  addToken = (token) => {
    // save the new token in the local storage
    this.user = token;

    // if added sccesfully, push to local Storage
    typeof window !== "undefined" &&
      localStorage.setItem("user", JSON.stringify(this.user));
  };

  removeToken = () => {
    this.user = "";

    typeof window !== "undefined" &&
      localStorage.setItem("user", JSON.stringify(this.user));
  };

  get obtainToken() {
    return this.user;
  }
}
