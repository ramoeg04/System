import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Divisiones', component: HomeComponent },
  { path: 'Categoría', component: HomeComponent },
  { path: 'Participante', component: HomeComponent },
  { path: 'Jurado', component: HomeComponent },
  { path: 'Ponderación', component: HomeComponent },
  { path: 'Crear Usuario', component: RegisterComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
