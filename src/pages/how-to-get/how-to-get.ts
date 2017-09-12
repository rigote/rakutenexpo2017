import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@Component({
  selector: 'page-how-to-get',
  templateUrl: 'how-to-get.html',
})
export class HowToGet {

  constructor(public navCtrl: NavController, private launchNavigator: LaunchNavigator) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToGet');
  }

  openMap(){
    this.launchNavigator.navigate([-23.608849, -46.696513],{
      app: this.launchNavigator.APP.USER_SELECT
    }).then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    )
  }

}
