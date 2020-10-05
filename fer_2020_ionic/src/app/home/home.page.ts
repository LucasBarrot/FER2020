import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgURL;

  constructor(private camera: Camera, public alertController: AlertController, private http: HTTP) {

  }

  async getData(img) {
    this.http.post('https://reqres.in/api/users', {
      "img": img,
      "email": "customer004@email.com",
      "tel": "0000252525"
    }, {})
      .catch(error => {

        this.showAlert(error.status);
        this.showAlert(error.error); // error message as string
        this.showAlert(error.headers);

      });
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
