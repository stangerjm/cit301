import {Injectable, EventEmitter} from '@angular/core';
import {Document} from "./document";
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class DocumentsService {

  currentDocumentId: string;
  documents: Document[];
  getDocumentsEmitter = new EventEmitter<Document[]>();

  constructor(private http: Http) {
    this.currentDocumentId = '1';
  }

  getDocuments(){
    return this.http.get('http://localhost:3000/documents').map(
      (response: Response) => {
        const documents: Document[] = response.json().obj;
        let transformedDocuments: Document[] = [];
        for(let document of documents){
          transformedDocuments.push(new Document(document.id, document.name, document.description, document.url, null));
        }
        this.documents = transformedDocuments;
        return transformedDocuments;
      }).catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }

  getDocument(idx: number){
    return this.documents[idx];
  }

  deleteDocument(document: Document){
    this.documents.splice(this.documents.indexOf(document), 1);
    return this.http.delete('http://localhost:3000/documents/' + document.id).map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
    //this.storeDocuments();
  }

  addDocument(document: Document){

    const body = JSON.stringify(document);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/documents', body, {headers: headers}).map((response: Response) => {
      const result = response.json();
      const newDocument = new Document(result.obj.id, result.obj.name, result.obj.description, result.obj.url, null);
      this.documents.push(document);
      return document;
    })
      .catch((error: Response) => Observable.throw(error.json()));

    //this.storeDocuments();
  }

  updateDocument(oldDoc: Document, newDoc: Document){
    this.documents[this.documents.indexOf(oldDoc)] = newDoc;
    const body = JSON.stringify(newDoc);
    const headers = new Headers({'Content-Type': 'application/json'})
    return this.http.patch('http://localhost:3000/documents/' + newDoc.id, body, {headers: headers}).map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
    //this.storeDocuments();
  }


  storeDocuments(){
    const body = JSON.stringify(this.documents);
    const header = new Headers({
      'Content-Type' : 'application/json'
    });



    return this.http.put('https://stangerjmcms-4075f.firebaseio.com/documents.json', body, {headers: header}).subscribe();
  }



}
