import { Profile } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';

@Component({
  selector: 'page-speakers',
  templateUrl: 'speakers.html',
})
export class Speakers {
  
  trilhas: string = "marketing";

  pages: Array<{ title: string, component: any }>;

  public dataPalestrante: Array<any> = new Array<any>();
  public dataPalestra: Array<any> = new Array<any>();
  public dataTrilha: Array<any> = new Array<any>();
  public dataAgendamento: Array<any> = new Array<any>();
  private _uuID: any;
  public favoriteFilterSelected: boolean = false;
  public tabs: Array<boolean> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider) {
    var root = this; 

    this.firebaseProvider.getAllPalestrantes().subscribe(palestrantes => {
      palestrantes.forEach(palestrante => {
        root.dataPalestrante.push(palestrante);
      });
    });    
    
    this.firebaseProvider.getAllPalestras().subscribe(palestras => {
      palestras.forEach(palestra => {
        root.dataPalestra.push(palestra);
      });
    });

    this.firebaseProvider.getAllTrilhas().subscribe(trilhas => {
      trilhas.forEach(trilha => {
        root.dataTrilha.push(trilha);
      });
    });

    //this.dataAgendamento = this.firebaseProvider.getAgendamentoByUUID(root._uuID).subscribe(agendamentos => {
    //   agendamentos.forEach(agendamento => {
    //     this.dataPalestrante.push(agendamento);
    //   });
    // });
  }

  public getItems(ev: any) {  
    // this.favoriteFilterSelected = false;  
    // let val = ev.target.value;

    // if (val && val.trim() != '') {
    //   this.items = this.items.filter((item) => {
    //     return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1) || 
    //               (item.descricao.toLowerCase().indexOf(val.toLowerCase()) > -1) ||
    //                 (item.ocupacao.toLowerCase().indexOf(val.toLowerCase()) > -1);
    //   })
    // }
  }

  public toggleFilterFavorite() {
    // if (this.favoriteFilterSelected) {
    //   this.favoriteFilterSelected = false;
    // } else {      
    //   let _items: Array<any> = this.items;      
      
    //   this.favoriteFilterSelected = true;
    //   this.items = [];

    //   for (var i in this.itemsAgendamento) {
    //     for (var j in _items) {
    //       if (this.itemsAgendamento[i].palestraID == _items[j].key) {
    //         this.items.push(_items[j]);
    //       }
    //     }
    //   }
    // }
  }

  public toggleLecture(item: any) {

    /*let palestraIDs: Array<any> = [];

    for (var i in this.itemsPalestra) {  
      if (typeof this.itemsPalestra[i].palestranteIDs != 'undefined' && this.itemsPalestra[i].palestranteIDs.indexOf(item.key) > -1) {
        for (var j in this.itemsPalestra[i].palestranteIDs) {
          palestraIDs.push(this.itemsPalestra[i].palestranteIDs[j]);
        }        
      }
    }

    let scheduled: boolean = false;
    let key: any;

    for (var i in this.itemsAgendamento) {
      if (this.itemsAgendamento[i].deviceID == this._uuID && this.itemsAgendamento[i].palestraID == palestraIDs[0]) {
        scheduled = true;
        key = this.itemsAgendamento[i].key;
        break;
      }
    }

    if (scheduled) {
      this._fire.removeAgendamento(key);
    }
    else {
      this._fire.addAgendamento({
        deviceID: this._uuID,
        palestraID: palestraIDs[0]
      });
    }*/
    
  }

  public getLectureTime(key): any {
    let result: string = "";
    
    for (let i: number = 0; i < this.dataPalestra.length; i++) {
      if (typeof this.dataPalestra[i].palestranteIDs != 'undefined' && this.dataPalestra[i].palestranteIDs.indexOf(key) > -1) {
        result = this.dataPalestra[i].horario;
      }
    }

    return result;
  }

  public getLecture(key): any {
    let result: any;

    for (let i: number = 0; i < this.dataPalestra.length; i++) {
      if (typeof this.dataPalestra[i].palestranteIDs != 'undefined' && this.dataPalestra[i].palestranteIDs.indexOf(key) > -1) {        
        result = this.dataPalestra[i];
      }
    }
    
    return result;
  }

  public getChannel(key): any {
    let result: string = "";

    var root = this;

    for (let j: number = 0; j < this.dataPalestra.length; j++) {
      if (typeof this.dataPalestra[j].palestranteIDs != 'undefined' && this.dataPalestra[j].palestranteIDs.indexOf(key) > -1) {
        for (let i: number = 0; i < root.dataTrilha.length; i++) {
          if (root.dataTrilha[i].key == this.dataPalestra[j].trilhaID) {
            result = root.dataTrilha[i].canal;
          }  
        }
      }
    }
    
    return result;
  }

  public getPalestrantes(trilhaID: any): Array<any> {
    let palestrantes: Array<any> = [];
    let result: Array<any> = [];
    
    for (let i: number; i < this.dataPalestra.length; i++) {
      if (this.dataPalestra[i].trilhaID == trilhaID) {
        for (let j: number = 0; j < this.dataPalestra[i].palestranteIDs.length; j++) {
          if (palestrantes.indexOf(this.dataPalestra[i].palestranteIDs[j]) == -1) {
            palestrantes.push(this.dataPalestra[i].palestranteIDs[j]);
          }
        }        
      }      
    }

    for(let i: number = 0; i < this.dataPalestrante.length; i++) {
      for (let j: number = 0; j < this.dataPalestrante[i].length; j++) {
        if (this.dataPalestrante[i].key == palestrantes[j]) {
          result.push(this.dataPalestrante[i]);
          break;
        }
      }
    }

    return result;    
  }

  public isScheduled(item) {
    let result: boolean = false;
    let palestraIDs: Array<any> = [];

    for(let i: number = 0; i < this.dataPalestra.length; i++) {
      if (typeof this.dataPalestra[i].palestranteIDs != 'undefined' && this.dataPalestra[i].palestranteIDs.indexOf(item.key) > -1) {
        for (var j in this.dataPalestra[i].palestranteIDs) {
          palestraIDs.push(this.dataPalestra[i].palestranteIDs[j]);
        }        
      }
    }

    for(let i: number = 0; i < this.dataAgendamento.length; i++) {
      if (palestraIDs.indexOf(this.dataAgendamento[i].palestraID) > -1 && this._uuID) {
        result = true;
      }
    }

    return result;
  } 

  ionViewDidLoad() {
    
  }

  openProfile(profile: any){
    this.navCtrl.push(Profile, { profile: profile, lecture: this.getLecture(profile.key) });
  }

}

export class SpeakerModel
{
  public descricao: string;
  public foto: string;
  public index: number;
  public nome: string;  
  public ocupacao: string;  
}
