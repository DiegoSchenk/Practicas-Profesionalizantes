import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection("test").get().subscribe((res:any) => {
      //console.log(data.docs);
      res.forEach((doc:any) => {
        console.log(doc.id, "=>", doc.data() )
      })
    });
   }

   public getAll(collectionName: string) {
    return this.firestore.collection(collectionName).get();
  }

  public getById(collectionName: string, id: string) {
    return this.firestore.collection(collectionName).doc(id).get(); 
  }

}
