import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-time-line-create',
  templateUrl: 'time-line-create.html',
})
export class TimeLineCreate {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineCreate');
  }

}
