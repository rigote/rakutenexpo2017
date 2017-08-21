import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';

@Component({
  selector: 'page-time-line-create',
  templateUrl: 'time-line-create.html',
})
export class TimeLineCreate {

  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineCreate');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
