import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { admin, csm, result, rol, votar } from 'src/app/core/global';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public rolUser = rol;
  public csm = csm;
  public admin = admin;
  public votar = votar;
  public result = result;
  fontStyle?: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  this.rol();

  }
  
  rol(){
    const text = this.authService.getId();
    if(text.includes('jurado')){
      this.rolUser = 'Jurado';
    }else if(text.includes('admin')){
      this.rolUser = 'Admin';
    }else if(text.includes('user')){
      this.rolUser = 'User';
    }else{
      this.rolUser = 'NADA';
    }
  }
  
}
