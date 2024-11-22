import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/Customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  myForm : FormGroup;
  constructor(public cartService : CartService,private router : Router) {
    let customer = this.cartService.getCustomer();
    this.myForm = new FormGroup({
      name : new FormControl(customer.name),
      firstName : new FormControl(customer.firstName),
      address : new FormControl(customer.address),
      phone : new FormControl(customer.phone),
      email : new FormControl(customer.email)
    })
   }

  ngOnInit(): void {
    
    //   this.myForm = this.formBuilder.group({
    //   name : [this.customer.name, Validators.required],
    //   firstName : [this.customer.firstName, Validators.required],
    //   address : [this.customer.address, Validators.required,Validators.minLength(25)],
    //   phone : [this.customer.phone, Validators.required,Validators.maxLength(10)],
    //   email : [this.customer.email, Validators.required,Validators.pattern('[a-z0-9.@]*')]
    // })
  }
  onSaveCustomer(form : FormGroup){
    if (form.valid) {
      this.cartService.saveCustomer(new Customer(form.value.name,form.value.firstName,
        form.value.address,form.value.phone,form.value.email));
        this.router.navigateByUrl('order');
    }
  }
}
