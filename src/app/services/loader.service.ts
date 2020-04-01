import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading;
  constructor(
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
  ) { }

  async presentLoading(msg) {
    this.loading = await this.loadingCtrl.create({
      spinner: 'crescent',
      message: msg,
      translucent: true,
      cssClass: 'custom-loading'
    });
    return await this.loading.present();
  }

  async presentAlert(header, msg) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
