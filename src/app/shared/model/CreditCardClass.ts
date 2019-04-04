import {LabelI18N} from "./LabelI18N";
import {RecordStatus} from "./RecordStatus";
import {RewardInfo} from "./RewardInfo";

export interface CreditCardClass{
  code?:string;
  description?:LabelI18N;
  cashTransferFee?:number;
  payCreditCardGLAccount?:string;
  cashTransferGLAccount?:string;
  sadadPaymentGLAccount?:string;
  cardRef?:string;
  updatedBy?:string;
  lastUpdate?:Date;
  recStatus?:RecordStatus;
  groupId?:string;
  rewardInfo?:RewardInfo;
  cashBackPoints?:number;
  equivalentCashBackAmount?:number;
  isCashBackAllowed?:boolean;
  VATAmount?:number;

}
