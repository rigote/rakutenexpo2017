import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { Notifications } from '../pages/notifications/notifications';
import { Speakers } from '../pages/speakers/speakers';
import { Schedule } from '../pages/schedule/schedule';
import { Sponsors } from '../pages/sponsors/sponsors';
import { Favorite } from '../pages/favorite/favorite';
import { HowToGet } from '../pages/how-to-get/how-to-get';
import { TimeLineView } from '../pages/time-line-view/time-line-view';
import { BannerProvider, Banner } from '../providers/banner/banner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  banner: Banner = null;

  rootPage: any = Login;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public bannerProvider: BannerProvider) {
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

  getBanner(): any{    
    this.bannerProvider.getRandomBanner().then(banner => {
      this.banner = banner
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide(); 
      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#C00303');
      this.getBanner();

      /*IMPLEMENT ONESIGNAL*/
      
      try{
        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };
      
        window["plugins"].OneSignal
          .startInit("648977f6-76f0-4433-b129-afe4d49cef96", "349321711763")
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();
      }
      catch(e){
        console.log(e);
      }
      
      /**END IMPLEMENT ONESIGNAL */

    });    
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
