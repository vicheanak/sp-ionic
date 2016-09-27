import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {LoginPage} from './pages/login/login';
import {Env} from './providers/env/env';
import {UserData} from './providers/user-data/user-data';
import {DailyReportPage} from './pages/daily-report/daily-report';
import {MonthlyPage} from './pages/monthly/monthly';
import {SettingPage} from './pages/setting/setting';
import {RootNav} from './providers/root-nav/root-nav'
import {provideCloud, CloudSettings} from '@ionic/cloud-angular';
import {Deploy} from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '7c39aa66'
  }
};

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [Env, UserData, RootNav]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform, private userData: UserData) {
    this.userData.getUser().then((user:any) => {
        if (user){
            this.rootPage = TabsPage;
            // this.rootPage = SettingPage;
        }
        else{
            this.rootPage = LoginPage;
        }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, [
        Env, 
        UserData,
        RootNav,
        Deploy,
        provideCloud(cloudSettings)
], {
    tabSubPages: false,
    tabsHighlight: true
});
