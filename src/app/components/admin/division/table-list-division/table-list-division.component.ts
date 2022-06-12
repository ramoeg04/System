import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { alert, login } from 'src/app/core/global';
import { MatDialog } from '@angular/material/dialog';
import { AddDivisionComponent } from '../add-division/add-division.component';
import { Division } from '../../../../core/models/division';
import { ServicesSystemService } from 'src/app/services/services-system.service';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-table-list-division',
  templateUrl: './table-list-division.component.html',
  styleUrls: ['./table-list-division.component.scss']
})

export class TableListDivisionComponent implements OnInit {
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  tablelist: Division[] = [];
  dataSource = new MatTableDataSource(this.tablelist);
  displayedColumns: string[] = ['name', 'editar', 'eliminar'];
  spiner: Boolean = false;
  public loginText = login;
  public alert = alert;

  constructor(public dialog: MatDialog, public servicesSystem: ServicesSystemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tablelist);
    this.tableList();
  }

  tableList() {
    this.servicesSystem.list('division').subscribe(response => {
      if (response.length === 0) {
        this.toastr.warning(this.alert.warning);
      } else {
        response.forEach((data: any) => {
          this.tablelist.push({
            id: data.payload.doc.id,
            ...data.payload.doc.data()
          })
          this.dataSource.data = [];
          this.dataSource.data = this.tablelist.slice(0);
        })
      }
    })
  }

  load() {
    this.servicesSystem.list('division').subscribe(response => {
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
    this.servicesSystem.delete(data, 'division').then(() => {
      this.toastr.success(this.alert.success);
      this.load();
    }).catch(error => {
      console.log(error);
    })

  }

  edit(data: string) {
    if (data != null) {
      const dialogRef = this.dialog.open(AddDivisionComponent, {
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
    const dialogRef = this.dialog.open(AddDivisionComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }
}
