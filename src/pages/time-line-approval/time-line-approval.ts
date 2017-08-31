import { Component } from '@angular/core';
import { NavController, ViewController, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-time-line-approval',
  templateUrl: 'time-line-approval.html',
})
export class TimeLineApproval {

  posts: FirebaseListObservable<any[]>;

  constructor(
    public viewCtrl: ViewController, 
    public loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    db: AngularFireDatabase) {
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
    let loader = this.loadingCtrl.create({ content: "Aprovando..." });
    return this.posts.update(key, {status: status})
    .then(() => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Sucesso',
        subTitle: 'Postagem aprovada com sucesso.',
        buttons: ['OK']
      });
      setTimeout(() => {
        this.viewCtrl.dismiss();
        alert.present();
      }, 800);
    })
    .catch(() => {
      loader.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Ops, algo deu errado',
        subTitle: 'Não foi possível aprovar essa postagem.',
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
