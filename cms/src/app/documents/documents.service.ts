import { Injectable } from '@angular/core';
import {Document} from "./document";
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentsService {

  documents: Document[];

  getDocuments(){
    this.documents =  MOCKDOCUMENTS;
    return this.documents;
  }

  getDocument(idx: number){
    return this.documents[idx];
  }

  constructor() { }

}
