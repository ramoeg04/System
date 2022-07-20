import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicesSystemService } from '../../../../services/services-system.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { alert } from 'src/app/core/global';

@Component({
  selector: 'app-vote-select',
  templateUrl: './vote-select.component.html',
  styleUrls: ['./vote-select.component.scss']
})
export class VoteSelectComponent implements OnInit {
  public alert = alert;

  constructor(public dialog: MatDialog, public servicesSystem: ServicesSystemService, private toastr: ToastrService, public dialogRef: MatDialogRef<VoteSelectComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  vote() {
    let data = this.data.data;
    let valid = this.data.value
    let addForm = new FormGroup({
      valid: new FormControl(`${valid}`, [Validators.required]),
      id_inscriptions: new FormControl(`${data}`, [Validators.required])
    })

    this.servicesSystem.add(addForm.value, 'vote').then(() => {
      this.toastr.success(this.alert.success);
    }).catch(error => {
      this.toastr.error(this.alert.error);
      console.log(error);
    })
  }

}
