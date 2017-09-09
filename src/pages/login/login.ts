import { Component } from '@angular/core';
import { LoadingController, NavController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook } from '@ionic-native/facebook';
import * as firebase from 'firebase';

import { Signup } from '../signup/signup';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login{
  public form: FormGroup;

  facebook = {
    loggedIn: false,
    email: ''
  }

  google = {
    loggedIn: false,
    email: ''
  }

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    public facebookAuth: Facebook,
    private alertCtrl: AlertController) {
    this.form = this.fb.group({
      email: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(160),
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });

    afAuth.authState.subscribe(user => {
      if (user) {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  submit() {
    let loader = this.loadingCtrl.create({ content: "Autenticando..." });
    loader.present();

    this.afAuth.auth
      .signInWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then(() => {
        loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Autenticação Inválida',
          subTitle: 'Usuário ou senha incorretos.',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  loginWithFacebook(){
    this.facebookAuth.login(['email']).then(res=>{
      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
      firebase.auth().signInWithCredential(fc).then(fs=>{
        let loader = this.loadingCtrl.create({ content: "Autenticando..." });
        loader.present();
        console.log(res);
        loader.dismiss();
      }).catch(ferror=>{
        let alert = this.alertCtrl.create({
          title: 'Autenticação Inválida',
          subTitle: 'Não foi possível logar com sua conta Facebook.',
          buttons: ['OK']
        });
        alert.present();
      })
    }).catch(error=>{
        console.log(error);
    })
  }

  loginWithGoogle(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res=> {
      let loader = this.loadingCtrl.create({ content: "Autenticando..." });
      loader.present();
      this.google.loggedIn = true;
      this.google.email = res.user.email;
      loader.dismiss();
    })
  }
  
  logOut(){
    this.facebook.loggedIn = false;
    this.google.loggedIn = false;
    this.afAuth.auth.signOut();
  }

  forgotPassword(){
    this.afAuth.auth.sendPasswordResetEmail(this.form.controls['email'].value);
  }

  goToSignup() {
    this.navCtrl.setRoot(Signup);
  }
}