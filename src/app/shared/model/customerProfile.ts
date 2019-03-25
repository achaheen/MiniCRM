import {OTPMobile} from "./OTPMobile";
import {Address} from "./Address";
import {LabelI18N} from "./LabelI18N";
import {FullAddressList} from "./FullAddressList";
import {PassportDetails} from "./PassportDetails";
import {TransactionDetails} from "./TransactionDetails";
import {ExtendData} from "./ExtendData";
import {SegmentDetails} from "./SegmentDetails";
import {OTPMobileList} from "./OTPMobileList";

export interface CustomerProfile{

  customerType?: String;
  idNumber?: String;
  name?: String;
  shortName?: String;
  firstName?: String;
  fatherName?: String;
  grandFatherName?: String;
  familyName?: String;
  firstNameArabic?: String;
  fatherNameArabic?: String;
  grandFatherNameArabic?: String;
  familyNameArabic?: String;
  eMail?: String;
  telephone?: String;
  fax?: String;
  branch?: String;
  issueDateHijri?: String;
  expiryDateHijri?: String;
  nationality?: String;
  gender?: String;
  dataEnteredBy?: String;
  dataEnteredDate?: String;
  title?: String;
  language?: String;
  olpIdAlias?: String;
  olpStatus?: String;
  otpMobileList?: OTPMobileList;
  issueDateGC?: Date;
  expiryDateGC?: Date;
  address?: Address;
  fullName?: LabelI18N;
  addressList?: FullAddressList;
  bajCustomer?: boolean;
  passportDetails?: PassportDetails;
  transactionDetails?: TransactionDetails;
  extendData?: ExtendData;
  segmentDetails?: SegmentDetails;

}
