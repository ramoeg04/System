import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableListDivisionComponent } from './components/admin/division/table-list-division/table-list-division.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login/login.component';
import { TableListCategoryComponent } from './components/admin/category/table-list-category/table-list-category.component';
import { TableListItemComponent } from './components/admin/items/table-list-item/table-list-item.component';
import { TableListPenaltyComponent } from './components/admin/penalty/table-list-penalty/table-list-penalty.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { TableListInscriptionComponent } from './components/admin/inscription/table-list-inscription/table-list-inscription.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '4465', component: HomeComponent },
  { path: 'Divisiones', component: TableListDivisionComponent },
  { path: 'Categoría', component: TableListCategoryComponent },
  { path: 'Evaluaciones', component: TableListItemComponent },
  { path: 'Penalización', component: TableListPenaltyComponent },
  { path: 'Usuario', component: AddUserComponent},
  { path: 'Inscripción', component: TableListInscriptionComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
