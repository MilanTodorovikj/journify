import { Injectable } from '@angular/core';
import {ListItem} from "./admin-panel/list-item";
import {ListItems} from "./admin-panel/mock-list-items";
import {Observable, of } from "rxjs";
import {FirebaseService} from "./services/firebase.service";
import {CrudService} from "./service/crud.service";

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  constructor(public firebaseService: FirebaseService,
              public crudService:CrudService) { }

  getPublications(): Observable<ListItem[]> {
    const publications = of(ListItems);
    return publications;
  }

  getPublication(id: string | null) {
    return this.crudService.getPublication(id);
  }
}
