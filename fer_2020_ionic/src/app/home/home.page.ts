import { HTTP } from '@ionic-native/http/ngx';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  imgURL: any;
  data

  constructor(private camera: Camera, public alertController: AlertController, private http: HTTP) {

  }
  async postData() {
    // const formData = {
    //   imgURL
    // };
    this.http.post("https://fer-2020-project.herokuapp.com/", this.imgURL, {})
      .then(data => {
        this.showAlert(data.data);
      })
      .catch(error => {
        this.showAlert(error.error);
      })
  }
  async showAlert(msg) {
    await this.alertController.create({
      header: msg
    }).then(res => res.present());
  }
  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }
  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }
  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      this.imgURL = 'data:image/jpg;base64,' + cameraPhoto;
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.imgURL = 'data:image/jpg;base64,' + libraryImage;
    }
  }
}
