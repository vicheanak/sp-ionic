import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {Product} from '../../providers/product/product';
import {NegativePipe} from '../../pipes/negative';
import {RemainingDayPipe} from '../../pipes/remainingday';
import {TargetDailySalePipe} from '../../pipes/targetDailySale';
import {RoundPipe} from '../../pipes/round';
import {LoginPage} from '../../pages/login/login';
import {Outlet} from '../../providers/outlet/outlet';
import {RootNav} from '../../providers/root-nav/root-nav';

@Component({
templateUrl: 'build/pages/daily-report/daily-report.html',
providers: [Product, Outlet],
pipes: [NegativePipe, RemainingDayPipe, TargetDailySalePipe, RoundPipe]
})
export class DailyReportPage {
    products: any;
    todayOutlets: any;
    productAmounts: any;
    productEmptyAmounts: any;

    constructor(private nav: NavController, public viewCtrl: ViewController, private productService: Product, private outletService: Outlet, private rootNav: RootNav) {

    }

    ionViewWillEnter(){
        this.outletService.todayOutlets().then((outlets) => {
            this.todayOutlets = outlets;
        });

        this.productService.todayOrders().then((products) => {
            if (products['success'] == false){
                 // this.nav.rootNav.push(LoginPage);
                 let rootNav = this.rootNav.getRootNav(this.nav);
                 rootNav.setRoot(LoginPage);
            }
            else{
                this.products = products;
            }

        });
    }


}
