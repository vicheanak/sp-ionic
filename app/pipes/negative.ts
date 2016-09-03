import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Negative pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'negative'
})
@Injectable()
export class NegativePipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: number, args: any[]) {
    if (value < 0){
        value = 0;
    }
    return value;

  }
}
