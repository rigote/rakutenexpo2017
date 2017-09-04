import { Crop } from '@ionic-native/crop';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
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
import { TimeLineCreate } from '../pages/time-line-create/time-line-create';
import { TimeLineApproval } from '../pages/time-line-approval/time-line-approval';
import { Profile } from '../pages/profile/profile';
import { TakePicture } from '../pages/take-picture/take-picture';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from "@ionic-native/camera";
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { Device } from '@ionic-native/device';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import firebase from 'firebase';
import { OnesignalProvider } from '../providers/onesignal/onesignal';

// const firebaseConfig = {
//   apiKey: "AIzaSyB2tfUOV6-uGGCgM2WerwMxbCjLS7XY15k",
//   authDomain: "db-righion.firebaseapp.com",
//   databaseURL: "https://db-righion.firebaseio.com",
//   projectId: "db-righion"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCfstsRMGc4EdclUKs3iKULrwEvoVn9IFs",
  authDomain: "rakutenexpo2017.firebaseapp.com",
  databaseURL: "https://rakutenexpo2017.firebaseio.com",
  projectId: "rakutenexpo2017"
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
    Profile,
    TakePicture,
    Login,
    Signup
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
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
    Profile,
    TakePicture,
    Login,
    Signup
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Device,
    Crop,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    OnesignalProvider
  ]
})
export class AppModule {

  constructor(){
    firebase.initializeApp(firebaseConfig);
  }

}
