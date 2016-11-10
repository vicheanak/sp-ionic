import { Injectable } from '@angular/core';
import { LocalStorage, Storage } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Env} from '../env/env';

/*
   Generated class for the UserData provider.

   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
   for more info on providers and Angular 2 DI.
 */
@Injectable()
export class UserData {
    data: any;
    _favorites = [];
    HAS_LOGGED_IN = 'hasLoggedIn';
    storage = new Storage(LocalStorage);
    host: String;



    constructor(private http: Http, private env: Env) {
        this.data = null;
        this.host = this.env.getHost();
    }

    hasFavorite(sessionName) {
        return (this._favorites.indexOf(sessionName) > -1);
    }

    addFavorite(sessionName) {
        this._favorites.push(sessionName);
    }

    removeFavorite(sessionName) {
        let index = this._favorites.indexOf(sessionName);
        if (index > -1) {
            this._favorites.splice(index, 1);
        }
    }

    signup(username) {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.setUser(username);
    }

    logout() {
        return new Promise(resolve => {
            console.log('logout');
            this.storage.remove(this.HAS_LOGGED_IN);
            this.storage.remove('unibook-mobile-sp-userdata').then( data => {
                resolve(data);
            });
        });
    }

    setUser(user) {
        this.storage.set('unibook-mobile-sp-userdata', JSON.stringify(user));
    }

    getUser() {
        return new Promise(resolve => {
            this.storage.get('unibook-mobile-sp-userdata').then((value) => {
                resolve(JSON.parse(value));
            });
        })
    }

    // return a promise
    hasLoggedIn() {
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            return value;
        });
    }

    product(){
        return new Promise(resolve => {
            var obj = {'name': 'from mobile'};
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(obj);
            this.http.post(this.host + '/api/products', body, options)
                .subscribe(data => {
                    resolve(data.json());
                }, error => {
                    console.log("Oooops!");
                });

        })
    }

    login(credentials) {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            let body = JSON.stringify(credentials);
            this.http.post(this.host + '/mobile-authenticate', body, options)
                .subscribe(data => {
                    resolve(data.json());
                }, error => {
                    console.log("Oooops!");
                });

        })

    }
}

