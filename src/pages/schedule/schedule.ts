import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class Schedule {

  public palestras: any = [];
  public dataPalestra: any;
  public trilhas: any = [];
  public dataTrilha: any;
  public palestrantes: any = [];
  public dataPalestrante: any;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {    
    var root = this;
    
    this.firebaseProvider.getAllPalestras().once('value', (data) => {
      root.dataPalestra = data.val();
      root.initializeItems(1);
    });

    this.firebaseProvider.getAllPalestrantes().once('value', (data) => {
      root.dataPalestrante = data.val();
      root.initializeItems(2);
    });

    this.firebaseProvider.getAllTrilhas().once('value', (data) => {
      root.dataTrilha = data.val();
      root.initializeItems(3);
    });
  }

  private initializeItems(type: number) {
    var result = [];
    
    switch (type) {
      case 1:
        for (var item in this.dataPalestra) {        
          result.push({
            key: item,
            index: this.dataPalestra[item].index,
            titulo: this.dataPalestra[item].titulo,
            descricao: this.dataPalestra[item].descricao,
            horario: this.dataPalestra[item].horario,
            trilhaID: this.dataPalestra[item].trilhaID,
            palestranteIDs: this.dataPalestra[item].palestranteIDs
          });        
        }

        this.palestras = result;
      break;
      case 2:
        for (var item in this.dataPalestrante) {        
          result.push({
            key: item,
            descricao: this.dataPalestrante[item].descricao,
            foto: this.dataPalestrante[item].foto,
            nome: this.dataPalestrante[item].nome,
            ocupacao: this.dataPalestrante[item].ocupacao,
            index: this.dataPalestrante[item].index
          });        
        }

        this.palestrantes = result;
      break;
      case 3:
        for (var item in this.dataTrilha) {        
          result.push({
            key: item,
            canal: this.dataTrilha[item].canal,
            nome: this.dataTrilha[item].nome,
            alias: this.dataTrilha[item].alias
          });        
        }

        this.trilhas = result;
      break;
    }    

    
  }

  public getTimeList(): Array<string> {

    let result: any = [];

    for (let i: number = 0; i < this.palestras.length; i++) {
      let contains: boolean = false;

      for (let j: number = 0; j < result.length; j++) {
        if (result[j] == this.palestras[i].horario) {
          contains = true;
          break;
        }
      }

      if (!contains) {
        result.push(this.palestras[i].horario);
      }
    }

    return result;
  }

  public getLecturesByTime(hour: string): Array<any> {

    let result: any = [];

    for (let i: number = 0; i < this.palestras.length; i++) {
        if (hour == this.palestras[i].horario) {
          result.push({
            key: this.palestras[i].key,
            horario: this.palestras[i].horario,
            titulo: this.palestras[i].titulo,
            descricao: this.palestras[i].descricao,
            palestrantes: this.getPalestrantes(this.palestras[i].palestranteIDs),
            trilhaID: this.palestras[i].trilhaID
          });
        }
    }

    return result;

  }

  public getPalestrantesLabel(palestrantes: Array<any>): string {
    
    let result: string = '';

    for (let i: number = 0; i < palestrantes.length; i++) {
      if (i == 0) result = palestrantes[i].nome;
      else if (i == palestrantes.length - 1) result = result + ' e ' + palestrantes[i].nome;
      else result = result + ', ' + palestrantes[i].nome;
    }

    return result;

  }

  private getPalestrantes(palestranteIDs: Array<string>): Array<any> {
    
    let result: Array<any> = [];
    
    if (typeof palestranteIDs != 'undefined') {
      for (let i: number = 0; i < palestranteIDs.length; i++) {
        for (let j: number = 0; j < this.palestrantes.length; j++) {
          if (palestranteIDs[i] == this.palestrantes[j].key) {
            result.push(this.palestrantes[j]);
            break;
          }
        }
      }
    }

    return result;

  }

  public getFotoPalestrantes(palestrantes: Array<any>): string {
    let foto: string = '';

    if (palestrantes.length > 0)
      foto = typeof palestrantes[0].foto != 'undefined' ? palestrantes[0].foto : foto;

    return foto;
  }

  public getTrilhaData(trilhaID: any, type: number): string {
    for (var index in this.trilhas) {
      if (this.trilhas[index].key == trilhaID) {
        switch (type) {
          case 1: //canal
            return this.trilhas[index].canal;
          case 2: //alias
            return this.trilhas[index].alias;
          case 3: //nome
            return this.trilhas[index].nome;
        }
      }        
    }
    
    return '';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Schedule');
  }

}
