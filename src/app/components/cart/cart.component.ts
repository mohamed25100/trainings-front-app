import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/Training.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList : Training[] | undefined;
  total :  number | undefined;
  constructor(public cartService : CartService,private authService: AuthenticateService,private router:Router) { }

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
  makeOrder(){
    if (this.cartList && this.cartList.length > 0) {
      if (this.authService.isLoggedIn()) {
        // Si l'utilisateur est connecté, procéder à la commande
        this.router.navigateByUrl('customer');
      } else {
        // Si l'utilisateur n'est pas connecté, afficher un message et rediriger vers la page de connexion
        alert('Vous devez être connecté pour passer une commande.');
        this.router.navigate(['/login']);  // Rediriger vers la page de connexion
      }
    } else {
      alert('Votre panier est vide. Veuillez ajouter des articles avant de passer commande.');
    }
  }
}
