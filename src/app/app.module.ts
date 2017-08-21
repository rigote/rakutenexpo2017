import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
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
import { Profile } from '../pages/profile/profile';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from '../providers/firebase/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB6Eaac9Vgs0HO1QcT7XLkghceapTYYcXI",
  authDomain: "rakuten-expo-2016.firebaseapp.com",
  databaseURL: "https://rakuten-expo-2016.firebaseio.com",
  storageBucket: "rakuten-expo-2016.appspot.com"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Notifications,
    Speakers,
    Schedule,
    Sponsors,
    Favorite,
    HowToGet,
    TimeLineView,
    TimeLineCreate,
    TimeLineApproval,
    Profile
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Notifications,
    Speakers,
    Schedule,
    Sponsors,
    Favorite,
    HowToGet,
    TimeLineView,
    TimeLineCreate,
    TimeLineApproval,
    Profile
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
