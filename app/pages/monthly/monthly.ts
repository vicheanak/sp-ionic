import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Product} from '../../providers/product/product';
import {NegativePipe} from '../../pipes/negative';
import {RoundPipe} from '../../pipes/round';
import {LoginPage} from '../../pages/login/login';
/*
  Generated class for the MonthlyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/monthly/monthly.html',
  providers: [Product],
  pipes: [NegativePipe, RoundPipe]
})
export class MonthlyPage {

	products: any;
    isExist: boolean;

	constructor(private nav: NavController, private productService: Product) {

	}
    ionViewWillEnter(){
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
