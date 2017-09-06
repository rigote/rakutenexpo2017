import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { OnesignalProvider } from './../../providers/onesignal/onesignal';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class Notifications {

  listNotifications = [];

  constructor(
    public navCtrl: NavController,
    private oneSignal: OnesignalProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
    this.getNotifications();
  }

  getNotifications(){
    this.oneSignal.getNotifications().subscribe(data => this.listNotifications = data)
  }

}
