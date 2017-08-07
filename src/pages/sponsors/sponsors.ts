import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class Sponsors {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sponsors');
  }

}
