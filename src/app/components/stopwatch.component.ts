import { Component } from '@angular/core';

import { Observable, Subscription, timer, of, delay, tap } from 'rxjs';

@Component({
  selector: 'stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss'],
})
export class StopwatchComponent {
  started: boolean = false;
  clickCount: number = 0;
  // interval: string | number | NodeJS.Timeout | undefined; // it`s variable for no rxjs approach
  timer: Observable<number> = timer(1000, 1000);
  subscription?: Subscription;
  time = new Date(0);

  // bellow with rxjs & Observable

  onStartHandler() {
    this.started = !this.started;
    if (this.started) {
      this.subscription = this.timer.subscribe(() => {
        this.time.setSeconds(this.time.getSeconds() + 1);
      });
    } else {
      this.subscription?.unsubscribe();
      this.time.setSeconds(0);
      this.time.setMinutes(0);
    }
  }

  onWaitHandler() {
    this.clickCount++;
    of(true)
      .pipe(
        delay(500),
        tap(() => {
          if (this.clickCount === 1) {
            alert('please make double click button for pause timer');
          } else if (this.clickCount === 2 && this.time.getSeconds() >= 1) {
            this.subscription?.unsubscribe();
            this.started = !this.started;
          }
          this.clickCount = 0;
        })
      )
      .subscribe();
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
  //         : (this.time.setSeconds(0),
  //           this.time.setMinutes(0),
  //           clearInterval(this.interval),
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
  //       }
  //       this.clickCount = 0;
  //     }, 500);
  //   }

  onResetHandler() {
    this.time.setSeconds(0);
    this.time.setMinutes(0);
  }
}
