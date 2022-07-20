import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ServicesSystemService } from '../../../../services/services-system.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { alert, inscription, vote } from 'src/app/core/global';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {

  category: any[] = [];
  division: any[] = [];
  inscriptions: any[] = [];
  voteId: any[] = [];
  voteText = vote;
  id: any;
  totalVote: string = '';

  public add = inscription;
  public alert = alert;
  constructor(private servicesSystem: ServicesSystemService, private toastr: ToastrService, private authService: AuthService, public dialogRef: MatDialogRef<ResultViewComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.id = this.data.data;
    this.get();
    this.getCategory();
    this.getDivision();
    // this.getVote();
    this.getInscriptions();
  }

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  tablelist: any[] = [];
  tablelistVote: any[] = [];
  dataSource = new MatTableDataSource(this.voteId);
  displayedColumns: string[] = ['jurado', 'conexion', 'coreo', 'dificultad', 'iMusical', 'pProyection', 'tiempo', 'tecnica', 'p1', 'p2', 'p3', 'p4', 'total'];

  // getVotes() {
  //   this.servicesSystem.list('vote').subscribe(response => {
  //     if (response.length === 0) {
  //       this.toastr.warning(this.alert.warning);
  //     } else {
  //       response.forEach((data: any) => {
  //         this.vote.push({
  //           id: data.payload.doc.id,
  //           ...data.payload.doc.data()
  //         })
  //         console.log(this.vote, this.vote[0].id_inscriptions.firtName)
  //       })
  //     }
  //   })
  // }

  addForm = new FormGroup({
    date: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required, Validators.minLength(8)],),
    email: new FormControl('', [Validators.required, Validators.email]),
    firtName: new FormControl('', [Validators.required]),
    id_categoria: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    id_division: new FormControl('', [Validators.required])
  })

  voteForm = new FormGroup({
    id_inscriptions: new FormControl('', [Validators.required]),
    conexion: new FormControl('', [Validators.required, Validators.maxLength(1),]),
    coreografia: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    dificultad: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    iMusical: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    pProyeccion: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    tecnica: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    tiempo: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    valid: new FormControl(''),
    user: new FormControl(``),
    total: new FormControl(''),
    p1: new FormControl(''),
    p2: new FormControl(''),
    p3: new FormControl(''),
    p4: new FormControl(''),
  })

  onNoClick(): void {
    this.dialogRef.close();
  }

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

  getInscriptions() {
    this.servicesSystem.list('vote').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.inscriptions.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
        })
        if (this.voteId = this.inscriptions.filter((item: any) => item.id_inscriptions === this.id)) {
          this.dataSource.data = [];
          this.dataSource.data = this.voteId.slice(0);
          this.voteId.forEach(elem => {
            this.totalVote += elem.total
          })
          console.log(this.voteId, this.totalVote)
        }
      }
    })
  }

  get() {
    this.servicesSystem.get(this.id, 'inscriptions').subscribe(response => {
      this.addForm.setValue({
        firtName: response.payload.data()['firtName'],
        id_division: response.payload.data()['id_division'],
        date: response.payload.data()['date'],
        document: response.payload.data()['document'],
        email: response.payload.data()['email'],
        id_categoria: response.payload.data()['id_categoria'],
        lastName: response.payload.data()['lastName']
      })
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // getVote() {
  //   this.servicesSystem.get(this.id, 'vote').subscribe(response => {
  //     this.voteForm.setValue({
  //       id_inscriptions: response.payload.data()['id_inscriptions'],
  //       coreografia: response.payload.data()['coreografia'],
  //       dificultad: response.payload.data()['dificultad'],
  //       iMusical: response.payload.data()['iMusical'],
  //       pProyeccion: response.payload.data()['pProyeccion'],
  //       tecnica: response.payload.data()['tecnica'],
  //       tiempo: response.payload.data()['tiempo'],
  //       valid: response.payload.data()['valid'],
  //       user: response.payload.data()['user'],
  //       total: response.payload.data()['total'],
  //       p1: response.payload.data()['p1'],
  //       p2: response.payload.data()['p2'],
  //       p3: response.payload.data()['p3'],
  //       p4: response.payload.data()['p4']
  //     })
  //   })
  // }
}
