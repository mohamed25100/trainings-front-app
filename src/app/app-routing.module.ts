import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: 'trainings', component: TrainingsComponent }, // Cette route affiche le composant TrainingsComponent quand l'url est '/trainings'
  { path: 'cart', component: CartComponent }, // Affiche le composant CartComponent lorsque l'url est '/cart'
  { path: 'order', component: OrderComponent }, // Affiche le composant OrderComposant lorsque l'url est '/order'
  { path: 'customer', component: CustomerComponent }, // Affiche le composant CustomerComposant lorsque l'url est '/customer'
  { path: '', redirectTo: 'trainings', pathMatch: 'full' }, // Si l'url est vide ('/'), redirige vers '/trainings'
  { path: '404', component: NotFoundComponent }, // Cette route affiche le composant NotFoundComponent pour '/404'
  { path: '**', redirectTo: '/404' } // Cette route gère toutes les url non définies et les redirige vers '/404'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
