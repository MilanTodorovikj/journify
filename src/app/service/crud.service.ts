import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {ListItem} from "../admin-panel/list-item";
import firebase from "firebase";
import {map} from 'rxjs/operators';
import {User} from "../admin-panel/user";

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public fireservices: AngularFirestore) { }
  createNewPublication(Record: unknown){
    // @ts-ignore
    // @ts-ignore
    return this.fireservices.collection('Publication').doc(Record['id']).set({
      authorId:this.getUid(),
      // @ts-ignore
      content: Record['content'],
      // @ts-ignore
      editContent: Record['editContent'],
      // @ts-ignore
      editTitle: Record['editTitle'],
      // @ts-ignore
      id:Record['id'],
      // @ts-ignore
      isEdit: Record['isEdit'],
      // @ts-ignore
      pub: Record['pub'],
      // @ts-ignore
      title:Record['title'],
      // @ts-ignore
      date:Record['date']
    });
  }


  getUid() {
    console.log(firebase.auth());
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser?.uid;
  }

  getMyPublications(): Observable<ListItem[]>{
    const uid=this.getUid();
    return this.fireservices.collection<ListItem>('Publication', ref => {
      return ref.orderBy('date',"desc")
        .where('authorId', '==', uid);
    }).valueChanges();
  }

  getPublication(id1: string | null):Observable<ListItem>{
    // @ts-ignore
    return this.fireservices.collection('Publication',ref=>{
      return ref
        .where('id', '==', id1);
    }).valueChanges().pipe(
      map(response => response[0])
    );
  }

  getUser(id:string|null):Observable<User>{
    // @ts-ignore
    return this.fireservices.collection('Users',ref=>{
      return ref
        .where('userID', '==', id);
    }).valueChanges().pipe(
      map(response => response[0])
    );
  }

  createNewUser(Record: unknown){
    // @ts-ignore
    // @ts-ignore
    return this.fireservices.collection('Users').doc(Record['userID']).set({
      userID:this.getUid(),
      // @ts-ignore
      email: Record['email'],
      // @ts-ignore
      username: Record['username'],
      // @ts-ignore
      code: Record['code'],
      // @ts-ignore
      name: Record['name'],
      // @ts-ignore
      surname: Record['surname'],
    });
  }

  update_publication(recordid: string, record: Partial<unknown>){
    this.fireservices.doc('Publication/'+recordid).update(record);
  }
  delete_publication(recordid:any){
    this.fireservices.doc('Publication/'+recordid).delete();
  }
}
