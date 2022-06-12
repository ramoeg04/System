import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesSystemService {

  constructor(private firestore: AngularFirestore) { }

  addDivision( data: any){
    return this.firestore.collection('division').add(data);
  }

  listDivision(): Observable<any>{
    return this.firestore.collection('division').snapshotChanges();
  }

  deleteDivision( id: string): Promise<any> {
    return this.firestore.collection('division').doc(id).delete();
  }

  getDivision( id: string): Observable<any>{
    return this.firestore.collection('division').doc(id).snapshotChanges();
  }

  editDivision( id: string, data: any): Promise<any>{
    return this.firestore.collection('division').doc(id).update(data);
  }
}
