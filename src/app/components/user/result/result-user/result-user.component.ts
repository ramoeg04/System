import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { alert, login } from 'src/app/core/global';
import { ServicesSystemService } from 'src/app/services/services-system.service';

@Component({
  selector: 'app-result-user',
  templateUrl: './result-user.component.html',
  styleUrls: ['./result-user.component.scss']
})
export class ResultUserComponent implements OnInit {

  category: any[] = [];
  division: any[] = [];
  votes: any[] = [];
  vote: any[] = [];
  public loginText = login;
  public alert = alert;
  total: number = 0;

  constructor(public servicesSystem: ServicesSystemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getVotes();
  }

  getVotes() {
    this.servicesSystem.list('vote').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.vote.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
          console.log(this.vote, this.vote[0].id_inscriptions.firtName)
        })
      }
    })
  }








}
