import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { TableListDivisionComponent } from './components/admin/division/table-list-division/table-list-division.component';
import { AddDivisionComponent } from './components/admin/division/add-division/add-division.component';
import { TableListCategoryComponent } from './components/admin/category/table-list-category/table-list-category.component';
import { AddCategoryComponent } from './components/admin/category/add-category/add-category.component';
import { TableListItemComponent } from './components/admin/items/table-list-item/table-list-item.component';
import { AddItemComponent } from './components/admin/items/add-item/add-item.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { AddPenaltyComponent } from './components/admin/penalty/add-penalty/add-penalty.component';
import { TableListPenaltyComponent } from './components/admin/penalty/table-list-penalty/table-list-penalty.component';
import { TableListInscriptionComponent } from './components/admin/inscription/table-list-inscription/table-list-inscription.component';
import { AddInscriptionComponent } from './components/admin/inscription/add-inscription/add-inscription.component';
import { ViewInscriptionComponent } from './components/admin/inscription/view-inscription/view-inscription.component';
import { VoteAdminComponent } from './components/admin/vote/vote-admin/vote-admin.component';
import { VoteJuradoComponent } from './components/jurado/vote/vote-jurado/vote-jurado.component';
import { VoteItemsComponent } from './components/jurado/vote/vote-items/vote-items.component';
import { ResultUserComponent } from './components/user/result/result-user/result-user.component';
import { VoteSelectComponent } from './components/admin/vote/vote-select/vote-select.component';
import { ResultViewComponent } from './components/user/view/result-view/result-view.component';

//Angular Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { ResultGeneralComponent } from './components/user/result/result-general/result-general.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    ToolbarComponent,
    AdminHomeComponent,
    LoginComponent,
    RegisterComponent,
    TableListDivisionComponent,
    AddDivisionComponent,
    TableListCategoryComponent,
    AddCategoryComponent,
    AddUserComponent,
    TableListItemComponent,
    AddItemComponent,
    AddPenaltyComponent,
    TableListPenaltyComponent,
    TableListInscriptionComponent,
    AddInscriptionComponent,
    ViewInscriptionComponent,
    VoteAdminComponent,
    VoteJuradoComponent,
    VoteItemsComponent,
    ResultUserComponent,
    VoteSelectComponent,
    ResultViewComponent,
    ResultGeneralComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFirestoreModule,
     //Angular Material
     MatToolbarModule,
     MatIconModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatFormFieldModule,
     MatInputModule,
     MatSelectModule,
     MatCardModule,
     MatTableModule,
     MatPaginatorModule,
     MatProgressSpinnerModule,
     MatDialogModule,
     MatSortModule,
     MatGridListModule,
     MatStepperModule,
     MatCheckboxModule,
     MatListModule,
     MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
