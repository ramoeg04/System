import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { csf, login } from 'src/app/core/global';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public loginText = login;
  public csf = csf;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  login() {
    if (this.loginForm.valid) {
      this.authService.register(this.loginForm.value).then(()=>{
      // console.log("Valido");
      // this.router.navigate(['home']);
      // this.alertSuccess();
      // }, (error)=>{
      //   this.alertError();
      this.loginForm.reset()
      }).catch((error)=> {
        console.log(error)
      })
    }
  }

  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }
}
