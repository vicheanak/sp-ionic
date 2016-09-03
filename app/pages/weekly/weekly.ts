import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the WeeklyPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/weekly/weekly.html',
})
export class WeeklyPage {
    products: any;

  constructor(private nav: NavController, public viewCtrl: ViewController) {

      this.products = [
      {id: 1, value: 'viso pises', nameKh: 'ម្សៅសាប៊ូវីសូពិសេស'},
      {id: 2, value: 'knorr', nameKh: 'ម្សៅស៊ុបខ្នរ'},
      {id: 3, value: 'clear men', nameKh: 'ក្លៀរបុរសពណ៌ខៀវ'},
      {id: 4, value: 'sunlight', nameKh: 'ទឹកលាងចានសាន់ឡាយ'},
      {id: 5, value: 'viso star', nameKh: 'វីស៊ូពិសេសស្តារ'},
      {id: 6, value: 'comfort blue', nameKh: 'ទឹកក្រអូបខមហ្វត'},
      {id: 7, value: 'comfort pink', nameKh: 'ទឹកក្រអូបខមហ្វតក្រហម'}
      ]
  }

  dismiss(){
       this.viewCtrl.dismiss();
  }

}
