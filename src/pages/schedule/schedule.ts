import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Device } from '@ionic-native/device';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class Schedule {

  public palestras: Array<any> = [];
  public dataPalestra: any;
  public trilhas: Array<any> = [];
  public dataTrilha: any;
  public palestrantes: Array<any> = [];
  public dataPalestrante: any;
  public agendamentos: Array<any> = [];
  public dataAgendamento: any;
  public uuID: any;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, private device: Device) {
    var root = this;

    this.uuID = this.device.uuid || '123456';

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

    this.firebaseProvider.getAgendamentoByUUID(root.uuID).on('value', (data) => {
      root.dataAgendamento = data.val();
      root.initializeItems(4);
    });
  }

  private initializeItems(type: number) {
    var result = [];

    switch (type) {
      case 1:
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

        this.palestras = result;
        break;
      case 2:
        for (var palestrante in this.dataPalestrante) {
          result.push({
            key: palestrante,
            descricao: this.dataPalestrante[palestrante].descricao,
            foto: this.dataPalestrante[palestrante].foto,
            nome: this.dataPalestrante[palestrante].nome,
            ocupacao: this.dataPalestrante[palestrante].ocupacao,
            index: this.dataPalestrante[palestrante].index
          });
        }

        this.palestrantes = result;
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

        this.trilhas = result;
        break;
      case 4:
        for (var agendamento in this.dataAgendamento) {
          result.push({
            key: agendamento,
            deviceID: this.dataAgendamento[agendamento].deviceID,
            palestraID: this.dataAgendamento[agendamento].palestraID //palestranteID
          });
        }
        
        this.agendamentos = result;
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

  public toggleLecture(item: Array<any>) {
    if (item.length > 0){
      let palestraIDs: Array<any> = [];
      
      for (var palestra in this.palestras) {
        if (typeof this.palestras[palestra].palestranteIDs != 'undefined' && this.palestras[palestra].palestranteIDs.indexOf(item[0].key) > -1) {
          for (var palestrante in this.palestras[palestra].palestranteIDs) {
            palestraIDs.push(this.palestras[palestra].palestranteIDs[palestrante]);
          }
        }
      }
  
      let scheduled: boolean = false;
      let key: any;
  
      for (var agendamento in this.agendamentos) {
        if (this.agendamentos[agendamento].deviceID == this.uuID && this.agendamentos[agendamento].palestraID == palestraIDs[0]) {
          scheduled = true;
          key = this.agendamentos[agendamento].key;
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
