import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Product} from '../../providers/product/product';
import {NegativePipe} from '../../pipes/negative';
import {RoundPipe} from '../../pipes/round';
import {LoginPage} from '../../pages/login/login';
import {Outlet} from '../../providers/outlet/outlet';
import {RootNav} from '../../providers/root-nav/root-nav';


@Component({
  templateUrl: 'build/pages/monthly/monthly.html',
  providers: [Product, Outlet],
  pipes: [NegativePipe, RoundPipe]
})
export class MonthlyPage {

	products: any;
    thisMonthOutlets: any;
    productAmounts: any;

	constructor(private nav: NavController, private productService: Product, private outletService: Outlet, private rootNav: RootNav) {

	}
    ionViewWillEnter(){

        this.outletService.countThisMonthOutlets().then((outlets) => {
            this.thisMonthOutlets = outlets;
        });

		this.productService.thisMonthOrders().then((products) => {
            if (products['success'] == false){
                 let rootNav = this.rootNav.getRootNav(this.nav);
                 rootNav.setRoot(LoginPage);
            }
            else{
                this.products = products;
            }

		});
    }

}
