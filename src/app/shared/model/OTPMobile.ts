import {OTPMobileType} from "./OTPMobileType";

export interface OTPMobile {
  mobileNo?: String;
  otpType: OTPMobileType;
  updatedBy?: String;
  lastUpdate: Date;
}
