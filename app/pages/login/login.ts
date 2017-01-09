import { Component } from '@angular/core';
import { NavController, ModalController, ViewController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data/user-data';
import {Deploy} from '@ionic/cloud-angular';
import {Env} from '../../providers/env/env';
import {RootNav} from '../../providers/root-nav/root-nav';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  authMsg: any;
  failed: any;

  constructor(private nav: NavController, private userData: UserData, private rootNav: RootNav, public modalCtrl: ModalController, private env: Env) {
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

  openModal() {
      let modal = this.modalCtrl.create(ModalsUpdatePage);
      modal.present();
  }


  updateApp(){
      this.openModal();
  }

  exit(){
      return navigator['app'].exitApp();
  }
}

@Component({
templateUrl: 'build/pages/setting/update.html'
})

class ModalsUpdatePage {
    snapshotAvailable: boolean;
    updateStatus: any;
    loading: boolean;

    constructor(public viewCtrl: ViewController, public deploy: Deploy) {
        this.updateStatus = "កំពុងត្រួតពិនិត្យ...";
        this.loading = true;
        this.deploy.check().then((snapshotAvailable) => {
            this.snapshotAvailable = snapshotAvailable;
            this.updateStatus = this.snapshotAvailable ? 'កំពុងទាញយកទិន្ន័យ...' : 'មិនមានអ្វីថ្មីសម្រាប់តម្លើង';
            if (this.snapshotAvailable){
                this.deploy.download().then(() => {
                    this.updateStatus = 'កំពុងបញ្ចូលកម្មវីធីថ្មី...';
                    this.deploy.extract().then(() => {
                        return this.deploy.load();
                    });
                });
            }
            else{
                this.loading = false;
            }
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

