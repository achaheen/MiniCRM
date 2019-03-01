import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message} from 'primeng/api';
import {ResponseCode} from '../../shared/model/response-code';
import {UtilsService} from '../../shared/services/utils.service';
import {ResponseError} from '../../shared/model/response-error';

@Injectable({
  providedIn: 'root'
})
export class GlobalMessageService {
  // messageSubject: Subject<Object> = new Subject<Object>();
  private messageSubject = new Subject<Message>();

  constructor() {
  }

  success(header, details) {
    console.log('success message ' + details);
    this.messageSubject.next({closable: true, severity: 'success', summary: header, detail: details});
  }

  info(header, details) {
    this.messageSubject.next({closable: true, severity: 'info', summary: header, detail: details});

  }

  warn(header, details) {
    this.messageSubject.next({closable: true, severity: 'warn', summary: header, detail: details});
  }

  error(header, details) {
    this.messageSubject.next({closable: true, severity: 'error', summary: header, detail: details});
  }

  printError(error) {
    if (error !== null) {
      try {
        if (error.error !== undefined && error.error.status !== undefined) {
          const errorMessage: ResponseError = error.error as ResponseError;
          this.error('Critical Error', JSON.stringify(errorMessage));
        } else if (error.msg !== undefined) {
          const resCode: ResponseCode = error as ResponseCode;
          this.error(resCode.code, resCode.msg);
        } else {
          this.error('Error', JSON.stringify(error));
        }
      } catch (e) {
        this.error('Error', JSON.stringify(error));
      }
    }
  }

  printLocalizedMessage(header, value, utils: UtilsService, messageType?, params?) {
    utils.translateService.get([header, value], params).subscribe(v => {

      const headerMessage = v[header];
      const details = v[value];
      if (messageType === undefined || messageType === null || messageType === '' || messageType === 'success') {
        this.success(headerMessage, details);
      } else if (messageType === 'error') {
        this.error(headerMessage, details);
      } else if (messageType === 'warn') {
        this.warn(headerMessage, details);
      } else if (messageType === 'info') {
        this.info(headerMessage, details);
      }
    });
  }

  getMessage(): Observable<Message> {
    return this.messageSubject.asObservable();
  }

}
