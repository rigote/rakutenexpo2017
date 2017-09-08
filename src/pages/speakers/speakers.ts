import { Profile } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class Speakers {
  
  trilhas: string;
  pages: Array<{ title: string, component: any }>;

  public dataPalestrante: Array<any>;
  public dataPalestra: Array<any>;
  public dataTrilha: Array<any>;
  public dataAgendamento: Array<any>;
  public _palestrantes: Array<any> = [];
  public _palestras: Array<any> = [];
  public _trilhas: Array<any> = [];
  public _agendamentos: Array<any> = [];
  private uuID: any;
  public favoriteFilterSelected: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider, private device: Device) {    
    this.uuID = this.device.uuid || '123456';
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
        this.trilhas = this._trilhas[0].alias;

        break;
      case 4:
        for (var agendamento in this.dataAgendamento) {        
          result.push({
            key: agendamento,
            deviceID: this.dataAgendamento[agendamento].deviceID,
            palestraID: this.dataAgendamento[agendamento].palestraID //palestranteID
          });        
        }

        this._agendamentos = result;
        break;
    }
    
  }

  public ChangeTab(value: string){
    this.trilhas = value;
  }

  public getPalestrantes(trilhaID: any): Array<any> {
    let palestrantes: Array<any> = [];
    let result: Array<any> = [];

    for(let i: number = 0; i < this._palestras.length; i++) {
      if (this._palestras[i].trilhaID == trilhaID) {
        for (let j: number = 0; j < this._palestras[i].palestranteIDs.length; j++) {
          if (palestrantes.indexOf(this._palestras[i].palestranteIDs[j]) == -1) {
            palestrantes.push(this._palestras[i].palestranteIDs[j]);
          }
        }        
      }
    }

    for(let i: number = 0; i < this._palestrantes.length; i++) {
      for (let j: number = 0; j < palestrantes.length; j++) {
        if (this._palestrantes[i].key == palestrantes[j]) {
          result.push(this._palestrantes[i]);
          break;
        }
      }      
    }
    return result;    
  }

  public getItems(ev: any) {  
    this.favoriteFilterSelected = false;  
    this.initializeItems(1);
    this.initializeItems(2);
    this.initializeItems(3);
    this.initializeItems(4);
    let val = ev.target.value;

    if (val && val.trim() != '') {
      this._palestrantes = this._palestrantes.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) || 
                  (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
                    (item.ocupacao.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  public toggleFilterFavorite() {
    if (this.favoriteFilterSelected) {
      this.favoriteFilterSelected = false;
      this.initializeItems(1);
      this.initializeItems(2);
      this.initializeItems(3);
      this.initializeItems(4);
    } else {      
      let palestrantes: Array<any> = this._palestrantes;      
      
      this.favoriteFilterSelected = true;
      this._palestrantes = [];

      for (var agendamento in this._agendamentos) {
        for (var palestrante in palestrantes) {
          if (this._agendamentos[agendamento].palestraID == palestrantes[palestrante].key) {
            this._palestrantes.push(palestrantes[palestrante]);
          }
        }
      }
    }
  }

  public toggleLecture(item: any) {
    let palestraIDs: Array<any> = [];

    for (var palestra in this._palestras) {  
      if (typeof this._palestras[palestra].palestranteIDs != 'undefined' && this._palestras[palestra].palestranteIDs.indexOf(item.key) > -1) {
        for (var palestrante in this._palestras[palestra].palestranteIDs) {
          palestraIDs.push(this._palestras[palestra].palestranteIDs[palestrante]);
        }        
      }
    }

    let scheduled: boolean = false;
    let key: any;

    for (var agendamento in this._agendamentos) {
      if (this._agendamentos[agendamento].deviceID == this.uuID && this._agendamentos[agendamento].palestraID == palestraIDs[0]) {
        scheduled = true;
        key = this._agendamentos[agendamento].key;
        break;
      }
    }

    if (scheduled) {
      this.firebaseProvider.removeAgendamento(key);
    }
    else {
      this.firebaseProvider.addAgendamento({
        deviceID: this.uuID,
        palestraID: palestraIDs[0]
      });
    }
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

  ionViewDidLoad() {
    var root = this;
    
    let trilhaPromise = new Promise((resolve, reject) => { 
      this.firebaseProvider.getAllTrilhas().on('value', (data) => {
        root.dataTrilha = data.val();
        resolve(root.dataTrilha);
      })
    });

    let palestrantePromise = new Promise((resolve, reject) => { 
      this.firebaseProvider.getAllPalestrantes().on('value', (data) => {
        root.dataPalestrante = data.val(); 
        resolve(root.dataPalestrante);
      });
    });

    let palestraPromise = new Promise((resolve, reject) => { 
      this.firebaseProvider.getAllPalestras().on('value', (data) => {
        root.dataPalestra = data.val();
        resolve(root.dataPalestra);
      });
    });

    let agendamentoPromise = new Promise((resolve, reject) => { 
      this.firebaseProvider.getAgendamentoByUUID(root.uuID).on('value', (data) => {
        root.dataAgendamento = data.val();
        resolve(root.dataAgendamento);
      });
    });

    Promise.all([trilhaPromise, palestrantePromise, palestraPromise, agendamentoPromise]).then(values => { 
      root.initializeItems(3);
      root.initializeItems(1);
      root.initializeItems(2);
      root.initializeItems(4);
    });
  }

  openProfile(profile: any){
    this.navCtrl.push(Profile, { profile: profile, lecture: this.getLecture(profile.key) });
  }

}
