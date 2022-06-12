import { Component, Inject, OnInit } from '@angular/core';
import { ServicesSystemService } from '../../../../services/services-system.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { add, alert } from 'src/app/core/global';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  tablelist: any[] = [];
  public add = add;
  public alert = alert;
  public id: any;

  constructor(private toastr: ToastrService, public dialogRef: MatDialogRef<AddCategoryComponent>, private servicesSystem: ServicesSystemService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.getDivision();
    if (this.data != null) {
      this.id = this.data.data;
      // console.log(this.id)
      this.get();
    };
  }

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id_division: new FormControl('', [Validators.required])
  })

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDivision() {
    this.servicesSystem.list('division').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.tablelist.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
          // console.log(this.tablelist.name)
        })
      }
    })
  }

  addData() {
    if (this.data != null) {
      this.edit();
    } else {
      if (this.addForm.valid) {
        this.servicesSystem.add(this.addForm.value, 'categoria').then(() => {
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
    this.servicesSystem.get(this.id, 'categoria').subscribe(response => {
      this.addForm.setValue({
        name: response.payload.data()['name'],
        id_division: response.payload.data()['id_division']
      })
    })
  }

  edit() {
    if (this.addForm.valid) {
      this.servicesSystem.edit(this.id, this.addForm.value, 'categoria').then(() => {
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
