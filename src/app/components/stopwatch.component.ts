import { Component } from '@angular/core';

import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent {
  title: string = 'Stopwatch';
  started: boolean = false;
  startBtn: string = 'Start';
  clickCount: number = 0;
  interval: string | number | NodeJS.Timeout | undefined;
  timer: Observable<number> = timer(1000, 1000);
  subscription: Subscription | undefined;
  time = new Date(0);

  // bellow with rxjs & Observable

  onStartHandler() {
    this.started = !this.started;
    if (this.started) {
      this.subscription = this.timer.subscribe(() => {
        this.time.setSeconds(this.time.getSeconds() + 1);
      });
      this.startBtn = 'Stop';
    } else {
      this.subscription?.unsubscribe();
      this.time.setSeconds(0);
      this.time.setMinutes(0);
      this.startBtn = 'Start';
    }
  }

  onWaitHandler() {
    this.clickCount++;
    setTimeout(() => {
      if (this.clickCount === 1) {
        alert('please make double click button for pause timer');
      } else if (this.clickCount === 2 && this.time.getSeconds() >= 1) {
        this.subscription?.unsubscribe();
        this.started = !this.started;
        this.startBtn = 'Start';
      }
      this.clickCount = 0;
    }, 500);
  }

  // bellow without rxjs & Observable but works to

  //   onStartHandler() {
  //     this.started = !this.started;
  //     {
  //       this.started
  //         ? (clearInterval(this.interval),
  //           (this.interval = setInterval(() => {
  //             this.time.setSeconds(this.time.getSeconds() + 1);
  //           }, 1000)),
  //           (this.startBtn = 'Stop'))
  //         : (this.time.setSeconds(0),
  //           this.time.setMinutes(0),
  //           clearInterval(this.interval),
  //           (this.startBtn = 'Start'));
  //     }
  //   }

  //   onWaitHandler() {
  //     this.clickCount++;
  //     setTimeout(() => {
  //       if (this.clickCount === 1) {
  //         alert('please make double click button for pause timer');
  //       } else if (this.clickCount === 2) {
  //         clearInterval(this.interval);
  //         this.started = !this.started;
  //         this.startBtn = 'Start';
  //       }
  //       this.clickCount = 0;
  //     }, 500);
  //   }

  onResetHandler() {
    this.time.setSeconds(0);
    this.time.setMinutes(0);
  }
}
