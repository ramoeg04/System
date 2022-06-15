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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
