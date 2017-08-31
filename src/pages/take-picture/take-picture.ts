import { Component } from '@angular/core';
import { NavController, ViewController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Crop } from '@ionic-native/crop';

import { TimeLineCreate } from '../time-line-create/time-line-create';

@Component({
  selector: 'take-picture',
  templateUrl: 'take-picture.html',
})
export class TakePicture {

  currentPhoto;

  constructor(
    public viewCtrl: ViewController, 
    private modalCtrl: ModalController, 
    private camera: Camera,
    private crop: Crop
  ) {
  }

  ionViewDidLoad() {
    
  }

  getPhoto(type) {

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 500,
      targetHeight: 300,
      allowEdit: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type == "picture" ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      
      this.currentPhoto = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
    });
  }

  createPost() {

    setTimeout(() => {
      this.viewCtrl.dismiss();

      let modal = this.modalCtrl.create(TimeLineCreate, { photo: this.currentPhoto });
      modal.present();
    }, 800);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
