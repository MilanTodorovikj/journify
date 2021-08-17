import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false
  constructor(public firebaseAuth: AngularFireAuth) { }

  async singin(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email,password)
      .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  async signup(email: string, password: string){
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
      .then(res=>{
      this.isLoggedIn = true
      localStorage.setItem('user',JSON.stringify(res.user))
    })
  }

  logout(){
    this.firebaseAuth.signOut().then()
    localStorage.removeItem('user')

  }
}