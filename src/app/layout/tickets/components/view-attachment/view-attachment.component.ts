import {Component, Input, OnInit} from '@angular/core';
import {Attachment} from '../../../../shared/model/attachment';
import {TicketsService} from '../../../../shared/services/tickets.service';
import *  as FileSaver from 'file-saver';
@Component({
  selector: 'app-view-attachment',
  templateUrl: './view-attachment.component.html',
  styleUrls: ['./view-attachment.component.scss']
})
export class ViewAttachmentComponent implements OnInit {
  @Input() attachmentID: number[];
  attachmentList: Attachment[];

  constructor(protected ticketsService: TicketsService) {
  }

  ngOnInit() {
    if (this.attachmentID != null && this.attachmentID.length > 0) {

      this.ticketsService.getAttachmentsInfo(this.attachmentID).subscribe(value => {
        this.attachmentList = value;
      });
    }
  }

  downloadFile(attch: Attachment) {
    this.ticketsService.downloadAttachment([attch.id]).subscribe(value => {
      // @ts-ignore
      const blob = new Blob([value], {type: attch.fileType}); // pass a useful mime type here
      FileSaver.saveAs(blob, attch.fileName);
    });
  }
}
