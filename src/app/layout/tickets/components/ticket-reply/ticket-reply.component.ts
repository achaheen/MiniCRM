import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TicketActions} from '../../../../shared/model/ticketActions';
import {BasicTopicSelection} from '../../../general/basic-topic-selection';
import {UtilsService} from '../../../../shared/services/utils.service';
import {MessageService} from 'primeng/api';
import {MainCategoryService} from '../../../../shared/services/main-category.service';
import {SubCategoryService} from '../../../../shared/services/sub-category.service';
import {TopicService} from '../../../../shared/services/topic.service';
import {FileUploadService} from '../../../../shared/services/file-upload.service';
import {Ticketdata} from '../../../../shared/model/Ticketdata';
import {TicketHolder} from '../../../../shared/model/ticketHolder';
import {Ticket} from '../../../../shared/model/ticket';
import {TicketLock} from '../../../../shared/model/ticket-lock';
import {TicketsService} from '../../../../shared/services/tickets.service';
import {ViewTicketComponent} from '../view-ticket/view-ticket.component';

@Component({
  selector: 'app-ticket-reply',
  templateUrl: './ticket-reply.component.html',
  styleUrls: ['./ticket-reply.component.scss'],
  providers: [MessageService]
})
export class TicketReplyComponent extends BasicTopicSelection implements OnInit {


  @Input() parent: ViewTicketComponent;
  ticketData: Ticketdata = {};

  uploadedFiles: any[] = [];
  attachments: any[] = [];

  constructor(public utils: UtilsService,
              public messageService: MessageService,
              public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService,
              public topicService: TopicService,
              public fileUploadService: FileUploadService, public ticketHttp: TicketsService) {
    super(topicService, subCategoryService, mainCategoryService, utils);
    this.enableAdminSelection = false;
    this.authroizedTopicsRequest = {permissions: ['chgDpt']};
  }

  ngOnInit() {

  }

  onChangeAction() {

  }

  addReply() {

    const ticketHolder: TicketHolder = {
      actionID: this.parent.selectedTicketAction.actionID,
      attachments: this.attachments[0],
      ticket: {id: this.parent.ticket.id}, lockID: this.parent.ticketLock.lockID,
      ticketdata: this.ticketData
    };
    this.ticketHttp.action(ticketHolder).subscribe(value => {
      this.parent.ticket = value;
      this.parent.ticketLock = null;

      this.parent.ticketListParent.items.splice(this.parent.ticketListParent.items.indexOf({header: this.parent.ticket.id}), 1);
      this.parent.ticketListParent.selectedTab = this.parent.ticketListParent.previousTab;
    }, error1 => {

    });

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
