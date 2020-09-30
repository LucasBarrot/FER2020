import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgURL;

  constructor(private camera: Camera, public alertController: AlertController) {

  }
  async showAlert(msg) {
    await this.alertController.create({
      header: msg
    }).then(res => res.present());
  }
  getPhoto() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((res) => {
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch(e => {
      this.showAlert(e);
    })
  }
  getGallery() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    }).then((res) => {
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch(e => {
      this.showAlert(e);
    })
  }
}
