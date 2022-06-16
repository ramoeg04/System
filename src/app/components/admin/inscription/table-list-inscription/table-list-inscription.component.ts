import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { alert, login } from 'src/app/core/global';
import { MatDialog } from '@angular/material/dialog';
import { ServicesSystemService } from 'src/app/services/services-system.service';
import { ToastrService } from 'ngx-toastr';
import { AddInscriptionComponent } from '../add-inscription/add-inscription.component';
import { ViewInscriptionComponent } from '../view-inscription/view-inscription.component';

@Component({
  selector: 'app-table-list-inscription',
  templateUrl: './table-list-inscription.component.html',
  styleUrls: ['./table-list-inscription.component.scss']
})
export class TableListInscriptionComponent implements OnInit {
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  category: any[] = [];
  division: any[] = [];
  tablelist: any[] = [];
  dataSource = new MatTableDataSource(this.tablelist);
  displayedColumns: string[] = ['name', 'lastName', 'categoria', 'division', 'ver', 'editar', 'eliminar'];
  spiner: Boolean = false;
  public loginText = login
  public alert = alert

  constructor(public dialog: MatDialog, public servicesSystem: ServicesSystemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tablelist);
    this.tableList();
  }

  tableList() {
    this.servicesSystem.list('inscriptions').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.tablelist.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
          // console.log(this.tablelist)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(data: string) {
    this.servicesSystem.delete(data, 'inscriptions').then(() => {
      this.toastr.success(this.alert.success);
      this.load();
    }).catch(error => {
      console.log(error);
    })

  }

  edit(data: string) {
    if (data != null) {
      const dialogRef = this.dialog.open(AddInscriptionComponent, {
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

  add() {
    const dialogRef = this.dialog.open(AddInscriptionComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }

}
