import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { add } from 'src/app/core/global';
import { ServicesSystemService } from 'src/app/services/services-system.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-division',
  templateUrl: './edit-division.component.html',
  styleUrls: ['./edit-division.component.scss']
})
export class EditDivisionComponent implements OnInit {

  constructor(public servicesSystem: ServicesSystemService, public dialogRef: MatDialogRef<EditDivisionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  public add = add;
  public id = this.data.data;
  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
    this.get();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get() {
    this.servicesSystem.getDivision(this.id).subscribe(response => {
      this.editForm.setValue({
        name: response.payload.data()['name']
      })
    })
  }

  edit() {
    if (this.editForm.valid) {
      this.servicesSystem.editDivision(this.id, this.editForm.value).then(() => {
        this.onNoClick();
        this.alertSuccess();
      }).catch(error => {
        this.alertError();
        this.editForm.reset();
        console.log(error);
      })
    }
  }

  alertSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: this.add.alerta
    })
  }
  alertError() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'warning',
      title: 'Error: ' + this.add.error
    })
  }
}
