import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {WeeklyPage} from '../weekly/weekly';
import {Product} from '../../providers/product/product';
import {Outlet} from '../../providers/outlet/outlet';
import {Order} from '../../providers/order/order';
import {DailyReportPage} from '../daily-report/daily-report';
import * as _ from 'underscore';
import * as moment from 'moment';

/*
   Generated class for the InsertPage page.

   See http://ionicframework.com/docs/v2/components/#navigation for more info on
   Ionic pages and navigation.
 */
@Component({
templateUrl: 'build/pages/insert/insert.html',
providers: [Product, Order, Outlet]
})
export class InsertPage {
    outletId: any;
    stores: any;
    products: any;
    outlets: any;
    outlet: any;
    todayOutlets: any;
    now: any;
    selectedOutletNameKh: any;

    constructor(private nav: NavController, public viewCtrl: ViewController, private productService: Product, private outletService: Outlet, private orderService: Order) {

        this.selectedOutletNameKh = "ជ្រើសរើសតូប";
        console.log(this.selectedOutletNameKh);

        this.now = moment().format("YYYY-MM-DD HH:mm:ss");

        this.outletService.getOutletsByUser().then((outlets) => {
            this.outlets = outlets;
        });

        // this.outletService.todayOutlets().then((todayOutlets) => {
        //     this.todayOutlets = todayOutlets;
        //     this.outletService.getOutletsByUser().then((outlets) => {
        //         this.outlets = outlets;
        //         this.outlets = this.outlets.filter((el) => {
        //             return this.todayOutlets.findIndex((elem) => {
        //                 return elem.id == el.Outlet.id;
        //             }) == -1;
        //         });
        //     });
        // });

        this.productService.load().then((products) => {
            this.products = products;
        });

    }

    submit(){
        let orders = [];
        for (let i = 0; i < this.products.length; i ++){
            let product = this.products[i];
            if (product.amount){
                orders.push({
                    amount: product.amount,
                    orderDate: this.now,
                    OutletId: this.outletId,
                    ProductId: product.id,
                });
            }
        }


        this.orderService.insert(orders).then((data) => {
            this.nav.parent.select(1);
            setTimeout(() => {
                this.viewCtrl.dismiss();
            }, 300);
        });
    }

    selectDt(){
        console.log(this.outletId);
        this.outletService.findOne(this.outletId).then((outlet) => {
            this.outlet = outlet;
            this.selectedOutletNameKh = 'ឈ្មោះតូប៖  '+ this.outlet.outletNameKh;
            console.log(this.outlet);
        })
    }


}
