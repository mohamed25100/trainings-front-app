import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './components/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AddEditComponent } from './components/add-edit/add-edit.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'trainings', component: TrainingsComponent }, // Accessible à tous
  { path: 'cart', component: CartComponent }, // Accessible à tous
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] }, // Nécessite une connexion
  { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] }, // Nécessite une connexion
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] }, // Protégé par AdminGuard
  { path: 'add', component: AddEditComponent, canActivate: [AdminGuard] },// Nécessite une connexion
  { path: 'edit/:id', component: AddEditComponent, canActivate: [AdminGuard] },// Nécessite une connexion
  { path: '', redirectTo: 'trainings', pathMatch: 'full' }, // Si l'url est vide ('/'), redirige vers '/trainings'
  { path: '404', component: NotFoundComponent }, // Cette route affiche le composant NotFoundComponent pour '/404'
  { path: '**', redirectTo: '/404' } // Cette route gère toutes les url non définies et les redirige vers '/404'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
