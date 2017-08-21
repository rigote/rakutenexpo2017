import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';

import { TimeLineCreate } from '../time-line-create/time-line-create';

@Component({
  selector: 'take-picture',
  templateUrl: 'take-picture.html',
})
export class TakePicture {

  constructor(public viewCtrl: ViewController, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TakePicture');
  }

  createPost(){
    let modal = this.modalCtrl.create(TimeLineCreate);
    modal.present();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
