import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data/user-data';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  authMsg: any;
  failed: any;

  constructor(private nav: NavController, private userData: UserData) {
  }


  onLogin(form) {
    this.submitted = true;
    this.failed = false;
    if (form.valid) {
        this.userData.login(this.login).then(data => {
            if (data.err){
                this.failed = true;
                this.authMsg = 'ឈ្មោះ និង ពាក្យសំងាត់ ខុស';
            }
            else{
                this.userData.setUser(data);
                this.nav.push(TabsPage);
            }
        });
    }
  }

}

