import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { homeAdmin } from 'src/app/core/global';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../user/add-user/add-user.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  public homeAdmin: any[] = homeAdmin;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  route(data: string) {
    // console.log(data);
    if (data == 'Usuario') {
      this.add()
    } else {
      this.router.navigate([data]);
    }
  }

  add() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
