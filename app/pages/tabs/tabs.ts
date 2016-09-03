import {Component} from '@angular/core';
import {DailyPage} from '../daily/daily';
import {WeeklyPage} from '../weekly/weekly';
import {MonthlyPage} from '../monthly/monthly';
import {DailyReportPage} from '../daily-report/daily-report';
import {SettingPage} from '../setting/setting';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = DailyPage;
    this.tab2Root = DailyReportPage;
    this.tab3Root = MonthlyPage;
    this.tab4Root = SettingPage;
  }
}
