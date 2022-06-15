import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { add, alert, login } from 'src/app/core/global';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public loginText = login;
  public alert = alert;
  public add = add;

  constructor(private authService: AuthService, private toastr: ToastrService, public dialogRef: MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  login() {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value).then(() => {
        // console.log("Valido");
        // this.router.navigate(['home']);
        this.toastr.success(this.alert.success);      

        this.loginForm.reset()
      }).catch((error) => {
        this.toastr.error(this.alert.error);      

        console.log(error)
      })
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
