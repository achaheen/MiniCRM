import { Component, OnInit } from '@angular/core';
import {SearchTicketsContainer} from "../../shared/model/searchTicketsContainer";
import {TicketsService} from "../../shared/services/tickets.service";
import {Ticket} from "../../shared/model/ticket";
import {SearchTicketsResult} from "../../shared/model/searchTicketsResult";
import {MainCategory} from "../../shared/model/mainCategory";
import {Subcategory} from "../../shared/model/subcategory";
import {Topic} from "../../shared/model/topic";
import {MainCategoryService} from "../../shared/services/main-category.service";
import {SubCategoryService} from "../../shared/services/sub-category.service";
import {TopicService} from "../../shared/services/topic.service";
import {LazyLoadEvent} from "primeng/api";
import {TabView} from "primeng/primeng";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  openTicketFilter:SearchTicketsContainer = {"status":[1], "createdBy":["admin"], "size":10,page:0};
  closedTicketFilter:SearchTicketsContainer = {"status":[3], "createdBy":["admin"] , "size":10,page:0};
  wordOnProgressTicketFilter:SearchTicketsContainer = {"status":[2], "createdBy":["admin"] , "size":10,page:0};
  assignedTicketFilter:SearchTicketsContainer = {"status":[7], "createdBy":["admin"] , "size":10,page:0};

  ticketList:Ticket[];
  totalRecords:number = 0 ;
  ticketsResult
    :SearchTicketsResult;


  mainCategories:MainCategory[];
  selectedMainCategory:MainCategory;
  subCategories:Subcategory[];
  selectedSubCategory:Subcategory;
  topics:Topic[];
  selectedTopic:Topic;
  selectedFilter:SearchTicketsContainer = this.openTicketFilter;

  constructor(private ticketService:TicketsService,private mainCategoryService:MainCategoryService,private subCategoryService:SubCategoryService,private topicService : TopicService) {}

  ngOnInit() {
    this.getTicketList(this.openTicketFilter);

    this.listAllMainCategories();
  }


  updateTopicList(){
    if(this.selectedSubCategory != null && this.selectedSubCategory.id != null){

      this.topicService.all().subscribe(
        result =>{
          let mainCat:Topic = {};
          mainCat.englishLabel = "Select Topic";
          mainCat.id = null;
          this.topics = result;
          this.topics.unshift(mainCat);
        }
      )

    }else{
      this.topics = [];
    }
  }

  updateSubCategory(){
    if(this.selectedMainCategory != null && this.selectedMainCategory.id != null){
      this.subCategoryService.all().subscribe(
        result =>{
        this.subCategories = result;
          let mainCat:Subcategory = {};
          mainCat.englishLabel = "Select Sub Category";
          mainCat.id = null;
          this.subCategories.unshift(mainCat); }
      )
    }else{
      this.topics = [];
      this.subCategories = [];
    }
  }

  listAllMainCategories(){

    this.mainCategoryService.all().subscribe(
      result =>
      {
        let mainCat:MainCategory = {};
        mainCat.englishLabel = "Select Main Category";
        mainCat.id = null;
        this.mainCategories = result ;
        this.mainCategories.unshift(mainCat);
      }
    )
  };

  handleChange(e) {
    let index = e.index;

    switch (index) {
      case 0:
        this.selectedFilter = this.openTicketFilter;
        break;
      case 1:
        this.selectedFilter = this.assignedTicketFilter;
        break;
      case 2:
        this.selectedFilter = this.openTicketFilter;
        break;
      case 3:
        this.selectedFilter = this.wordOnProgressTicketFilter;
        break;
      case 4:
        this.selectedFilter = this.closedTicketFilter;
        break;
    }
    this.getTicketList(this.selectedFilter);
  }


  getTicketList(ticketFilters:SearchTicketsContainer){
    this.ticketService.getTicketsByFilter(ticketFilters).subscribe(
      result => {
        this.ticketsResult =  result;
        this.ticketList = result.content;
        this.totalRecords = result.totalElements;
      }
    );
  }


catchEvent(filter:SearchTicketsContainer){
  this.getTicketList(filter);
}


applyGlobalFilter(){


    if(this.selectedMainCategory != null && this.selectedMainCategory.id != null){
      let mainCategory = this.selectedMainCategory.id;
      this.selectedFilter.mainCats = [mainCategory];
    }else{
      this.selectedFilter.mainCats = [];
    }

  if(this.selectedSubCategory != null && this.selectedSubCategory.id != null ){
    let subCategory = this.selectedSubCategory.id ;
    this.selectedFilter.subCats = [subCategory];
  }else{
    this.selectedFilter.subCats = [];
  }

  if(this.selectedTopic != null && this.selectedTopic.id != null ){
    let topic = this.selectedTopic.id ;
    this.selectedFilter.topics = [topic];
  }else{
    this.selectedFilter.topics = [];
  }
    this.getTicketList(this.selectedFilter);
  }



  openTicketForView(){

  }
}


