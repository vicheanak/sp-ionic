import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the Round pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'round'
})
@Injectable()
export class RoundPipe {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value: number, isDecimal: boolean) {
      if (isDecimal == true){
          value = Math.round(value * 10) / 10;
      }
      else{
          value = Math.ceil(value);
      }
      return value;
  }
}
