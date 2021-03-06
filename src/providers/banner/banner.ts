import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseProvider } from './../firebase/firebase';

@Injectable()
export class BannerProvider {

  private banners: Array<Banner> = [];

  constructor(public http: Http, public firebaseProvider: FirebaseProvider) {
  }

  public getRandomBanner(): Promise<Banner> {
    
    let promise: Promise<Banner> = new Promise((resolve, reject) => {

      this.firebaseProvider.getAllBanners().on('value', (data) => {
  
        if (data.val() != null) {
          var _banners = data.val();
          this.banners = [];
  
          for (var banner in data.val()) {
            this.banners.push({
              key: banner,
              nome: _banners[banner].nome,
              imagemMenu: _banners[banner].imagemMenu,
              imagemView: _banners[banner].imagemView,
              link: _banners[banner].link
            });
          }
  
          var index = Math.floor(Math.random() * (this.banners.length - 1));
          
          resolve(this.banners[index]);
        }
      });
    });
    
    return promise;
    
  }  

}

export class Banner {
  public key: string = "";
  public nome: string = "";
  public imagemMenu: string = "";
  public imagemView: string = "";
  public link: string = "";
}
