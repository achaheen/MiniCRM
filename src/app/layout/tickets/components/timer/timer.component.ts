import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {interval} from 'rxjs';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  interval: any;

  @Input() inputTime: number;
  timeSeconds: number;
  @Output() emitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  timerObject: TimeObject;

  getTimeObject(t: number): TimeObject {
    const timeObject: TimeObject = {};
    timeObject.hours = Math.floor(t / 3600) % 24;
    t -= timeObject.hours * 3600;
    timeObject.minutes = Math.floor(t / 60) % 60;
    t -= timeObject.minutes * 60;
    timeObject.seconds = t % 60;
    timeObject.seconds = timeObject.seconds.toFixed(0);
    return timeObject;
  }

  ngOnInit() {
    console.log('ng init with time value ' + this.inputTime);

    this.timeSeconds = this.inputTime;
    const int = interval(1000);
    this.interval = int.pipe(takeWhile(() => this.timeSeconds > 0));
    this.interval.subscribe((val) => {
      --this.timeSeconds;
      this.timerObject = this.getTimeObject(this.timeSeconds);
    }, error1 => {
      console.log('Error in timer service: ' + error1);
    }, () => {
      console.log(`Timer Completed successfully, current time in seconds ${this.timeSeconds}`);
      this.emitter.emit(true);
    });

  }
  ngOnDestroy() {
    console.log('Ng Destroy');
    this.timeSeconds = 0;
    this.timerObject = null;
    this.interval = null;
  }

}

export interface TimeObject {
  hours?: number;
  minutes?: number;
  seconds?: any;
}
