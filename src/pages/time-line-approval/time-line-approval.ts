import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-time-line-approval',
  templateUrl: 'time-line-approval.html',
})
export class TimeLineApproval {

  public posts: any[] = [];

  constructor(public viewCtrl: ViewController, public loadingCtrl: LoadingController, db: AngularFireDatabase) {
    let loader = this.loadingCtrl.create({ content: "Carregando..." });
    loader.present();

    db.list('/posts').subscribe(posts => {
      this.posts = posts.reverse();
      loader.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineApproval');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  delete(){
    console.log('Deletando corretamente.');
  }

  approve(){
    console.log('Aprovando corretamente.');
  }

}
