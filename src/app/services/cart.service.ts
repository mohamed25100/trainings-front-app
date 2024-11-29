import { Injectable } from '@angular/core';
import { Training } from '../model/Training.model';
import { Customer } from '../model/Customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly MAX_ITEM_QUANTITY: number = 10;
  private cartMap: Map<number, Training> = new Map(); // Utilisation d'une HashMap
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
    const cartData = localStorage.getItem('cartMap');

    if (cartData) {
      const parsedData: [number, Training][] = JSON.parse(cartData);
      this.cartMap = new Map(parsedData);// Reconstruire le Map depuis localStorage
    }
  }

  addTraining(training: Training) {
    if (this.cartMap.has(training.id)) {
      // Si la formation existe déjà, mettre à jour la quantité
      const existingTraining = this.cartMap.get(training.id);

      if (existingTraining && existingTraining.quantity < this.MAX_ITEM_QUANTITY) {
        existingTraining.quantity = Math.min(this.MAX_ITEM_QUANTITY, existingTraining.quantity + training.quantity);
        this.cartMap.set(training.id, existingTraining);
      }
    } else {
      // Sinon, ajouter la formation
      training.quantity = Math.min(10, training.quantity);
      this.cartMap.set(training.id, training);
    }

    this.saveCartToLocalStorage(); // Sauvegarde le panier
  }

  removeFromCart(id: number) {
    this.cartMap.delete(id); // Supprimer via la clé
    this.saveCartToLocalStorage(); // Sauvegarde le panier
  }

  getCartList(): Training[] {
    return Array.from(this.cartMap.values()); // Convertir en tableau pour l'affichage
  }

  saveCartToLocalStorage() {
    const cartArray = Array.from(this.cartMap.entries()); // Convertir en tableau [clé, valeur]
    localStorage.setItem('cartMap', JSON.stringify(cartArray));
  }

  saveCustomer(customer: Customer) {
    this.customer = customer;
    localStorage.setItem('customer', JSON.stringify(customer));
  }

  getCustomer() {
    return this.customer;
  }

  clearCart() {
    this.cartMap.clear(); // Vider la HashMap
    this.saveCartToLocalStorage(); // Sauvegarde le panier
  }

  private loadCustomerFromLocalStorage() {
    const customerData = localStorage.getItem('customer');

    if (customerData) {
      this.customer = JSON.parse(customerData);
    }
  }

  getAmount() {
    var result = 0;
    this.getCartList().forEach(e => {
      result += e.price * e.quantity;
    });

    return result;
  }

  getQuantity() {
    var result = 0;
    this.getCartList().forEach(e => {
      result += e.quantity;
    });

    return result;
  }
}