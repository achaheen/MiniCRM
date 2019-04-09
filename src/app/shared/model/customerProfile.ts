import {OTPMobile} from "./OTPMobile";
import {Address} from "./Address";
import {LabelI18N} from "./LabelI18N";
import {FullAddressList} from "./FullAddressList";
import {PassportDetails} from "./PassportDetails";
import {TransactionDetails} from "./TransactionDetails";
import {ExtendData} from "./ExtendData";
import {SegmentDetails} from "./SegmentDetails";
import {OTPMobileList} from "./OTPMobileList";
import {Caa} from "./Caa";

export interface CustomerProfile{

  customerType?: string;
  idNumber?: string;
  basicNumber?: string;
  name?: string;
  shortName?: string;
  firstName?: string;
  fatherName?: string;
  grandFatherName?: string;
  familyName?: string;
  firstNameArabic?: string;
  fatherNameArabic?: string;
  grandFatherNameArabic?: string;
  familyNameArabic?: string;
  eMail?: string;
  telephone?: string;
  fax?: string;
  branch?: string;
  issueDateHijri?: string;
  expiryDateHijri?: string;
  nationality?: string;
  gender?: string;
  dataEnteredBy?: string;
  dataEnteredDate?: string;
  title?: string;
  language?: string;
  olpIdAlias?: string;
  olpStatus?: string;
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
  caa?:Caa;
  iqamaProfession?:string;
  branchNo?:string;
  customerBranchAddressEn?: string;
  customerBranchAddressAr?: string;
  customerBranchAddressEnAr?: string;

}
