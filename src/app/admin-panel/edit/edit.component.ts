import { Component, OnInit} from '@angular/core';
import {ListItem} from "../list-item";
import {PublicationService} from "../../publication.service";
import {CrudService} from "../../service/crud.service";
import firebase from "firebase";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit{
  publication: ListItem | undefined;
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

  goBack(): void {
    this.location.back();
  }

  deleteRecord(recordId: any){
    this.crudService.delete_publication(recordId);
  }

  getUid() {
    return firebase.auth().currentUser?.uid;
  }

  updateRecord(recorddata:any){
    let record={};
    // @ts-ignore
    record['title']=recorddata.title;
    // @ts-ignore
    record['content']=recorddata.content;
    // @ts-ignore
    record['pub']=recorddata.pub;
    let today=new Date().toLocaleDateString("en-us");
    // @ts-ignore
    record['date']=today;
    this.crudService.update_publication(recorddata.id,record);
    recorddata.isEdit=false;
  }
}
