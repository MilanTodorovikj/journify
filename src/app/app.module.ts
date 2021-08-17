import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from "@angular/fire";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { AppComponent } from './app.component';
import {FirebaseService} from "./services/firebase.service";
import {HomeComponent} from "./home/home.component";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./admin-panel/dashbboard/dashboard.component";
import {ShareButtonModule} from "ngx-sharebuttons/button";
import {ShareIconsModule} from "ngx-sharebuttons/icons";
import {HttpClientModule} from "@angular/common/http";
import{CrudService} from "./service/crud.service";
import {SignupComponent} from "./signup/signup.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCtsU_DhJo4PA2SvoYwaabRoR02BJERJ-w",
      authDomain: "seminarska-32d92.firebaseapp.com",
      projectId: "seminarska-32d92",
      storageBucket: "seminarska-32d92.appspot.com",
      messagingSenderId: "132465867790",
      appId: "1:132465867790:web:07df3d1d4312dc6c88505f"
    }),
    RouterModule,
    AppRoutingModule,
    CommonModule,
    ShareButtonModule.withConfig({debug:true}),
    ShareIconsModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [FirebaseService, CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
