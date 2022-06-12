import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { add, alert } from 'src/app/core/global';
import Swal from 'sweetalert2'
import { ServicesSystemService } from '../../../../services/services-system.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.scss']
})
export class AddDivisionComponent implements OnInit {

  constructor(private toastr: ToastrService, public dialogRef: MatDialogRef<AddDivisionComponent>, private servicesSystem: ServicesSystemService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  public add = add;
  public alert = alert;
  public id: any;

  ngOnInit(): void {

    if (this.data != null) {
      this.id = this.data.data;
      console.log(this.id)
      this.get();
    }
  }

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })

  onNoClick(): void {
    this.dialogRef.close();
  }

  addDivision() {
    if (this.data != null) {
      this.edit();
     } else {
      if (this.addForm.valid) {
        this.servicesSystem.add(this.addForm.value, 'division').then(() => {
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
    this.servicesSystem.get(this.id, 'division').subscribe(response => {
      this.addForm.setValue({
        name: response.payload.data()['name']
      })
    })
  }

  edit() {
    if (this.addForm.valid) {
      this.servicesSystem.edit(this.id, this.addForm.value, 'division').then(() => {
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
