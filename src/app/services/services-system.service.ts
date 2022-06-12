import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesSystemService {
 
  constructor(private firestore: AngularFirestore) { }

  add( data: any, collection: string){
    return this.firestore.collection(`${collection}`).add(data);
  }

  list(collection: string): Observable<any>{
    return this.firestore.collection(`${collection}`).snapshotChanges();
  }

  delete( id: string, collection: string): Promise<any> {
    return this.firestore.collection(`${collection}`).doc(id).delete();
  }

  get( id: string, collection: string): Observable<any>{
    return this.firestore.collection(`${collection}`).doc(id).snapshotChanges();
  }

  edit( id: string, data: any, collection: string): Promise<any>{
    return this.firestore.collection(`${collection}`).doc(id).update(data);
  }

 
}
