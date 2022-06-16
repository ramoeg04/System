import { Component, Inject, OnInit } from '@angular/core';
import { alert, inscription } from 'src/app/core/global';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesSystemService } from '../../../../services/services-system.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-inscription',
  templateUrl: './view-inscription.component.html',
  styleUrls: ['./view-inscription.component.scss']
})
export class ViewInscriptionComponent implements OnInit {
  category: any[] = [];
  division: any[] = [];
  public add = inscription;
  public alert = alert;
  public id: any;
  constructor(private toastr: ToastrService, public dialogRef: MatDialogRef<ViewInscriptionComponent>, private servicesSystem: ServicesSystemService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getCategory();
    this.getDivision();
      this.id = this.data.data;
      this.get();

  }

  addForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required, Validators.minLength(8)],),
    email: new FormControl('', [Validators.required, Validators.email]),
    firtName: new FormControl('', [Validators.required]),
    id_categoria: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    id_division: new FormControl('', [Validators.required])
  })

  onNoClick(): void {
    this.dialogRef.close();
  }

  getCategory() {
    this.servicesSystem.list('categoria').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.category.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
          // console.log(this.category)
        })
      }
    })
  }


  getDivision() {
    this.servicesSystem.list('division').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.division.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
          // console.log(this.division)
        })
      }
    })
  }

  addData() {
    if (this.data != null) {
      this.edit();
    } else {
      if (this.addForm.valid) {
        this.servicesSystem.add(this.addForm.value, 'inscriptions').then(() => {
          this.onNoClick();
          this.toastr.success(this.alert.success);
        }).catch(error => {
          this.toastr.error(this.alert.error);
          this.addForm.reset()
          console.log(error);
        })
      }
    }
  }

  get() {
    this.servicesSystem.get(this.id, 'inscriptions').subscribe(response => {
      this.addForm.setValue({
        firtName: response.payload.data()['firtName'],
        id_division: response.payload.data()['id_division'],
        date: response.payload.data()['date'],
        document: response.payload.data()['document'],
        email: response.payload.data()['email'],
        id_categoria: response.payload.data()['id_categoria'],
        lastName: response.payload.data()['lastName']
      })
    })
  }



  edit() {
    if (this.addForm.valid) {
      this.servicesSystem.edit(this.id, this.addForm.value, 'inscriptions').then(() => {
        this.onNoClick();
        this.toastr.success(this.alert.success);
      }).catch(error => {
        this.toastr.error(this.alert.error);
        this.addForm.reset();
        console.log(error);
      })
    }
  }



}
