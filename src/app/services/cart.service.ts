import { Injectable } from '@angular/core';
import { Training } from '../model/Training.model';
import { Customer } from '../model/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartList: Training[] = [];
  private customer: Customer = {
    name: '',
    firstName: '',
    address: '',
    phone: '',
    email: ''
  };
  constructor() {
    this.loadCartFromLocalStorage(); // Charger le panier depuis localStorage au démarrage
    this.loadCustomerFromLocalStorage();

   }
  loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cartList');
    if (cartData) {
      this.cartList = JSON.parse(cartData);
    }
  }

  addTraining(training: Training){
    this.cartList.push(training);
    this.saveCartToLocalStorage(); // Sauvegarde le panier
  }
  saveCartToLocalStorage() {
    localStorage.setItem('cartList', JSON.stringify(this.cartList));
  }
  getCartList(){
    return this.cartList;
  }
  removeFromCart(id: number) {
    this.cartList = this.cartList.filter(training => training.id !== id);
    this.saveCartToLocalStorage(); // Sauvegarde le panier
  }

  saveCustomer(customer: Customer) {
    this.customer = customer;
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  getCustomer() {
    return this.customer;
  }
  clearCart() {
    this.cartList = [];
    this.saveCartToLocalStorage(); // Sauvegarde le panier
  }
  private loadCustomerFromLocalStorage() {
    const customerData = localStorage.getItem('customer');
    if (customerData) {
      this.customer = JSON.parse(customerData);
    }
  }
}