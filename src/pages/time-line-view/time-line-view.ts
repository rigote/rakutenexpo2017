import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { TakePicture } from '../take-picture/take-picture';
import { TimeLineApproval } from '../time-line-approval/time-line-approval';

@Component({
  selector: 'page-time-line-view',
  templateUrl: 'time-line-view.html',
})
export class TimeLineView {

  public posts: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public loadingCtrl: LoadingController,
    db: AngularFireDatabase
  ) {
    let loader = this.loadingCtrl.create({ content: "Carregando..." });
    loader.present();

    db.list('/posts').subscribe(posts => {
      this.posts = posts.reverse();
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineView');
  }

  modalSendPhoto(){
    let modal = this.modalCtrl.create(TakePicture);
    modal.present();
  }

  modalEditPost(){
    let modal = this.modalCtrl.create(TimeLineApproval);
    modal.present();
  }

}
