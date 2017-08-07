import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-time-line-approval',
  templateUrl: 'time-line-approval.html',
})
export class TimeLineApproval {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineApproval');
  }

}
