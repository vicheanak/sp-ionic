import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, AlertController } from 'ionic-angular';
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

    constructor(private nav: NavController, public viewCtrl: ViewController, public alertCtrl: AlertController, private productService: Product, private outletService: Outlet, private orderService: Order) {
        this.selectedOutletNameKh = "ជ្រើសរើសតូប";
        this.now = moment().format("YYYY-MM-DD HH:mm:ss");

        this.productService.load().then((products) => {
            this.products = products;
        });
        this.outletService.getOutletsByUser().then((outlets) => {
            this.outletId = outlets[0]['OutletId'];
            this.outletService.findOne(this.outletId).then((outlet) => {
                this.outlet = outlet;
            });
        });
    }

    doAlert() {
        let alert = this.alertCtrl.create({
        title: 'ចំនួនបញ្ចូលមិនត្រឹមត្រូវទេ',
        message: 'សូមលោកអ្នកធ្វើការត្រួតពិនិត្យម្តងទៀត។',
        buttons: ['យល់ព្រម']
        });
        alert.present()
    }

    isValid(){
        var valid = true;
        for (let i = 0; i < this.products.length; i ++){
            let product = this.products[i];
            if (product.amount){
                if (isNaN(product.amount) || (product.amount % 1 != 0)) {
                    valid = false;
                    this.products[i]['invalidAmount'] = true;
                }
                else{
                    this.products[i]['invalidAmount'] = false;
                }
            }
        }
        return valid;
    }

    submit(){
        let orders = [];
        if (this.isValid()){
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
        else{
            this.doAlert();
        }
    }



}
