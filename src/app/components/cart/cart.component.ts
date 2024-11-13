import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/Training.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList : Training[] | undefined;
  total :  number | undefined;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartList();
    this.total = this.getTotal();
  }
  loadCart() {
    this.cartList = this.cartService.getCartList();
    this.total = this.getTotal();
  }
  getTotal(){
    var result = 0;
    this.cartService.getCartList().forEach(e => {
      result += e.price*e.quantity;
    });
    return result;
  }
  deleteFromCartById(id:number){
    this.cartService.removeFromCart(id);
    this.loadCart();
  }
}
