import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BannerProvider, Banner } from '../../providers/banner/banner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public banner: Banner = null;

  constructor(public navCtrl: NavController, public bannerProvider: BannerProvider) {

  }

  getRandomBanner(): any{
    this.bannerProvider.getRandomBanner().then(banner => {
      this.banner = banner;
    });
  }

  ionViewDidLoad() {
    this.getRandomBanner();
  }

}
