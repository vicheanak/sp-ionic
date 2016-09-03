import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from '../env/env';
import {UserData} from '../user-data/user-data';

/*
   Generated class for the Product provider.

   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
   for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Product {
    data: any;
    host: any;
    user: any;

    constructor(private http: Http, private env: Env, private userData: UserData) {
        this.data = null;
        this.host = env.getHost();
    }

    thisMonthOrders(){
        return new Promise(resolve => {
            this.userData.getUser().then(user => {
                this.user = user;
                let headers = new Headers({
                'Content-Type': 'application/json',
                'token': this.user.token,
                'username': this.user.username
                });
                let options = new RequestOptions({ headers: headers });
                let userId = this.user.id;
                this.http.get(this.host + '/thisMonthOrders/' + userId, options)
                    .map(res => res.json())
                    .subscribe(data => {
                        this.data = data;
                        resolve(this.data);
                    });
            });
        })
    }

    todayOrders(){
        return new Promise(resolve => {
            this.userData.getUser().then(user => {
                this.user = user;
                let headers = new Headers({
                'Content-Type': 'application/json',
                'token': this.user.token,
                'username': this.user.username
                });
                let options = new RequestOptions({ headers: headers });
                this.http.get(this.host + '/todayOrders/' + this.user.id, options)
                    .map(res => res.json())
                    .subscribe(data => {
                        this.data = data;
                        resolve(this.data);
                    });
            });
        })
    }

    load() {
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            this.http.get(this.host + '/activeProducts')
                .map(res => res.json())
                .subscribe(data => {
                    console.log('active products', data);
                    this.data = data;
                    resolve(this.data);
                });
        });
    }
}

