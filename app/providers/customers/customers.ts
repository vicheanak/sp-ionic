import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as _ from 'underscore';

/*
  Generated class for the Customers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Customers {
  data: any;
  customer: any;

  constructor(private http: Http) {
    this.data = null;
  }

  get(name){
      return new Promise(resolve => {
          this.customer = {_id: 1, name: 'chenda', products: [
              {_id: 1, name: 'sunsilk', amount: 2}
          ]}
          resolve(this.customer);
      });
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
        resolve(this.data);
        // this.http.get('path/to/data.json')
        //     .map(res => res.json())
        //     .subscribe(data => {
        //         this.data = data;
        //         resolve(this.data);
        //     });
    });
  }
}

