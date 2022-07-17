import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { admin, alert, csf, csm, result, resultUser, rol, votar, votarJurado } from 'src/app/core/global';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  public csf = csf;
  public rolUser = rol;
  public csm = csm;
  public admin = admin;
  public votar = votar;
  public result = result;
  public votarJurado = votarJurado;
  public resultUser = resultUser;
  public alert = alert;

  fontStyle?: any;
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.rol()
  }

  rol() {
    const text = this.authService.getId();
    if (text === 'undefined' ){
      this.rolUser = '';
      console.log(text)
      this.toastr.warning(this.alert.warning);
    }

    if (text.includes('jurado')) {
      this.rolUser = 'Jurado';
    }else
    if (text.includes('admin')) {
      this.rolUser = 'Admin';
    }else
    if (text.includes('user')) {
      this.rolUser = 'User';
    }
  }


  logout() {
    this.authService
      .logout()
      .then(() => this.router.navigate(['/']))
      .catch((e) => console.log(e.message));
  }
}
