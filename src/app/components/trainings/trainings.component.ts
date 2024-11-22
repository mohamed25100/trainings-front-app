import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/Training.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  listTrainings : Training[] | undefined;
  error : string | undefined | null;
  constructor(private cartService : CartService,private apiService : ApiService,private router : Router) { }

  ngOnInit(): void {
    this.getAllTrainings();
  }

  onAddToCart(training:Training){
    if(training.quantity > 0 && training.quantity <=10) {
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart');
    }
    else{
      alert("la quantité dois être comprise entre 1 et 10");
    }
  }
  getAllTrainings() {
    this.apiService.getTrainings().subscribe({
      next : (data) => this.listTrainings = data,
      error : (err) => this.error = err.message,
      complete : () => this.error = null
    })
  }
}
