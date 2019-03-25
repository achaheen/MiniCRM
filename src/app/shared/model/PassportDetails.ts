export interface PassportDetails {

  passportNumber?: string;
  placeOfIssue?: string;
  issueDateHijri?: string;
  expiryDateHijri?: string;
  issueDateGregorian?:Date;
  expiryDateGregorian?:Date;
  dateOfBirthHijri?: string;
  dateOfBirthGregorian?:Date;
  placeOfBirth?: string;
  countryOfBirth?: string;

}
