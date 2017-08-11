import { Profile } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class Speakers {
  
  trilhas: string = "marketing";

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Speakers');
  }

  openProfile(){
    this.navCtrl.push(Profile);
  }

}
