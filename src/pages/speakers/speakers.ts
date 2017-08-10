import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class Speakers {
  
  trilhas: string = "marketing";

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Speakers');
  }

}
