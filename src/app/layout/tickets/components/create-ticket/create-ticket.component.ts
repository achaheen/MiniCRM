import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketsService} from '../../../../shared/services/tickets.service';
import {Ticket} from '../../../../shared/model/ticket';
import {UtilsService} from '../../../../shared/services/utils.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MainCategoryService} from '../../../../shared/services/main-category.service';
import {SubCategoryService} from '../../../../shared/services/sub-category.service';
import {TopicService} from '../../../../shared/services/topic.service';
import {Type} from '../../../../shared/model/type';
import {Priority} from '../../../../shared/model/priority';
import {CustomerAccounts} from '../../../../shared/model/customerAccounts';
import {TicketHolder} from '../../../../shared/model/ticketHolder';
import {FileUploadService} from '../../../../shared/services/file-upload.service';
import {BasicTopicSelection} from '../../../general/basic-topic-selection';
import {SourceChannel} from '../../../../shared/model/source-channel';
import {DynamicFieldsComponent} from '../dynamic-fields/dynamic-fields.component';
import {TicketExtData} from '../../../../shared/model/ticketExtData';
import {Subscription} from 'rxjs';
import {SharedCustomerInfoService} from '../../../../shared/services/shared-customer-info.service';
import {CustomerProfile} from '../../../../shared/model/customerProfile';
import {OTPMobileType} from '../../../../shared/model/OTPMobileType';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']

})
export class CreateTicketComponent extends BasicTopicSelection implements OnInit, OnDestroy {

  ticket: Ticket = {};
  ticketHolder: TicketHolder = {};
  ticketForm: FormGroup;
  maxFileSize = 15000000;
  maxUploadFiles = 10;
  ticketTypeList: Type[];
  // channelList: Channel[];
  selectedTicketType: Type;
  selectedPriority: Priority;
  selectedChannel: SourceChannel;
  @Input() selectedAccount: CustomerAccounts;
  uploadedFiles: any[] = [];
  attachments: any[] = [];
  lockAfterSave = false;
  @ViewChild('dynFields') dynFieldsComp: DynamicFieldsComponent;
  public subscription: Subscription;
  customerProfile: CustomerProfile;

  constructor(public utils: UtilsService,
              public ticketHttp: TicketsService,
              public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService,
              public topicService: TopicService,
              public sharedInfoService: SharedCustomerInfoService,
              public fb: FormBuilder, public fileUploadService: FileUploadService) {
    super(topicService, subCategoryService, mainCategoryService, utils);
    this.enableAdminSelection = false;
    this.authorizedTopicsRequest = {permissions: ['create']};
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.subscription = this.sharedInfoService.currentSubject.subscribe(value => {
      if (value !== null && value !== '') {
        this.customerProfile = value as CustomerProfile;
        this.copySelectedAccountFromProfile();
      }
      this.initTicketForm();
      this.initValueLists();
      this.updateCustomerAccountFields();
    });

  }

  updateCustomerAccountFields() {
    if (this.selectedAccount != null) {
      this.ticketForm.controls['CustomerBasic'].setValue(this.selectedAccount.customerCIF);
      this.ticketForm.controls['CustomerBasic'].updateValueAndValidity();
      this.ticketForm.controls['CustomerNameEn'].setValue(this.selectedAccount.customerNameEn);
      this.ticketForm.controls['CustomerNameEn'].updateValueAndValidity();
      this.ticketForm.controls['CustomerNameAr'].setValue(this.selectedAccount.customerNameAR);
      this.ticketForm.controls['CustomerNameAr'].updateValueAndValidity();
      this.ticketForm.controls['CustomerBranch'].setValue(this.selectedAccount.branchName);
      this.ticketForm.controls['CustomerBranch'].updateValueAndValidity();
      this.ticketForm.controls['CustomerMobile'].setValue(this.selectedAccount.mobile);
      this.ticketForm.controls['CustomerMobile'].updateValueAndValidity();
      this.ticketForm.controls['CustomerEmail'].setValue(this.selectedAccount.email);
      this.ticketForm.controls['CustomerEmail'].updateValueAndValidity();
      this.ticketForm.controls['CustomerSegment'].setValue(this.selectedAccount.segment);
      this.ticketForm.controls['CustomerSegment'].updateValueAndValidity();
      this.ticketForm.controls['CustomerNationalID'].setValue(this.selectedAccount.nin);
      this.ticketForm.controls['CustomerNationalID'].updateValueAndValidity();
    }
  }

