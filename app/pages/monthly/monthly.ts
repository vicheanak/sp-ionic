import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Product} from '../../providers/product/product';
import {NegativePipe} from '../../pipes/negative';
import {RoundPipe} from '../../pipes/round';
import {LoginPage} from '../../pages/login/login';
import {Outlet} from '../../providers/outlet/outlet';
/*
  Generated class for the MonthlyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/monthly/monthly.html',
  providers: [Product, Outlet],
  pipes: [NegativePipe, RoundPipe]
})
export class MonthlyPage {

	products: any;
    isExist: boolean;
    thisMonthOutlets: any;

	constructor(private nav: NavController, private productService: Product, private outletService: Outlet) {

	}
    ionViewWillEnter(){

        this.outletService.countThisMonthOutlets().then((outlets) => {
            this.thisMonthOutlets = outlets;
        });

		this.productService.thisMonthOrders().then((products) => {
            if (products['success'] == false){
                 this.nav.rootNav.push(LoginPage);
            }
            else{
                this.products = products;
                this.isExist = true;
                if (!this.products.length){
                    this.isExist = false;
                }
            }
		});
    }

}
