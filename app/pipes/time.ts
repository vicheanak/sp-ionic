import { Injectable, Pipe } from '@angular/core';
import * as moment from 'moment';

/*
   Generated class for the Time pipe.

   See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
   Angular 2 Pipes.
 */
@Pipe({
name: 'time'
})
@Injectable()
export class Time {
    /*
       Takes a value and makes it lowercase.
     */
    transform(value: string, args: any[]) {
        value = moment.utc(value).format('hh:mm a');
        return value;
    }
}
