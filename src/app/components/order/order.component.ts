import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  showModal = false;
  modalTitle = 'Commande confirmée';
  modalContent = 'Votre commande a bien été prise en compte, merci de nous avoir donné : ';
  modalData : any;
  customer: any;
  cartList: any;
  total: number | undefined;
  dateOrder : Date = new Date();
  constructor(private cartService: CartService,private router : Router) { }

  ngOnInit(): void {
    this.customer = this.cartService.getCustomer();
    this.cartList = this.cartService.getCartList();
    this.total = this.cartList.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  }
  onOrder(){
    this.modalData = this.cartService.getAmount();
    this.showModal = true;
  }
  onModalClose() : void {
    this.showModal = false;
    this.cartService.clearCart();
    this.router.navigateByUrl('');
    console.log("Back to the future !");
    
  }
}
