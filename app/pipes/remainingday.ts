import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the RemainingDay pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'remainingday'
})
@Injectable()
export class RemainingDayPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: number, args: any[]) {

    value = this.round(value/26, 2);

    return value;
  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}
