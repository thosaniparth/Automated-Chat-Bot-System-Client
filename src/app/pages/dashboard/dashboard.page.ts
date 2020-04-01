import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  backButtonSubscription;

  constructor(
    public router: Router,
    public authService: AuthService,
    private plt: Platform
  ) { }

  ngOnInit() {
  }

  viewOrders()
  {
    this.router.navigateByUrl('/orders');
  }

  chat()
  {
    this.router.navigateByUrl('/home');
  }

  logout()
  {
    this.authService.logout().then(() =>
    {
      this.router.navigateByUrl('/login');
    });
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
