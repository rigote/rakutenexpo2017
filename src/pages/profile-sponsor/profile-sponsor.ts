import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile-sponsor',
  templateUrl: 'profile-sponsor.html',
})
export class ProfileSponsor {

  profile: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.profile = this.navParams.get('profile');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

}
