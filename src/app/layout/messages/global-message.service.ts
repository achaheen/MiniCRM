import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Message} from 'primeng/api';
import {ResponseCode} from '../../shared/model/response-code';

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
    console.log(header + ' ' + details);
    this.messageSubject.next({closable: true, severity: 'error', summary: header, detail: details});
  }

  printError(error) {
    if (error !== null) {
      try {
        const resCode: ResponseCode = error.error as ResponseCode;
        console.log(JSON.stringify(resCode));
        this.error(resCode['code'], resCode['msg']);
      } catch (e) {
        this.error('Error', JSON.stringify(error));
      }
    }
  }
  getMessage(): Observable<Message> {
    return this.messageSubject.asObservable();
  }
}
