import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  customer: any;
  cartList: any;
  total: number | undefined;
  date: string;
  constructor(private cartService: CartService,private router : Router) {
    this.date = '';
  }

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer();
    this.cartList = this.cartService.getCartList();
    this.total = this.cartList.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();

    this.date = `${day}/${month}/${year}`;
  }
  confirmOrder() {
    alert('Commande confirmée!');
    this.cartService.clearCart();
    this.router.navigateByUrl('');
  }
}
