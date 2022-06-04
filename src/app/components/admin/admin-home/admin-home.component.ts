import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { homeAdmin } from 'src/app/core/global';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  public homeAdmin: any[] = homeAdmin;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  route(data:string){
    console.log(data);
    this.router.navigate([data]);
  }
        

}
