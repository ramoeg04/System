import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


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
import { EditDivisionComponent } from './components/admin/division/edit-division/edit-division.component';
import { TableListCategoryComponent } from './components/admin/category/table-list-category/table-list-category.component';
import { AddCategoryComponent } from './components/admin/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/admin/category/edit-category/edit-category.component';



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
    EditDivisionComponent,
    TableListCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
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
     MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
