import { Component } from '@angular/core';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { TakePicture } from '../take-picture/take-picture';
import { TimeLineApproval } from '../time-line-approval/time-line-approval';
import { BannerProvider } from '../../providers/banner/banner';

@Component({
  selector: 'page-time-line-view',
  templateUrl: 'time-line-view.html',
})
export class TimeLineView {

  public posts: any[] = [];
  public user: string = '';

  constructor(
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public bannerProvider: BannerProvider
  ) {
  }

  getRandomBanner(index): any{
    this.bannerProvider.getRandomBanner().then(banner => {
      this.posts[index].banner = banner;
    });
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({ content: "Carregando..." });
    loader.present();

    this.db.list('/posts', {
      query: {
        orderByChild: 'status',
        equalTo: 'aprovado' 
      }
    }).subscribe(posts => {
      this.posts = posts.reverse();
      
      for(let i = 0; i < this.posts.length; i++) {
        this.posts[i].banner = null;
      }

      loader.dismiss();
    });

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.email
      }
    });
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
