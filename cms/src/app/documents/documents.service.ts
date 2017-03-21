import {Injectable, EventEmitter} from '@angular/core';
import {Document} from "./document";
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';

@Injectable()
export class DocumentsService {

  currentDocumentId: string;
  documents: Document[];
  getDocumentsEmitter = new EventEmitter<Document[]>();

  constructor(private http: Http) {
    this.initDocuments();
    this.currentDocumentId = '1';
  }

  getDocuments(){
    return this.documents;
  }

  getDocument(idx: number){
    return this.documents[idx];
  }

  deleteDocument(document: Document){
    this.documents.splice(this.documents.indexOf(document), 1);
    this.storeDocuments();
  }

  addDocument(document: Document){
    this.documents.push(document);
    this.storeDocuments();
  }

  updateDocument(oldDoc: Document, newDoc: Document){
    this.documents[this.documents.indexOf(oldDoc)] = newDoc;
    this.storeDocuments();
  }

  initDocuments(){
    this.http.get('https://stangerjmcms-4075f.firebaseio.com/documents.json').map(
      (response: Response) => response.json()
    ).subscribe(
      (data: Document[]) => {
        this.documents = data;
        this.getDocumentsEmitter.emit(this.documents);
      }
    );
  }

  storeDocuments(){
    const body = JSON.stringify(this.documents);
    const header = new Headers({
      'Content-Type' : 'application/json'
    });



    return this.http.put('https://stangerjmcms-4075f.firebaseio.com/documents.json', body, {headers: header});
  }



}
