import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { signOut } from 'firebase/auth';
import { LoginData } from '../core/models/login-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  id: any;

  constructor(private auth: Auth, public fireAuth: AngularFireAuth) {
    this.user = this.fireAuth.authState;
  }

  login({ email, password }: LoginData) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register({ email, password }: LoginData) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  setId(id: string) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

}