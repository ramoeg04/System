import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { add } from 'src/app/core/global';
import Swal from 'sweetalert2'
import { ServicesSystemService } from '../../../../services/services-system.service';

@Component({
  selector: 'app-add-division',
  templateUrl: './add-division.component.html',
  styleUrls: ['./add-division.component.scss']
})
export class AddDivisionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDivisionComponent>, private servicesSystem: ServicesSystemService) { }
  public add = add;

  addForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addDivision() {
    if (this.addForm.valid) {
      this.servicesSystem.addDivision(this.addForm.value).then(() => {
        this.onNoClick();
        this.alertSuccess();
      }).catch(error => {
        this.alertError();
        this.addForm.reset()
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
