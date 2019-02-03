import {BasicModelWithIDInt} from "./basicModelWithIDInt";

export interface CustomerAccounts extends BasicModelWithIDInt {

  customerNameAR?:string;
  customerNameEn?:string;
  email?:string;
  mobile?:string;
  nin?:string;
  segment?:string;
  customerCIF?:string;
  branchName?:string;


}
