import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';
import { UserModel } from '../../../models/userModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: UserModel = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: ''
  };
  constructor(
    public authService: AuthService,
    public loader: LoaderService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  register()
  {
    this.loader.presentLoading('Registering...');
    this.authService.register(this.user)
      .subscribe(res => {
        setTimeout(() => {
          this.loader.loading.dismiss();
          this.router.navigateByUrl('/login');
        }, 100);
      }, err => {
        setTimeout(() => {
          this.loader.loading.dismiss();
          this.loader.presentAlert('Error', err.error.message);
        }, 100);
      })
  }

  login()
  {
    this.router.navigateByUrl('/login');
  }

}
