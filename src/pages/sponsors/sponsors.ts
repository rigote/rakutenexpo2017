import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';

import { Profile } from './../profile/profile';

@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html',
})
export class Sponsors {

  public sponsors: any = [];
  public dataSponsor: any;

  public _gold: Array<any> = [];
  public _silver: Array<any> = [];
  public _bronze: Array<any> = [];
  public _diamond: Array<any> = [];
  public _apoio: Array<any> = [];

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public navParams: NavParams) {
    var root = this;
    this.firebaseProvider.getAllPatrocinadores().once('value', (data) => {
      root.dataSponsor = data.val();
      root.initializeItems();
    });
  }

  private initializeItems() {
    var result = [];

    for (var item in this.dataSponsor) {        
      result.push({
        key: item,
        nome: this.dataSponsor[item].nome,
        tipo: this.dataSponsor[item].tipo,
        logo: this.dataSponsor[item].logo
      });        
    }

    //this.storage.setJson('patrocinadores', result);

    this.sponsors = result;

    this._gold = this.getSponsorsByType('Gold');
    this._silver = this.getSponsorsByType('Silver');
    this. _bronze = this.getSponsorsByType('Bronze');
    this._diamond = this.getSponsorsByType('Diamond');
    this._apoio = this.getSponsorsByType('Apoio');
  }

  public getSponsorsByType(type: string): Array<any> {

    let result: any = [];

    for (let i: number = 0; i < this.sponsors.length; i++) {
        if (type == this.sponsors[i].tipo) {
          result.push({
            key: this.sponsors[i].key,
            nome: this.sponsors[i].nome,
            tipo: this.sponsors[i].tipo,
            logo: this.sponsors[i].logo            
          });
        }
    }

    return result;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sponsors');
  }

  openProfile(){
    this.navCtrl.push(Profile);
  }

}
