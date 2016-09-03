import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from '../env/env';
import {UserData} from '../user-data/user-data';
/*
   Generated class for the Outlet provider.

   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
   for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Outlet {
    data: any;
    host: any;
    todayOutletData: any;
    outletsByUser: any;
    local: any;
    user: any;

    constructor(private http: Http, private env: Env, private userData: UserData) {
        this.data = null;
        this.host = env.getHost();
    }

    findOne(id){
        return new Promise(resolve => {
            this.http.get(this.host + '/outlets/' + id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        })
    }

    todayOutletsByOutlet(params){
        return new Promise(resolve => {
            this.userData.getUser().then(user => {
                this.user = user;
                this.http.get(this.host + '/todayOutlets/users/' + this.user.id + '/outlets/' + params.outletId + '/orderDate/' + params.orderDate)
                    .map(res => res.json())
                    .subscribe(data => {
                        resolve(data);
                    })
            });
        })
    }

    getOutletsByUser(){
        return new Promise(resolve => {
            this.userData.getUser().then(user => {
                this.user = user;
                this.http.get(this.host + '/user-outlets-users/' + this.user.id)
                    .map(res => res.json())
                    .subscribe(data => {
                        this.outletsByUser = data;
                        console.log('outlets by user', data);
                        resolve(data);
                    });
            });
        });
    }

    todayOutlets(){
        return new Promise(resolve => {
            this.userData.getUser().then(user => {
                this.user = user;
                this.http.get(this.host + '/todayOutlets/users/' + this.user.id)
                    .map(res => res.json())
                    .subscribe(data => {
                        this.todayOutletData = data;
                        console.log('today outlet', data);
                        resolve(data);
                    });
            });
        });
    }

    getTodayOutlets(){
        return this.todayOutletData;
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
            this.http.get(this.host + '/outlets')
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
    }
}

