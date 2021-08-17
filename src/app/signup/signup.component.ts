import { Component, OnInit} from '@angular/core';
import {FirebaseService} from "../services/firebase.service";
import {Router} from "@angular/router";
import firebase from "firebase";
import {CrudService} from "../service/crud.service";

@Component({
  selector: 'app-home',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  isSignedIn = false
  usernameSignup="";
  emailSignup="";
  passwordSignup="";
  name="";
  surname="";
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
    // @ts-ignore
    return firebase.auth().currentUser.uid;
  }
  getRandomString(length:Number) {
    var randomChars = '0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
      result += randomChars. charAt(Math. floor(Math. random() * randomChars. length));
    }
    return result;
  }
  async onSignup(name:string,surname:string,username:string, email: string, password: string){
    await this.firebaseService.signup(email,password)
    if(this.firebaseService.isLoggedIn)
      this.signInUser();
      let Record = {};
      // @ts-ignore
      Record['email'] = email;
      // @ts-ignore
      Record['userID'] = this.getUid();
      // @ts-ignore
      Record['username']=username;
      // @ts-ignore
      Record['name']=name;
      // @ts-ignore
      Record['surname']=surname;
      // @ts-ignore
      Record['code']= this.getRandomString(4);
      this.crudService.createNewUser(Record).then((res: any) => {
        this.usernameSignup="";
        this.emailSignup="";
        this.passwordSignup="";
        this.name="";
        this.surname="";
        console.log(res);
      }).catch((error: any) => {
        console.log(error);
      })
  }

  signInUser() {
    this.isSignedIn = true;
    this.router.navigate(['/admin']).then();
  }

}
