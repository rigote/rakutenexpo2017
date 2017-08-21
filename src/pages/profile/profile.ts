import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {

  profile: any;
  lecture: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profile = this.navParams.get('profile');
    //this.lecture = this.navParams.get('lecture');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

}
