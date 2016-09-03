import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {Product} from '../../providers/product/product';
import {NegativePipe} from '../../pipes/negative';
import {RemainingDayPipe} from '../../pipes/remainingday';
import {TargetDailySalePipe} from '../../pipes/targetDailySale';
import {RoundPipe} from '../../pipes/round';

/*
   Generated class for the MonthlyPage page.

   See http://ionicframework.com/docs/v2/components/#navigation for more info on
   Ionic pages and navigation.
 */
@Component({
templateUrl: 'build/pages/daily-report/daily-report.html',
providers: [Product],
pipes: [NegativePipe, RemainingDayPipe, TargetDailySalePipe, RoundPipe]
})
export class DailyReportPage {
    products: any;
    isExist: boolean;

    constructor(private nav: NavController, public viewCtrl: ViewController, private productService: Product) {

    }

    ionViewWillEnter(){
        this.productService.todayOrders().then((products) => {
            console.log('today products', products);
            this.products = products;
            this.isExist = true;
            if (!this.products.length){
                this.isExist = false;
            }
        });
    }


}
