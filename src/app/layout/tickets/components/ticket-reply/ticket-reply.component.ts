import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BasicTopicSelection} from '../../../general/basic-topic-selection';
import {UtilsService} from '../../../../shared/services/utils.service';
import {MessageService, SelectItem} from 'primeng/api';
import {MainCategoryService} from '../../../../shared/services/main-category.service';
import {SubCategoryService} from '../../../../shared/services/sub-category.service';
import {TopicService} from '../../../../shared/services/topic.service';
import {FileUploadService} from '../../../../shared/services/file-upload.service';
import {Ticketdata} from '../../../../shared/model/Ticketdata';
import {TicketHolder} from '../../../../shared/model/ticketHolder';
import {TicketsService} from '../../../../shared/services/tickets.service';
import {ViewTicketComponent} from '../view-ticket/view-ticket.component';
import {TicketLock} from '../../../../shared/model/ticket-lock';

@Component({
  selector: 'app-ticket-reply',
  templateUrl: './ticket-reply.component.html',
  styleUrls: ['./ticket-reply.component.scss'],
  providers: [MessageService]
})
export class TicketReplyComponent extends BasicTopicSelection implements OnInit {

  @ViewChild('timer') timer: any;

  @Input() parent: ViewTicketComponent;
  ticketData: Ticketdata = {};
  maxFileSize = 15000000;
  maxUploadFiles = 10;
  uploadedFiles: any[] = [];
  attachments: any[] = [];
  lockTimeValue: number = 0;
  disableReplyBTN: boolean;
  actionsList: SelectItem[];

  constructor(public utils: UtilsService,
              public mainCategoryService: MainCategoryService,
              public subCategoryService: SubCategoryService,
              public topicService: TopicService,
              public fileUploadService: FileUploadService, public ticketHttp: TicketsService) {
    super(topicService, subCategoryService, mainCategoryService, utils);
    this.enableAdminSelection = false;
    this.authorizedTopicsRequest = {permissions: ['chgDpt']};
  }

  ngOnInit() {
    this.initData();
  }

  initData() {
    this.lockTimeValue = 0;
    if (this.parent != null) {
      const lock: TicketLock = this.parent.ticketLock;
      if (lock != null && lock.expiresOn != null && lock.expiresOn > 0) {
        this.lockTimeValue = lock.expiresOn - Date.now();
        this.lockTimeValue = this.lockTimeValue / 1000;
      }
      if (this.parent.ticketActionList != null) {
        this.actionsList = [];
        this.parent.ticketActionList.forEach(action => {
          this.actionsList.push({value: action, label: this.utils.printLocLabel(action)});
        });
      }
    }
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
      this.parent.getAuthorizedActions();
      this.utils.translateService.get(['SuccessFullMsg', 'ActionSavedSuccess']).subscribe(value1 => {
        this.utils.messageService.success(value1['SuccessFullMsg'], value1['ActionSavedSuccess']);
      });
    }, error1 => {
      this.utils.messageService.printError(error1);
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
      this.utils.translateService.get(['FileUploadFailed', 'MaximumFileReached']).subscribe(value => {
        this.utils.messageService.error(value.FileUploadFailed, value.MaximumFileReached);
      });
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
        this.utils.messageService.success('', 'FileUploaded');
        console.log('attachments ' + this.attachments);
        uploadElement.clear();
      }, error1 => {
        this.utils.messageService.error('', this.utils.translateService.instant('FileUploadFailed'));
      });
    }
  }

  onTimerExpires(event) {
    if (event) {
      this.disableReplyBTN = true;
      this.lockTimeValue = 0;
      this.utils.messageService.error('', this.utils.translateService.instant('LockExpired'));
    }
  }
}
