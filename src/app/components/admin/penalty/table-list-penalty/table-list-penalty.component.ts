import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { alert, login } from 'src/app/core/global';
import { MatDialog } from '@angular/material/dialog';
import { ServicesSystemService } from '../../../../services/services-system.service';
import { ToastrService } from 'ngx-toastr';
import { AddPenaltyComponent } from '../add-penalty/add-penalty.component';

@Component({
  selector: 'app-table-list-penalty',
  templateUrl: './table-list-penalty.component.html',
  styleUrls: ['./table-list-penalty.component.scss']
})
export class TableListPenaltyComponent implements OnInit {
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  tablelist: any[] = [];
  dataSource = new MatTableDataSource(this.tablelist);
  displayedColumns: string[] = ['name','nro', 'editar', 'eliminar'];
  spiner: Boolean = false;
  public loginText = login
  public alert = alert

  constructor(public dialog: MatDialog, public servicesSystem: ServicesSystemService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tablelist);
    this.tableList();
  }

  tableList() {
    this.servicesSystem.list('penalty').subscribe(response => {
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
    this.servicesSystem.list('penalty').subscribe(response => {
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
    this.servicesSystem.delete(data, 'penalty').then(() => {
      this.toastr.success(this.alert.success);
      this.load();
    }).catch(error => {
      console.log(error);
    })

  }

  edit(data: string) {
    if (data != null) {
      const dialogRef = this.dialog.open(AddPenaltyComponent, {
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
    const dialogRef = this.dialog.open(AddPenaltyComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }


}
