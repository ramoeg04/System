import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { alert } from 'src/app/core/global';
import { AuthService } from 'src/app/services/auth.service';
import { ServicesSystemService } from 'src/app/services/services-system.service';
import { VoteItemsComponent } from '../vote-items/vote-items.component';

@Component({
  selector: 'app-vote-jurado',
  templateUrl: './vote-jurado.component.html',
  styleUrls: ['./vote-jurado.component.scss']
})
export class VoteJuradoComponent implements OnInit {


  constructor(public dialog: MatDialog, private servicesSystem: ServicesSystemService, private toastr: ToastrService, private authService: AuthService) { }
  public alert = alert;
  tablelist: any[] = [];
  votes: any[] = [];
  voteId: any[] = [];
  voteT: any[] = [];
  user: string = 'NADA'
  vote: string = ''
  id: string = '';
  public total: number = 0;

  ngOnInit(): void {
    this.tableList();
    this.user = this.authService.getId();
  }

  tableList() {
    this.servicesSystem.list('vote').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
        this.vote = ''
      } else {
        response.forEach((data: any) => {
          this.tablelist.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data(),
          })
        })
      }
    })
  }

  getId(data: string) {
    if (data != null) {
      const dialogRef = this.dialog.open(VoteItemsComponent, {
        data: data,
      });
      dialogRef.afterClosed().subscribe(result => {
        // console.log(result);
        this.tableList();
      });
    } else {
      console.log("Error");
      this.toastr.warning(this.alert.warning);
    }
  }



}
