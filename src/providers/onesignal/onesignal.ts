import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class OnesignalProvider {

  private API_URL = 'https://onesignal.com/api/v1/notifications?app_id=ffbfe53b-19d8-4ec0-874a-d5f89b8200e9'

  constructor(public http: Http) {
    console.log('Hello OnesignalProvider Provider');
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic N2QwYTA0ZGQtYzk1NC00MmMyLWJmYzMtMDdjYWQ0Y2IzNjhj'); 
  }

  getNotifications(){
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.API_URL, {headers: headers})
    .map(this.extractData)
    .do(this.logResponse)
  }

  private logResponse(res: Response){
    console.log(res);
  }

  private extractData(res: Response){
    return res.json();
  }
}
