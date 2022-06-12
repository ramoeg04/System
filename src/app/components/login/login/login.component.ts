import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { csf, login } from 'src/app/core/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginText = login;
  public csf = csf;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  login() {
    if (this.loginForm.valid) {
      // this.loginServices.login(this.loginForm.value).subscribe(result=>{
      console.log("Valido");
      this.router.navigate(['4465']);
      this.alertSuccess();
      // }, (error)=>{
      //   this.alertError();
      this.loginForm.reset()
      // })
    } else {
      this.alertError();
      this.loginForm.reset()
    }
  }

  alertSuccess() {
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
      icon: 'success',
      title: 'Signed in successfully'
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
      title: 'Error: ' + this.loginText.error
    })
  }



}
