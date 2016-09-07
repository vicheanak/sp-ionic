import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data/user-data';
import {LoginPage} from '../../pages/login/login';
import {RootNav} from '../../providers/root-nav/root-nav';

/*
  Generated class for the SettingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/setting/setting.html',
})
export class SettingPage {
    user: any;
  constructor(private nav: NavController, private userData: UserData, private rootNav: RootNav) {
      this.userData.getUser().then(data => {
          this.user = data;
      });
  }

  logout(){
      this.userData.logout().then(data => {
          let rootNav = this.rootNav.getRootNav(this.nav);
          rootNav.setRoot(LoginPage);
      });
  }

  exit(){
      return navigator['app'].exitApp();
  }

}
