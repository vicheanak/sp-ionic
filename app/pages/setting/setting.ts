import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data/user-data';
import {LoginPage} from '../../pages/login/login';
import {RootNav} from '../../providers/root-nav/root-nav';
import {Deploy} from '@ionic/cloud-angular';
import {Env} from '../../providers/env/env';

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
    version: string;
    constructor(private nav: NavController, private userData: UserData, private rootNav: RootNav, public modalCtrl: ModalController, private env: Env) {
      this.userData.getUser().then(data => {
        this.user = data;
      });
      this.version = this.env.getVersion();
    }

    openModal() {
      let modal = this.modalCtrl.create(ModalsUpdatePage);
      modal.present();
    }


    updateApp(){
      this.openModal();
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
