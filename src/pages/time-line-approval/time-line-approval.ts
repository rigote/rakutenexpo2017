import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-time-line-approval',
  templateUrl: 'time-line-approval.html',
})
export class TimeLineApproval {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineApproval');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
