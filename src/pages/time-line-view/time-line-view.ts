import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { TakePicture } from '../take-picture/take-picture';

@Component({
  selector: 'page-time-line-view',
  templateUrl: 'time-line-view.html',
})
export class TimeLineView {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineView');
  }

  modalSendPhoto(){
    let modal = this.modalCtrl.create(TakePicture);
    modal.present();
  }

}
