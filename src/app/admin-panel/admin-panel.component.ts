import { Component, OnInit} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import {Router} from "@angular/router";
import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(public firebaseService: FirebaseService,
              private router: Router) { }

  ngOnInit(): void {
  }

  getUid() {
    // @ts-ignore
    firebase.auth().currentUser.uid
  }

  logout(){
    this.firebaseService.logout();
    this.router.navigate(['/home']).then();
  }
}
