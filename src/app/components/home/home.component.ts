import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { admin, csm, result, rol, votar } from 'src/app/core/global';

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
  constructor() { }

  ngOnInit(): void {
  }

  
}
