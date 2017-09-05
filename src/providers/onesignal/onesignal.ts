import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OnesignalProvider {

  private API_URL = 'https://onesignal.com/api/v1/notifications?app_id=ffbfe53b-19d8-4ec0-874a-d5f89b8200e9'

  constructor(public http: Http) {
    console.log('Hello OnesignalProvider Provider');
  }

  getall(){
    return new Promise((resolve,reject) =>{
      this.http.head('Authorization: Basic N2QwYTA0ZGQtYzk1NC00MmMyLWJmYzMtMDdjYWQ0Y2IzNjhj');
      this.http.get(this.API_URL)
        .subscribe((result:any)=>{
          resolve(result.json());
          console.log(result.json());
        },
        (error) => {
          reject(error.json());
          console.log(error.json());
        }
      )
    }
  );
  }
}
