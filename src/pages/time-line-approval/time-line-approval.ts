import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-time-line-approval',
  templateUrl: 'time-line-approval.html',
})
export class TimeLineApproval {

  posts: FirebaseListObservable<any[]>;

  constructor(public viewCtrl: ViewController, public loadingCtrl: LoadingController, db: AngularFireDatabase) {
    let loader = this.loadingCtrl.create({ content: "Carregando..." });
    loader.present();

    this.posts = db.list('/posts');

    loader.dismiss();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineApproval');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  delete(key: string){
    return this.posts.remove(key);
  }

  approve(key: string, status: string){
    return this.posts.update(key, {status: status})
  }

}
