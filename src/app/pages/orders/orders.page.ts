import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  public orders: any = [];
  constructor(
    public orderService: OrderService,
    public router: Router,
    public loader: LoaderService
  ) { }

  ngOnInit() {
    this.loader.presentLoading('Fetching Orders...');
    setTimeout(()=>
    {
      this.getOrders();
    },1000)
  }

  getOrders()
  {
    this.orderService.getOrders().subscribe(
      orders=>
      {
        this.loader.loading.dismiss();
        this.orders = orders;
      },
      error=>
      {
        this.loader.loading.dismiss();
        this.loader.presentAlert('Error', error.error.message);
        this.router.navigateByUrl('/dashboard');
      }
    )
  }

  expandOrder(order): void {
    if (order.expanded) {
      order.expanded = false;
    } else {
      this.orders.map(listorder => {
        if (order == listorder) {
          listorder.expanded = !listorder.expanded;
        } else {
          listorder.expanded = false;
        }
        return listorder;
      });
    }
  }

  back()
  {
    this.router.navigateByUrl('/dashboard');
  }

}
