import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BannerProvider, Banner } from '../../providers/banner/banner';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public banner: Banner = null;
  public conteudo: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public bannerProvider: BannerProvider, 
    public db: AngularFireDatabase) {

  }

  getRandomBanner(): any{
    this.bannerProvider.getRandomBanner().then(banner => {
      this.banner = banner;
    });
  }

  ionViewDidLoad() {
    this.getRandomBanner();
    this.db.list('data/informacoes',{}).subscribe(data=>this.conteudo = data);
  }

}
