import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Notifications } from '../pages/notifications/notifications';
import { Speakers } from '../pages/speakers/speakers';
import { Schedule } from '../pages/schedule/schedule';
import { Sponsors } from '../pages/sponsors/sponsors';
import { Favorite } from '../pages/favorite/favorite';
import { HowToGet } from '../pages/how-to-get/how-to-get';
import { TimeLineView } from '../pages/time-line-view/time-line-view';
import { TimeLineCreate } from '../pages/time-line-create/time-line-create';
import { TimeLineApproval } from '../pages/time-line-approval/time-line-approval';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Como Chegar', component: HowToGet, icon: 'pin' },
      { title: 'Agenda', component: Schedule, icon: 'time' },
      { title: 'Palestrantes', component: Speakers, icon: 'contacts' },
      { title: 'Favorito', component: Favorite, icon: 'star' },
      { title: 'Patrocinadores', component: Sponsors, icon: 'people' },
      { title: 'Time Line', component: TimeLineView, icon: 'git-merge' },
      { title: 'Notificações', component: Notifications, icon: 'notifications' }      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
