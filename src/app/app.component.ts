import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "./services/firebase.service";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'seminarska';
  isSignedIn = false

  constructor(public firebaseService: FirebaseService,
              ) {
  }

  ngOnInit() {
    if(localStorage.getItem('user') !== null)
      this.isSignedIn = true
    else
      this.isSignedIn = false
  }
}
