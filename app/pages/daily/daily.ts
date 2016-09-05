import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InsertPage} from '../insert/insert';
import {Outlet} from '../../providers/outlet/outlet';
import {EditPage} from '../edit/edit';
import {Time} from '../../pipes/time';
import {LoginPage} from '../../pages/login/login';

/*
   Generated class for the DailyPage page.

   See http://ionicframework.com/docs/v2/components/#navigation for more info on
   Ionic pages and navigation.
 */
@Component({
templateUrl: 'build/pages/daily/daily.html',
providers: [Outlet],
pipes: [Time]
})
export class DailyPage {
    outlets: any;
    isExist: boolean;

    constructor(private nav: NavController, private outletService: Outlet) {
    }
    ngAfterViewInit(){
    }

    ionViewWillEnter(){
        this.outletService.todayOutlets().then(outlets => {
            if (outlets['success'] == false){
                 this.nav.rootNav.push(LoginPage);
            }
            else{
                this.outlets = outlets;
                this.isExist = true;
                if (!this.outlets.length){
                    this.isExist = false;
                }
            }
        });
    }

    goToEdit(outlet){
        this.nav.push(EditPage, outlet);
    }

    presentInsertPage(){
        this.nav.push(InsertPage);
    }

}
