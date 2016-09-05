import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {Product} from '../../providers/product/product';
import {Outlet} from '../../providers/outlet/outlet';
import {Order} from '../../providers/order/order';
import * as moment from 'moment';
/*
   Generated class for the EditPage page.

   See http://ionicframework.com/docs/v2/components/#navigation for more info on
   Ionic pages and navigation.
 */
@Component({
templateUrl: 'build/pages/edit/edit.html',
providers: [Product, Outlet, Order]
})
export class EditPage {
    store: any;
    stores: any;
    products: any;
    outletNameKh: any;
    outletId: any;
    orders: any;
    orderDate: any;
    dataParams: any;
    constructor(private nav: NavController, private navParams: NavParams, private viewCtrl: ViewController, private productService: Product, private outletService: Outlet, private orderService: Order) {

        this.outletNameKh = navParams.get('outletNameKh');
        this.outletId = navParams.get('id');
        this.orderDate = navParams.get('orderDate');
        this.dataParams = {outletId: this.outletId, orderDate: this.orderDate};

        this.productService.load().then((products) => {
            this.products = products;
            this.outletService.todayOutletsByOutlet(this.dataParams).then((data) => {
                this.orders = data;
                for (let i = 0; i < this.products.length; i ++){
                    for (let j = 0; j < this.orders.length; j ++){
                        let product = this.products[i];
                        let order = this.orders[j];
                        var a = this.orders[0].orderDate.split('T');
                        this.products[i].orderDate = a[0] + ' ' + a[1].split('.')[0];
                        if (product.id == order.ProductId){
                            this.products[i].orderId = order.id;
                            this.products[i].amount = order.amount;
                        }
                    }
                }
            })
        });

    }

    isValid(){
        var valid = true;
        for (let i = 0; i < this.products.length; i ++){
            let product = this.products[i];
            if (product.amount){
                if (isNaN(product.amount)){
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

        if (this.isValid()){
            let updateOrders = [];

            for (let i = 0; i < this.products.length; i ++){
                let product = this.products[i];
                if (product.orderId){
                    updateOrders.push({
                        id: product.orderId,
                        amount: product.amount ? product.amount : 0,
                        OutletId: this.outletId,
                        ProductId: product.id,
                        UserId: 1
                    });
                }
            }

            let insertOrders = [];

            for (let i = 0; i < this.products.length; i ++){
                let product = this.products[i];
                if (product.amount && !product.orderId){
                    insertOrders.push({
                        amount: product.amount,
                        orderDate: product.orderDate,
                        OutletId: this.outletId,
                        ProductId: product.id,
                        UserId: 1
                    });
                }
            }

            this.orderService.update(updateOrders).then((data) => {
                if (insertOrders.length){
                    this.orderService.insert(insertOrders).then((data) => {
                        console.log('upsert success');
                        this.nav.parent.select(1);
                        setTimeout(() => {
                            this.viewCtrl.dismiss();
                        }, 300);
                    })
                }
                else{
                    this.nav.parent.select(1);
                    console.log('update but no insert');
                    setTimeout(() => {
                        this.viewCtrl.dismiss();
                    }, 300);
                }
            });

        }


    }

}
