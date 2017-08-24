import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

import { Login } from '../login/login';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class Signup {

  public form: FormGroup;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
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
  }

  submit() {
    let loader = this.loadingCtrl.create({ content: "Cadastrando..." });
    loader.present();

    this.afAuth.auth
      .createUserWithEmailAndPassword(this.form.controls['email'].value, this.form.controls['password'].value)
      .then(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Bem vindo!',
          subTitle: 'Seu cadastro foi criado com sucesso e você já tem acesso ao nosso App.',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(Login);
      })
      .catch(() => {
        loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Ops, algo deu errado!',
          subTitle: 'Não foi possível realizar seu cadastro.',
          buttons: ['OK']
        });
        alert.present();
      });
  }

  goToLogin() {
    this.navCtrl.setRoot(Login);
  }

}