import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { identity } from 'rxjs';
import { alert, inscription, vote } from 'src/app/core/global';
import { AuthService } from 'src/app/services/auth.service';
import { ServicesSystemService } from 'src/app/services/services-system.service';

@Component({
  selector: 'app-vote-items',
  templateUrl: './vote-items.component.html',
  styleUrls: ['./vote-items.component.scss']
})
export class VoteItemsComponent implements OnInit {
  public user: string = '';
  public id: string = '';

  public p1: number = 0;
  public p2: number = 0;
  public p3: number = 0;
  public p4: number = 0;
  public total: number = 0;

  category: any[] = [];
  division: any[] = [];
  votes: any[] = [];
  voteId: any[] = [];

  public vote = vote;
  public add = inscription;
  public alert = alert;

  constructor(private servicesSystem: ServicesSystemService, private toastr: ToastrService, private authService: AuthService, public dialogRef: MatDialogRef<VoteItemsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.user = this.authService.getId();
    this.get();
    this.getvotes()
    this.getCategory();
    this.getDivision();
  }

  addForm = new FormGroup({
    date: new FormControl(''),
    document: new FormControl(''),
    email: new FormControl(''),
    firtName: new FormControl(''),
    id_categoria: new FormControl(''),
    lastName: new FormControl(''),
    reference: new FormControl(''),
    id_division: new FormControl('')
  })

  voteForm = new FormGroup({
    id_inscriptions: new FormControl(`${this.data}`, [Validators.required]),
    conexion: new FormControl('', [Validators.required, Validators.maxLength(1),]),
    coreografia: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    dificultad: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    iMusical: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    pProyeccion: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    tecnica: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    tiempo: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    valid: new FormControl('false'),
    user: new FormControl(`${this.user}`),
    total: new FormControl(''),
    p1: new FormControl(''),
    p2: new FormControl(''),
    p3: new FormControl(''),
    p4: new FormControl(''),
  })

  getCategory() {
    this.servicesSystem.list('categoria').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.category.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
        })
      }
    })
  }

  getDivision() {
    this.servicesSystem.list('division').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.division.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
        })
      }
    })
  }

  getvotes() {
    this.servicesSystem.list('vote').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.votes.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
        })
        if (this.voteId = this.votes.filter((item: any) => item.valid === "true")) {
          this.id = this.voteId[0].id
        }
      }
    })
  }

  get() {
    this.servicesSystem.get(this.data, 'inscriptions').subscribe(response => {
      this.addForm.setValue({
        firtName: response.payload.data()['firtName'],
        id_division: response.payload.data()['id_division'],
        date: response.payload.data()['date'],
        document: response.payload.data()['document'],
        email: response.payload.data()['email'],
        id_categoria: response.payload.data()['id_categoria'],
        lastName: response.payload.data()['lastName'],
        reference: response.payload.data()['reference']
      })
    })
  }

  getVote() {
    this.servicesSystem.list('vote').subscribe(response => {

      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.votes.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
        })
        if (this.voteId = this.votes.filter((item: any) => item.id_inscriptions === this.data)) {
          let tiempo = this.votes[0].tiempo
          let conexion = this.votes[0].conexion
          let dificultad = this.votes[0].dificultad
          let iMusical = this.votes[0].iMusical
          let pProyeccion = this.votes[0].pProyeccion
          let tecnica = this.votes[0].tecnica
          let coreografia = this.votes[0].coreografia
          let p1 = this.votes[0].p1
          let p2 = this.votes[0].p2
          let p3 = this.votes[0].p3
          let p4 = this.votes[0].p4
          let sum = tiempo + conexion + dificultad + iMusical + pProyeccion + tecnica + coreografia
          let rest = p1 + p2 + p3 + p4
          this.total = sum - rest
          console.log(this.total);
        }
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addVote() {
    const data = this.voteForm.value
    data.user = this.user
    data.p1 = this.p1
    data.p2 = this.p2
    data.p3 = this.p3
    data.p4 = this.p4

    if (this.voteForm.valid) {
      this.servicesSystem.edit(this.id, data, 'vote').then(() => {
        this.onNoClick();
        this.toastr.success(this.alert.success);
        this.getVote();
        setTimeout(() => {
          console.log(this.total);
        }, 3000);

        setTimeout(() => {
          data.total = this.total
          this.servicesSystem.edit(this.id, data, 'vote').then(() => {
            console.log('acept');
          }).catch(error => {
            console.log(error);
          })
        }, 3000);
      }).catch(error => {
        this.toastr.error(this.alert.error);
        this.addForm.reset()
        console.log(error);
      })
    }
  }

  penals(value: number, name: string) {
    if (name === '1') {
      this.p1 += value
    } else if (name === '2') {
      this.p2 = value
    } else if (name === '3') {
      this.p3 = value
    } else if (name === '4') {
      this.p4 = value
    }
  }

}
