import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {ListItem} from "../list-item";
import {PublicationService} from "../../publication.service";
import {ListViewComponent} from "../list-view/list-view.component";
import {CrudService} from "../../service/crud.service";
import firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-dashboard',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit{
  isSignedIn = true
  selectedPublication?: ListItem;
  publication: {isEdit:boolean; editTitle:unknown; title: unknown; editContent:unknown; content: unknown; id: string; pub: boolean; authorId:string; documentID:string;}[] | undefined;
  publicationTitle= "";
  publicationContent= "";
  message="";
  publications: ListItem[]= [];
  isEdit = false;
  publicationPublic=true;
  private pastRecord: any;
  constructor(public firebaseService: FirebaseService,
              private publicationService: PublicationService,
              public crudService:CrudService,
              public fireservices: AngularFirestore) {
  }
  getPublications(): void{
    this.publicationService.getPublications()
      .subscribe(publications => this.publications= publications.slice(0, 4));
  }
  getUid() {
    // this.afAuth.auth.currentUser.uid;
    // @ts-ignore
    return firebase.auth().currentUser.uid;
  }
  getRandomString(length:Number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
      result += randomChars. charAt(Math. floor(Math. random() * randomChars. length));
    }
    return result;
  }
  CreatePublication(){
    let Record = {};
    // @ts-ignore
    Record['title'] = this.publicationTitle;
    // @ts-ignore
    Record['content'] = this.publicationContent;
    // @ts-ignore
    Record['isEdit']=false;
    // @ts-ignore
    Record['editTitle']= this.publicationTitle;
    // @ts-ignore
    Record['editContent']= this.publicationContent;
    // @ts-ignore
    Record['pub']= this.publicationPublic;
    // @ts-ignore
    Record['authorId']=this.getUid();
    // @ts-ignore
    Record['id']= this.isEdit ? this.publication.id : this.getRandomString(20);
    // Record['id']= this.isEdit ? this.afs.createId() : this.getRandomString(20);
    let today=new Date().toLocaleDateString("en-us");
    // @ts-ignore
    Record['date']=today;
    this.crudService.createNewPublication(Record).then((res: any) => {
      this.publicationTitle="";
      this.publicationContent="";
      console.log(res);

      this.message="Publication created";

    }).catch((error: any) => {
      console.log(error);
    })
  }
  ngOnInit() {
    this.getPublications();
    //
    // this.activeRoute.params.subscribe(params => {
    //   if(params['id']) {
    //     isEdit = true;
    //     this.getPublication()
    //   }
    // })
  }

}
