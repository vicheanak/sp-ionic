import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from '../env/env';
import {Observable} from 'rxjs/Rx';
import {UserData} from '../user-data/user-data';

/*
  Generated class for the Order provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Order {
  data: any;
  host: any;
  user: any;

  constructor(private http: Http, private env: Env, private userData: UserData) {
    this.data = null;
    this.host = env.getHost();
  }

  insert(orders){
      return new Promise(resolve => {
          this.userData.getUser().then(user => {
              this.user = user;
              let headers = new Headers({ 
              'Content-Type': 'application/json',
              'token': this.user.token,
              'username': this.user.username
              });
              let options = new RequestOptions({ headers: headers });
              var data = [];
              if (orders.length){
                  for(var i = 0; i < orders.length; i++) {
                      var amount = orders[i].amount;
                      var orderDate = orders[i].orderDate;
                      var OutletId = orders[i].OutletId;
                      var ProductId = orders[i].ProductId;
                      var UserId = this.user.id;
                      var body = {
                          amount: amount,
                          orderDate: orderDate,
                          OutletId: OutletId,
                          ProductId: ProductId,
                          UserId: UserId
                      };
                      data.push(this.http.post(this.host + '/orders', body, options).map(res => res.json()));
                  }
                  Observable.forkJoin(data).subscribe(data => {
                      resolve('success');
                  });
              }
              else{
                  resolve('nothing data');
              }
          });
      });
  }

  update(orders){
    return new Promise(resolve => {
        this.userData.getUser().then(user => {
            this.user = user;
            let headers = new Headers({
            'Content-Type': 'application/json',
            'token': this.user.token,
            'username': this.user.username
            });
            let options = new RequestOptions({ headers: headers });
            var data = [];
            if (orders.length){
                for(var i = 0; i < orders.length; i++) {
                    var id = orders[i].id;
                    var amount = orders[i].amount;
                    var body = {amount: amount};
                    data.push(this.http.put(this.host + '/orders/' + id, body, options).map(res => res.json()));
                }
                Observable.forkJoin(data).subscribe(data => {
                    resolve('success');
                });
            }
            else{
                resolve('nothing data');
            }
        });
    });
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

