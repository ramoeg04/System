import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesSystemService } from 'src/app/services/services-system.service';
import { alert, login } from '../../../../core/global';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Division } from '../../../../core/models/division';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewInscriptionComponent } from '../../inscription/view-inscription/view-inscription.component';
import { VoteSelectComponent } from '../vote-select/vote-select.component';

@Component({
  selector: 'app-vote-admin',
  templateUrl: './vote-admin.component.html',
  styleUrls: ['./vote-admin.component.scss']
})
export class VoteAdminComponent implements OnInit {
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  tablelist: any[] = [];
  category: any[] = [];
  division: any[] = [];
  dataSource = new MatTableDataSource(this.tablelist);
  displayedColumns: string[] = ['reference', 'name', 'lastName', 'ver', 'vote'];
  public loginText = login;
  public alert = alert;
  public id: any;

  constructor(public dialog: MatDialog, public servicesSystem: ServicesSystemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tablelist);
    this.tableList();
    // this.id = this.data;
  }

  tableList() {
    this.servicesSystem.list('inscriptions').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.tablelist.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data(),
          }

          )
          this.dataSource.data = [];
          this.dataSource.data = this.tablelist.slice(0);
        })
      }
    })
  }

  load() {
    this.servicesSystem.list('inscriptions').subscribe(response => {
      this.tablelist = [];
      response.forEach((data: any) => {
        this.tablelist.push({
          id: data.payload.doc.id,
          ...data.payload.doc.data()
        })
      });
      this.dataSource.data = [];
      this.dataSource.data = this.tablelist.slice(0);
    })
  }

  view(data: string) {
    if (data != null) {
      const dialogRef = this.dialog.open(ViewInscriptionComponent, {
        data: { data },
      });
      dialogRef.afterClosed().subscribe(result => {
        this.load();
      });
    } else {
      console.log("Error");
      this.toastr.warning(this.alert.warning);

    }
  }

  // this.servicesSystem.list('inscriptions').subscribe(response => {
  //   if (response.length === 0) {
  //     this.toastr.warning(this.alert.warning);
  //   } else {
  //     console.log({ response })
  //     response.forEach(async (data: any) => {
  //       const item = data.payload.doc.data();
  //       console.log(item);
  //       if (!item) {
  //         return;
  //       }
  //       const categoria = await item.id_categoria.get();
  //       const division = await item.id_division.get();
  //       // const penalty = await item.id_penalty.get();

  //       const inscriptionsData = categoria.data();
  //       const itemsData = division.data();
  //       // const penaltyData = items.data();

  //       console.log({ inscriptions: categoria.data(), items: division.data(), firstName: inscriptionsData.name });
  //       this.tablelist.push({
  //         id: data.payload.doc.id,
  //         inscriptions: inscriptionsData,
  //         items: itemsData,
  //         // penalty: penaltyData
  //       })
  //       this.dataSource.data = this.tablelist.slice(0);
  //     })
  //   }
  // })

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  vote(data: string, value: string) {
    if (data != null) {
      const dialogRef = this.dialog.open(VoteSelectComponent, {
        data: { data:data,
        value : value },
      });
      dialogRef.afterClosed().subscribe(result => {
        this.load();
      });
    } else {
      console.log("Error");
      this.toastr.warning(this.alert.warning);

    }
  }

}
