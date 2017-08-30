import { Component, ViewChild } from '@angular/core';
import { LoadingController, Slides, AlertController, NavController, ViewController, ModalController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';

import { TimeLineView } from '../time-line-view/time-line-view';

@Component({
  selector: 'page-time-line-create',
  templateUrl: 'time-line-create.html',
})
export class TimeLineCreate {

  @ViewChild(Slides) slides: Slides;
  public user: string = '';
  public photos: FirebaseListObservable<any>;
  public form: FormGroup;
  public photo: string = '';
  public filter: string = 'original';
  public filters: string[] = [
    "original",
    "_1977",
    "aden",
    "brannan",
    "brooklyn",
    "clarendon",
    "earlybird",
    "gingham",
    "hudson",
    "inkwell",
    "kelvin",
    "lark",
    "lofi",
    "maven",
    "mayfair",
    "moon",
    "nashville",
    "perpetua",
    "reyes",
    "rise",
    "slumber",
    "stinson",
    "toaster",
    "valencia",
    "walden",
    "willow"
  ];

  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    this.photos = db.list('/posts');
    this.photo = this.navParams.get('photo');
    afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user.email
      }
    });

    this.form = this.fb.group({
      message: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(255),
        Validators.required
      ])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLineCreate');
  }

  changeFilter() {
    let currentIndex = this.slides.getActiveIndex();
    this.filter = this.filters[currentIndex];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    let loader = this.loadingCtrl.create({ content: "Enviando..." });
    loader.present();

    this.photos
      .push({
        user: this.user,
        status: "pendente",
        image: this.photo,
        filter: this.filter,
        message: this.form.controls['message'].value,
        date: firebase.database.ServerValue.TIMESTAMP
      })
      .then(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Post cadastrado com sucesso',
          subTitle: 'Postagem em análise, por favor aguarde.',
          buttons: ['OK']
        });
        setTimeout(() => {
          this.viewCtrl.dismiss();
          alert.present();
        }, 1500);
      })
      .catch(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Ops, algo deu errado',
          subTitle: 'Não foi possível enviar sua imagem.',
          buttons: ['OK']
        });
        alert.present();
      });
  }

}
