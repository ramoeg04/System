import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { alert, csf, login } from 'src/app/core/global';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginText = login;
  public csf = csf;
  public alert = alert;

  constructor(private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).then((data: any) => {
        this.authService.setId(data.user.email);
        this.router.navigate(['4465']);
        this.toastr.success(this.alert.success);
      }).catch((error) => {
        console.log(error)
        this.toastr.error(this.alert.error);
        this.loginForm.reset()
      })
    }
  }

}
