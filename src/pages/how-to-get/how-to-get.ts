import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-how-to-get',
  templateUrl: 'how-to-get.html',
})
export class HowToGet {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToGet');
  }

}
