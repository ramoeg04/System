import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { alert, login } from 'src/app/core/global';
import { ServicesSystemService } from 'src/app/services/services-system.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResultViewComponent } from '../../view/result-view/result-view.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-result-user',
  templateUrl: './result-user.component.html',
  styleUrls: ['./result-user.component.scss']
})
export class ResultUserComponent implements OnInit {
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  tablelist: any[] = [];
  tablelistVote: any[] = [];
  dataSource = new MatTableDataSource(this.tablelist);
  displayedColumns: string[] = ['reference', 'name', 'lastName', 'ver'];
  public loginText = login;
  public alert = alert;
  public id: any;

  constructor(public servicesSystem: ServicesSystemService, private toastr: ToastrService, public dialog: MatDialog) { }

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
      const dialogRef = this.dialog.open(ResultViewComponent, {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
