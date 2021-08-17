import { Component, OnInit} from '@angular/core';
import {ListItem} from "../list-item";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {PublicationService} from "../../publication.service";
import {CrudService} from "../../service/crud.service";
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";
import {User} from "../user";



@Component({
  selector: 'publication-content',
  templateUrl: './publication-content.component.html',
  styleUrls: ['./publication-content.component.css']
})

export class PublicationContentComponent implements OnInit{
  publication: ListItem | undefined;
  users: User|undefined;
  constructor(
    private route: ActivatedRoute,
    private publicationService: PublicationService,
    private location: Location,
    public crudService:CrudService,
  ) {}
  ngOnInit() {
    this.getPublication();
  }
  getPublication(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.publicationService.getPublication(id)
      .subscribe(publication => {
        console.log(publication);
        this.publication = publication;
      });
  }
  getUsername(id:string|null):string {
    this.crudService.getUser(id)
      .subscribe(user => {
        console.log(user);
        this.users = user;
      });
    return <string>this.users?.username;
  }
  getCode(id:string|null):string{
    this.crudService.getUser(id)
      .subscribe(user => {
        console.log(user);
        this.users = user;
      });
    return <string>this.users?.code;
  }
  goBack(): void {
    this.location.back();
  }

  editRecord(Record: { isEdit: boolean; editTitle: unknown; title: unknown; editContent: unknown; content: unknown; }){
    Record.isEdit=true;
    Record.editTitle= Record.title;
    Record.editContent= Record.content;
  }

  deleteRecord(recordId: any){
    this.crudService.delete_publication(recordId);
  }
  getUid() {
    return firebase.auth().currentUser?.uid
  }
}
