import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { login } from 'src/app/core/global';
import { MatDialog } from '@angular/material/dialog';
import { EditDivisionComponent } from '../edit-division/edit-division.component';
import { AddDivisionComponent } from '../add-division/add-division.component';
import { Division } from '../../../../core/models/division';
import { ServicesSystemService } from 'src/app/services/services-system.service';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2'

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Bachata', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Casino', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Salsa', weight: 6.941, symbol: 'Li'}, 
// ];

@Component({
  selector: 'app-table-list-division',
  templateUrl: './table-list-division.component.html',
  styleUrls: ['./table-list-division.component.scss']
})

export class TableListDivisionComponent implements OnInit {

  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;

  tablelist: Division[] = [];
  dataSource = new MatTableDataSource(this.tablelist);
  displayedColumns: string[] = ['name', 'editar', 'eliminar'];
  spiner: Boolean = false;
  public loginText = login;

  constructor(public dialog: MatDialog, public servicesSystem: ServicesSystemService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.tablelist);
    this.tableList();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  tableList() {
    this.servicesSystem.listDivision().subscribe(response => {
      if (response.length === 0) {
        this.alertError()
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
    this.servicesSystem.listDivision().subscribe(response => {
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
    this.servicesSystem.deleteDivision(data).then(() => {
      this.alertSuccess()
      this.load();
    }).catch(error => {
      console.log(error);
    })

  }

  edit(data: string) {
    if(data != null){
      const dialogRef = this.dialog.open(EditDivisionComponent, {
        data: {data},
      });
      dialogRef.afterClosed().subscribe(result => {
        this.load();
      });
    }else{
      console.log("Error");
    }
  }

  add() {
    const dialogRef = this.dialog.open(AddDivisionComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.load();
    });
  }


  alertError() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'warning',
      title: "No Hay Data"
    })
  }

  alertSuccess() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Borrado con Exito'
    })
  }


}
