import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class OnesignalProvider {

  private API_URL = 'https://onesignal.com/api/v1/notifications?app_id=648977f6-76f0-4433-b129-afe4d49cef96'

  constructor(public http: Http) {
    console.log('Hello OnesignalProvider Provider');
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic OWUxMTU2ZWQtNjFlYi00NWY3LTk0NzktN2U5YWQyOTI1YWUw'); 
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