  initValueLists() {
    this.listAllMainCategories();
  }

  copySelectedAccountFromProfile() {
    if (this.customerProfile != null) {
      console.log('Customer Profile ' + JSON.stringify(this.customerProfile));
      this.selectedAccount = {};
      this.selectedAccount.nin = this.customerProfile.idNumber;
      this.selectedAccount.segment = this.customerProfile.customerType;
      this.selectedAccount.email = this.customerProfile.eMail;
      this.customerProfile.otpMobileList.otpMobile.forEach(value => {
        if (value.otpType === 'PRIMARY') {
          this.selectedAccount.mobile = value.mobileNo;
        }
      });
      this.selectedAccount.branchName = this.customerProfile.customerBranchAddressEnAr;
      try {
        this.selectedAccount.customerCIF = this.customerProfile.caa.customerNo;
        this.selectedAccount.customerNameAR = this.customerProfile.fullName.descriptionList[1].value;
        this.selectedAccount.customerNameEn = this.customerProfile.fullName.descriptionList[0].value;
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    }
  }

  initTicketForm() {


    this.ticketForm = this.fb.group({
      'TicketID': new FormControl(''),
      'Subject': new FormControl(''),
      'TicketType': new FormControl('', Validators.required),
      'Channel': new FormControl('', Validators.required),
      'Priority': new FormControl(''),
      'Details': new FormControl('', Validators.required),
      'CustomerBasic': new FormControl(''),
      'CustomerNationalID': new FormControl(''),
      'CustomerNameEn': new FormControl(''),
      'CustomerNameAr': new FormControl(''),
      'CustomerMobile': new FormControl('', Validators.compose([Validators.pattern('[05][0-9]{9}')])),
      'CustomerSegment': new FormControl(''),
      'CustomerBranch': new FormControl(''),
      'CustomerEmail': new FormControl('', Validators.compose([Validators.email]))
    });
  }

  onChangeType() {
    if (this.selectedTicketType != null && this.selectedTicketType.typeID != null) {
      this.ticketForm.controls.TicketType.setValue(this.selectedTicketType);
    } else {
      this.ticketForm.controls.TicketType.setValue(null);
    }
    this.ticketForm.controls.TicketType.updateValueAndValidity();
  }

  onChangePriority() {
    if (this.selectedPriority != null && this.selectedPriority.priorityValue != null) {
      this.ticketForm.controls.Priority.setValue(this.selectedPriority);
    } else {
      this.ticketForm.controls.Priority.setValue(null);
    }
    this.ticketForm.controls.Priority.updateValueAndValidity();
  }

  onChangeChannel() {
    if (this.selectedChannel != null && this.selectedChannel.channelID != null) {
      this.ticketForm.controls.Channel.setValue(this.selectedChannel);
    } else {
      this.ticketForm.controls.Channel.setValue(null);
    }
    this.ticketForm.controls.Channel.updateValueAndValidity();
  }

  bindFormToTicket() {

    this.ticket.topic = this.selectedTopic;
    this.ticket.subject = this.ticketForm.value.Subject;
    this.ticket.ticketType = this.selectedTicketType.typeID;
    this.ticket.sourceChannel = this.selectedChannel.channelID;
    this.ticket.priority = this.selectedPriority.priorityValue;
    this.ticket.details = this.ticketForm.value.Details;
    const customerAccount: CustomerAccounts = {};
    customerAccount.customerCIF = this.ticketForm.value.CustomerBasic;
    customerAccount.customerNameEn = this.ticketForm.value.CustomerNameEn;
    customerAccount.customerNameAR = this.ticketForm.value.CustomerNameAr;
    customerAccount.branchName = this.ticketForm.value.CustomerBranch;
    customerAccount.mobile = this.ticketForm.value.CustomerMobile;
    customerAccount.email = this.ticketForm.value.CustomerEmail;
    customerAccount.segment = this.ticketForm.value.CustomerSegment;

    if (this.selectedAccount != null) {
      customerAccount.id = this.selectedAccount.id;
    }

    this.ticket.customerAccount = customerAccount;
    this.ticketHolder.ticket = this.ticket;
    this.ticketHolder.customerAccount = customerAccount;
    this.ticketHolder.attachments = this.attachments[0];
    if (this.mainCatConfigurations != null) {
      if (this.mainCatConfigurations.slicedFields != null) {
        const extData: TicketExtData = {};

        this.mainCatConfigurations.slicedFields.forEach(value => {
          value.forEach(value1 => {
            if (value1.type !== -1) {
              if (value1.value === null) {
                value1.value = '';
              }
              extData[value1.mappedField] = value1.value;
            }
          });
        });
        this.ticketHolder.extDataList = [extData];
      }
    }
  }

  clearDynamicFields() {
    if (this.dynFieldsComp != null && this.dynFieldsComp != null) {
      this.mainCatConfigurations.slicedFields.forEach(value => {
        value.forEach(value1 => {
          value1.value = null;
        });
      });
    }
  }

  reset() {
    console.log('Reset Ticket');
    this.lockAfterSave = false;
    this.ticketHolder = {};
    this.ticket = {};
    this.selectedMainCategory = {};
    this.subCategories = [];
    this.selectedSubCategory = {};
    this.topics = [];
    this.selectedTopic = {};
    this.ticketForm.reset();
    this.ticketForm.updateValueAndValidity();
    this.attachments = [];
    this.uploadedFiles = [];
    if (this.dynFieldsComp != null) {
      this.clearDynamicFields();
      this.ticket.ticketExtData = [];
    }
    this.updateCustomerAccountFields();
  }

  SaveTicket() {
    console.log('Start Save Ticket');
    if (this.selectedTopic == null) {
      //// this.messageService.add({severity: 'error', summary: 'Failed', detail: 'No Topic Selected'});
      return;
    }
    this.bindFormToTicket();
    this.ticketHttp.create(this.ticketHolder).subscribe(returnedTicket => {
        this.ticket = returnedTicket;
        this.utils.translateService.get(['SuccessFullMsg', 'TicketCreatedMsg'], {'id': this.ticket.id}).subscribe(value => {
          this.utils.messageService.success(value.SuccessFullMsg, value.TicketCreatedMsg);
        });
        // this.ticketForm.controls.TicketID.setValue(returnedTicket.id);
        this.ticket = returnedTicket;
        this.lockAfterSave = true;
      },
      error => {
        // can't create Ticket
        console.error('Creation Failed !' + error.error.msg);
        this.utils.translateService.get(['TicketCreationFailedMsg', 'FailureMsg'], {
            'error': JSON.stringify(error)
          }
        ).subscribe(value => {
          this.utils.messageService.error(value.FailureMsg, value.TicketCreationFailedMsg);
        });
        //// this.messageService.add({severity: 'error', summary: 'Failed', detail: error.error.msg});
        // this.display = true;

      });


  }

  onUploadFiles(event) {

    event.files.forEach(file => {
      this.uploadedFiles.push(file);
      console.log(JSON.stringify(this.uploadedFiles));
    });
    this.utils.messageService.success('', 'FileUploaded');

  }

  customUploader(events, uploadElement) {
    console.log(this.attachments.length + events.files.length);
    if (this.attachments.length > this.maxUploadFiles || (this.attachments.length + events.files.length) > this.maxUploadFiles) {
      events.files = null;
      uploadElement.clear();
    } else {
      this.fileUploadService.uploadFiles(events.files).subscribe(value => {
        events.files.forEach(file => {
          this.uploadedFiles.push(file);
          console.log(JSON.stringify(this.uploadedFiles));
        });
        this.attachments.push(value);
        events.files = [];
        this.utils.messageService.success('', this.utils.translateService.instant('FileUploaded'));
        uploadElement.clear();
      }, error1 => {
        this.utils.messageService.error('', this.utils.translateService.instant('FileUploadFailed'));
      });
    }
  }


}
