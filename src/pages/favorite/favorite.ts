import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Device } from '@ionic-native/device';

import { Profile } from './../profile/profile';

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class Favorite {

  public dataPalestrante: Array<any>;
  public dataPalestra: Array<any>;
  public dataTrilha: Array<any>;
  public dataAgendamento: Array<any>;
  public _palestrantes: Array<any> = [];
  public _palestras: Array<any> = [];
  public _trilhas: Array<any> = [];
  public _agendamentos: Array<any> = [];
  private uuID: any;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, private device: Device) {
    var root = this;
    this.uuID = this.device.uuid || '123456';

    this.firebaseProvider.getAllPalestrantes().on('value', (data) => {
      root.dataPalestrante = data.val();      
      root.initializeItems(1);
    });

    this.firebaseProvider.getAllPalestras().on('value', (data) => {
      root.dataPalestra = data.val();
      root.initializeItems(2);
    });

    this.firebaseProvider.getAllTrilhas().on('value', (data) => {
      root.dataTrilha = data.val();
      root.initializeItems(3);
    });

    this.firebaseProvider.getAgendamentoByUUID(root.uuID).on('value', (data) => {
      root.dataAgendamento = data.val();
      root.initializeItems(4);
    });    
  }

  public getPalestrantes(): Array<any> {
    let palestrantes: Array<any> = [];

    for (var agendamento in this._agendamentos) {
      for (var palestrante in this._palestrantes) {
        if (this._agendamentos[agendamento].palestraID == this._palestrantes[palestrante].key) {
          palestrantes.push(this._palestrantes[palestrante]);
        }
      }
    }

    return palestrantes;    
  }

  public getLectureTime(key): any {
    let result: string = "";

    for (var palestra in this._palestras) {  
      if (typeof this._palestras[palestra].palestranteIDs != 'undefined' && this._palestras[palestra].palestranteIDs.indexOf(key) > -1) {
        result = this._palestras[palestra].horario;
        break;
      }
    }

    return result;
  }

  public getLecture(key): any {
    let result: string = "";

    for (var palestra in this._palestras) {  
      if (typeof this._palestras[palestra].palestranteIDs != 'undefined' && this._palestras[palestra].palestranteIDs.indexOf(key) > -1) {
        result = this._palestras[palestra];
        break;
      }
    }

    return result;
  }

  public getChannel(key): any {
    let result: string = "";

    for (var palestra in this._palestras) {  
      if (typeof this._palestras[palestra].palestranteIDs != 'undefined' && this._palestras[palestra].palestranteIDs.indexOf(key) > -1) {
        for (var trilha in this._trilhas) {
          if (this._trilhas[trilha].key == this._palestras[palestra].trilhaID) {
            result = this._trilhas[trilha].canal;
            break;
          }            
        }        
        break;
      }
    }

    return result;
  }

  private initializeItems(type: number) {
    var result = [];    
    
    switch (type) {
      case 1:
        for (var palestrante in this.dataPalestrante) {        
          result.push({
            key: palestrante,
            nome: this.dataPalestrante[palestrante].nome,
            ocupacao: this.dataPalestrante[palestrante].ocupacao,
            descricao: this.dataPalestrante[palestrante].descricao,
            foto: this.dataPalestrante[palestrante].foto,
            index: this.dataPalestrante[palestrante].index
          });        
        }

        //this._palestrantes = _.sortBy(result, function(obj){ return Math.min(obj.index); });
        this._palestrantes = result;
        break;
      case 2:
        for (var palestra in this.dataPalestra) {        
          result.push({
            key: palestra,
            index: this.dataPalestra[palestra].index,
            titulo: this.dataPalestra[palestra].titulo,
            descricao: this.dataPalestra[palestra].descricao,
            horario: this.dataPalestra[palestra].horario,
            trilhaID: this.dataPalestra[palestra].trilhaID,
            palestranteIDs: this.dataPalestra[palestra].palestranteIDs
          });        
        }
        
        //this._palestras = _.sortBy(result, function(obj){ return Math.min(obj.index); });
        this._palestras = result;
        break;
      case 3:
        for (var trilha in this.dataTrilha) {
          result.push({
            key: trilha,
            canal: this.dataTrilha[trilha].canal,
            nome: this.dataTrilha[trilha].nome,
            alias: this.dataTrilha[trilha].alias
          });   
        }

        this._trilhas = result;
        break;
      case 4:
        for (var agendamento in this.dataAgendamento) {        
          result.push({
            key: agendamento,
            deviceID: this.dataAgendamento[agendamento].deviceID,
            palestraID: this.dataAgendamento[agendamento].palestraID //palestranteID
          });        
        }
        console.log(result);
        this._agendamentos = result;
        break;
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Favorite');
  }

  openProfile(profile: any){
    this.navCtrl.push(Profile, { profile: profile, lecture: this.getLecture(profile.key) });
  }

}