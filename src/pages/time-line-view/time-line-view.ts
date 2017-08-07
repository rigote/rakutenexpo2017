import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-time-line-view',
  templateUrl: 'time-line-view.html',
})
export class TimeLineView {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineView');
  }

}
