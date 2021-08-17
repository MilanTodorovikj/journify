import { Component, OnInit} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import {Router} from "@angular/router";
import firebase from "firebase";
import {CrudService} from "../service/crud.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  isSignedIn = false
  constructor(public firebaseService: FirebaseService,
              private router: Router,
              public crudService:CrudService) {
  }
  ngOnInit() {
    if(localStorage.getItem('user') !== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false

  }
  getUid() {
    return firebase.auth().currentUser?.uid;
  }

  async onSignin(email: string, password: string){
    await this.firebaseService.singin(email,password)
    if(this.firebaseService.isLoggedIn) {
      this.signInUser();
    }
  }

  signInUser() {
    this.isSignedIn = true;
    this.router.navigate(['/admin']).then();
  }

}
