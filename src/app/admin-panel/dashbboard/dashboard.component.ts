import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import {FirebaseService} from "../../services/firebase.service";
import {ListItem} from "../list-item";
import {PublicationService} from "../../publication.service";
import {CrudService} from "../../service/crud.service";
import {timer} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  isSignedIn = true
  selectedPublication?: ListItem;

  publications: ListItem[]= [];
  constructor(public firebaseService: FirebaseService,
              public crudService:CrudService) {
  }
  ngOnInit() {
    timer(700).subscribe(() => {
      this.crudService.getMyPublications().subscribe(data => {
        this.publications = data.slice(0, 4);
      });
    });
  }

}
