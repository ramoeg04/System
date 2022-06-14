import { Component, Inject, OnInit } from '@angular/core';
import { add, alert } from 'src/app/core/global';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesSystemService } from '../../../../services/services-system.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  public add = add;
  public alert = alert;
  public id: any;
  constructor(private toastr: ToastrService, public dialogRef: MatDialogRef<AddItemComponent>, private servicesSystem: ServicesSystemService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.id = this.data.data;
      // console.log(this.id)
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
        this.servicesSystem.add(this.addForm.value, 'items').then(() => {
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
    this.servicesSystem.get(this.id, 'items').subscribe(response => {
      this.addForm.setValue({
        name: response.payload.data()['name']
      })
    })
  }

  edit() {
    if (this.addForm.valid) {
      this.servicesSystem.edit(this.id, this.addForm.value, 'items').then(() => {
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
