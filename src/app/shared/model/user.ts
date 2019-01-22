import {Userpreferences} from "./userpreferences";
import {Permissions} from "./permissions";

export interface User {
  createdBy?: string;
  creationDate?: Date;
  department?: string;
  email?: string;
  enabled?: boolean;
  firstName?: string;
  id?: number;
  lastName?: string;
  ldapuser?: boolean;
  loginAttempts?: number;
  modificationDate?: Date;
  modifiedBy?: string;
  staffID?: string;
  systemUser?: boolean;
  title?: string;
  userID?: string;
  authorities?: Permissions[];
  preferences?: Userpreferences;

}
