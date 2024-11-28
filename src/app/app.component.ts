import { Component } from '@angular/core';
import { AuthenticateService } from './services/authenticate.service';
import { CartService } from './services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'trainings-front-app';
  welcomePage: boolean = this.router.url === "/trainings";

  constructor(public authService: AuthenticateService, public cartService: CartService, private router: Router) {
    this.router.events.subscribe((val) => {
      this.welcomePage = this.router.url === "/trainings"
    });
  }
}
