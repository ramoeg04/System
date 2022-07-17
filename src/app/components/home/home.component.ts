import { Component, OnInit } from '@angular/core';
import { admin, alert, csm, result, rol, votar } from 'src/app/core/global';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  public alert = alert;

  fontStyle?: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}


}
