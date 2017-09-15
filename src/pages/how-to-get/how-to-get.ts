import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { BannerProvider, Banner } from '../../providers/banner/banner';

@Component({
  selector: 'page-how-to-get',
  templateUrl: 'how-to-get.html',
})
export class HowToGet {

  public banner: Banner = null;

  constructor(public navCtrl: NavController, private launchNavigator: LaunchNavigator, public bannerProvider: BannerProvider) {
  }

  getRandomBanner(): any{
    this.bannerProvider.getRandomBanner().then(banner => {
      this.banner = banner;
    });
  }

  ionViewDidLoad() {
    this.getRandomBanner();
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
