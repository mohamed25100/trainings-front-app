import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/Customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(public cartService : CartService,private router : Router) { }

  ngOnInit(): void {
  }
  onSaveCustomer(customer : Customer){
    console.log(customer);
  }
  makeOrder(customer : Customer){
    console.log(customer);
    this.cartService.saveCustomer(customer); // Sauvegarde dans localStorage via le service
    this.router.navigateByUrl('order');
  }
}
