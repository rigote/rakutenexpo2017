import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(public http: Http, public context: AngularFireDatabase) {
  }

    getPalestrante(id: any): any {
        return this.context.list('/data/palestrantes', {
            query: {
                orderByChild: 'key',
                equalTo: id 
            }
        });
    }

  getAllPalestrantes(): any {
      return this.context.list('/data/palestrantes');
  }

//   getPalestra(id: any): any {
//       return this.context.list('/data/palestras').child(id);
//   }

  getAllPalestras(): any {
      return this.context.list('/data/palestras', {
        query: {
            orderByKey: true
        }
    });
  }

//   getTrilha(id: any): any {
//       return this.context.list('/data/trilhas').child(id);
//   }

  getAllTrilhas(): any {
      return this.context.list('/data/trilhas');
  }

//   addAgendamento(item: any) {
//       var itemsRef = this.context.list('/data/agendamentos');
//       var newItemRef = itemsRef.push();

//       newItemRef.set(item);
//   }

//   updateAgendamento(id: any, item: any) {
//       let currentItem: any = this.context.list('/data/agendamentos').child(id);

//       if (currentItem != null)
//           currentItem.update(item)
//   }

//   removeAgendamento(id: any) {
//     this.context.list('/data/agendamentos').remove(id);
//   }

//   getAgendamento(id: any): any {
//       return this.context.list('/data/agendamentos').child(id);
//   }

//   getAgendamentoByUUID(uuID: any): any {
//       return this.context.list('/data/agendamentos').orderByChild('deviceID').equalTo(uuID);
//   }

//   getAllAgendamentos(): any {
//       return this.context.list('/data/agendamentos');
//   }

//   getPatrocinador(id: any): any {
//       return this.context.list('/data/patrocinadores').child(id);
//   }

//   getAllPatrocinadores(): any {
//       return this.context.list('/data/patrocinadores');
//   }

//   getInformacao(id: any): any {
//       return this.context.list('/data/informacoes').child(id);
//   }

//   getAllInformacoes(): any {
//       return this.context.list('/data/informacoes');
//   }

}
