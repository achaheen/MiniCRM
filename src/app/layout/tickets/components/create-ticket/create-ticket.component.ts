import { Component, OnInit } from '@angular/core';
import {TicketsService} from '../../../../shared/services/tickets.service';
import {Ticket} from '../../../../shared/model/ticket';
import {UtilsService} from "../../../../shared/services/utils.service";
import {MessageService} from "primeng/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MainCategory} from "../../../../shared/model/mainCategory";
import {Subcategory} from "../../../../shared/model/subcategory";
import {Topic} from "../../../../shared/model/topic";
import {MainCategoryService} from "../../../../shared/services/main-category.service";
import {SubCategoryService} from "../../../../shared/services/sub-category.service";
import {TopicService} from "../../../../shared/services/topic.service";
import {Type} from "../../../../shared/model/type";
import {Priority} from "../../../../shared/model/priority";
import {CustomerAccounts} from "../../../../shared/model/customerAccounts";

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
  providers: [MessageService]
})
export class CreateTicketComponent implements OnInit {

  ticket: Ticket = {};
  blocked:boolean = true;
  ticketForm : FormGroup;
  mainCategoriesList: MainCategory[];
  subCategoriesList: Subcategory[];
  topicsList: Topic[];
  ticketTypeList: Type[];
  // channelList: Channel[];
  priorityList: Priority[];

  selectedMainCategory: MainCategory;
  selectedSubCategory: Subcategory;
  selectedTopic: Topic;

  constructor(private utils:UtilsService,
              private ticketHttp: TicketsService,
              private messageService:MessageService,
              private mainCategoryService: MainCategoryService,
              private subCategoryService: SubCategoryService,
              private topicService:TopicService,
              private fb: FormBuilder) { }

  ngOnInit() {
      this.initTicketForm();
      this.initValueLists();
  }

  initValueLists(){
    this.listAllMainCategories();
  }

  initTicketForm(){
    this.ticketForm = this.fb.group({
      'TicketID': new FormControl('',  Validators.required ),
      'MainCategory': new FormControl('', Validators.required),
      'SubCategory': new FormControl(''),
      'Topic': new FormControl('', Validators.required),
      'Subject': new FormControl('', Validators.required),
      'TicketType': new FormControl(''),
      'Channel': new FormControl('', Validators.required),
      'Priority': new FormControl(''),
      'Details': new FormControl('', Validators.compose([Validators.required,Validators.email] )),
      'CustomerBasic': new FormControl('', Validators.required),
      'CustomerNameEn': new FormControl(''),
      'CustomerNameAr': new FormControl(''),
      'CustomerMobile': new FormControl('', Validators.required),
      'CustomerSegment': new FormControl('', Validators.required),
      'CustomerBranch': new FormControl('', Validators.required),
      'CustomerEmail': new FormControl('', Validators.required)
    });

  }


  updateTopicList(){
    if(this.selectedSubCategory != null && this.selectedSubCategory.id != null){
      this.topicService.active(this.selectedSubCategory.id).subscribe(
        result => {
          const mainCat: Topic = {};
          mainCat.englishLabel = 'Select Topic';
          mainCat.id = null;
          this.topicsList = result;
          this.topicsList.unshift(mainCat);
        }
      );
    } else {
      this.topicsList = [];
    }
  }

  updateSubCategory() {
    if (this.selectedMainCategory != null && this.selectedMainCategory.id != null) {
      this.subCategoryService.active(this.selectedMainCategory.id).subscribe(
        result => {
          this.subCategoriesList = result;
          const mainCat: Subcategory = {};
          mainCat.englishLabel = 'Select Sub Category';
          mainCat.id = null;
          this.subCategoriesList.unshift(mainCat);
        }
      );
    } else {
      this.topicsList = [];
      this.subCategoriesList = [];
    }
  }

  listAllMainCategories() {
    this.mainCategoryService.all().subscribe(
      result => {
        const mainCat: MainCategory = {};
        mainCat.englishLabel = 'Select Main Category';
        mainCat.id = null;
        this.mainCategoriesList = result;
        this.mainCategoriesList.unshift(mainCat);
      }
    );
  }

  bindFormToTicket(){

      this.ticket.id = this.ticketForm.value.TicketID;
      this.ticket.topic = this.selectedTopic;
      this.ticket.subject = this.ticketForm.value.Subject;
      this.ticket.ticketType = this.ticketForm.value.TicketType;
      this.ticket.sourceChannel = this.ticketForm.value.Channel;
      this.ticket.priority = this.ticketForm.value.Priority;
      this.ticket.details = this.ticketForm.value.Details;


      let customerAccount: CustomerAccounts;
      customerAccount.customerCIF = this.ticketForm.value.CustomerBasic;
      customerAccount.customerNameEn = this.ticketForm.value.CustomerNameEn;
      customerAccount.customerNameAR = this.ticketForm.value.CustomerNameAr;
      customerAccount.branchName = this.ticketForm.value.CustomerBranch;
      customerAccount.mobile= this.ticketForm.value.CustomerMobile;
      customerAccount.email= this.ticketForm.value.CustomerEmail;
      customerAccount.segment= this.ticketForm.value.CustomerSegment;

      this.ticket.customerAccount = customerAccount;



  }

  SaveTicket() {
    console.log("Start Save Ticket");
    var self = this;
    this.bindFormToTicket();


    console.log("End Save Ticket");

  }

}
