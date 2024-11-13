import { Injectable } from '@angular/core';
import { Training } from '../model/Training.model';
import { Customer } from '../model/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartList : Training[] = []; 
  private customer: Customer = {
    name: '',
    firstName: '',
    address: '',
    phone: '',
    email: ''
  };
  constructor() { }

  addTraining(training: Training){
    this.cartList.push(training);
  }
  getCartList(){
    return this.cartList;
  }
  removeFromCart(id: number) {
    this.cartList = this.cartList.filter(training => training.id !== id);
  }
  getCustomer() {
    return this.customer;
  }
}
