import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedCustomerInfoService {
  private subject = new BehaviorSubject('Init');
  currentSubject = this.subject.asObservable();

  setValue(value) {
    this.subject.next(value);
  }

  clear() {
    this.subject.next(null);
  }
}
