import { Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {ListItem} from "../list-item";
import {PublicationService} from "../../publication.service";
import {CrudService} from "../../service/crud.service";
import firebase from "firebase";
import {User} from "../user";
import {timer} from "rxjs";


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})

export class ListViewComponent implements OnInit{
  selectedPublication?: ListItem;
  publication: {isEdit:boolean; editTitle:unknown; title: unknown; editContent:unknown; content: unknown; id: string; pub: boolean; authorId:string;}[] | undefined;
  // @ts-ignore
  users: User=[];
  publications: ListItem[]= [];
  constructor(public firebaseService: FirebaseService,
              private publicationService: PublicationService,
              public crudService:CrudService) {
  }
  getUid() {
    return firebase.auth().currentUser?.uid;
  }

  ngOnInit() {
    timer(700).subscribe(() => {
      this.crudService.getMyPublications().subscribe(data =>{
        this.publications = data;
      });
      }
    );
  }
}
