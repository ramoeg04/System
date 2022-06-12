import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-list-category',
  templateUrl: './table-list-category.component.html',
  styleUrls: ['./table-list-category.component.scss']
})
export class TableListCategoryComponent implements OnInit {
  items: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.items = firestore.collection('categoria').valueChanges();
   }

  ngOnInit(): void {
    console.log(this.items);
   }

 


}
