import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/userModel';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  backButtonSubscription;

  user: UserModel = {
    email: 'manas.sinkar@gmail.com',
    password: 'manas12345',
    firstName: '',
    lastName: '',
    address: ''
  };
  constructor(
    public authService: AuthService,
    public loader: LoaderService,
    public router: Router,
    private plt: Platform
  ) {
  }

  ngOnInit() {
  }

  login()
  {
    this.loader.presentLoading('Logging In...');

    let cred = { email: this.user.email, password: this.user.password };
    this.authService.login(cred.email,cred.password)
      .subscribe(res => {
        setTimeout(() => {
          this.loader.loading.dismiss();
          this.router.navigateByUrl('/dashboard');
        }, 100);
      }, err => {
        setTimeout(() => {
          this.loader.loading.dismiss();
          this.loader.presentAlert('Error', err.error.message);
        }, 100);
      })
  }

  register()
  {
    this.router.navigateByUrl('/register');
  }

  ionViewDidEnter() {
    this.backButtonSubscription = this.plt.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
  
  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

}
