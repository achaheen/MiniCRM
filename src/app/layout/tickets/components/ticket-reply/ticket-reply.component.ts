import {Component, Input, OnInit} from '@angular/core';
import {TicketActions} from "../../../../shared/model/ticketActions";
import {BasicTopicSelection} from "../../../general/basic-topic-selection";
import {UtilsService} from "../../../../shared/services/utils.service";
import {MessageService} from "primeng/api";
import {MainCategoryService} from "../../../../shared/services/main-category.service";
import {SubCategoryService} from "../../../../shared/services/sub-category.service";
import {TopicService} from "../../../../shared/services/topic.service";
import {FileUploadService} from "../../../../shared/services/file-upload.service";
import {Ticketdata} from "../../../../shared/model/Ticketdata";

@Component({
  selector: 'app-ticket-reply',
  templateUrl: './ticket-reply.component.html',
  styleUrls: ['./ticket-reply.component.scss']
})
export class TicketReplyComponent extends BasicTopicSelection implements OnInit {

  @Input() actionList: TicketActions[];
  selectedAction:TicketActions={};
  ticketData:Ticketdata = {};

  uploadedFiles: any[] = [];
  attachments: any[] = [];
  constructor(public utils: UtilsService,
              public messageService: MessageService,
              public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService,
              public topicService: TopicService,
              public fileUploadService: FileUploadService) {
    super(topicService, subCategoryService, mainCategoryService, utils);
    this.enableAdminSelection = false;
    this.authroizedTopicsRequest = {permissions: ['reply']};
  }

  ngOnInit() {
  }

  onChangeAction(){

  }

  addReply(){
    this.ticketData.attachmentsList = this.attachments[0];

  }

  onUploadFiles(event) {
    event.files.forEach(file => {
      this.uploadedFiles.push(file);
      console.log(JSON.stringify(this.uploadedFiles));
    });
    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});

  }
  customUploader(events, uploadElement) {
    this.fileUploadService.uploadFiles(events.files).subscribe(value => {
      events.files.forEach(file => {
        this.uploadedFiles.push(file);
        console.log(JSON.stringify(this.uploadedFiles));
      });
      this.attachments.push(value);
      events.files = [];
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
      console.log('attachments ' + this.attachments);
      uploadElement.clear();
    }, error1 => {
      this.messageService.add({severity: 'error', summary: 'File Upload Failed', detail: ''});
    });
  }
}
