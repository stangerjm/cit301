import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Document} from "../document";
import {DocumentsService} from "../documents.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  oldDocument: Document;
  editMode: boolean = false;
  docIdx: number;

  constructor(private ds: DocumentsService,
              private router: Router,
              private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('idx')){
          this.editMode = true;
          this.docIdx = +params['idx'];
          this.oldDocument = this.ds.getDocument(this.docIdx);
        } else{
          this.oldDocument = null;
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(value){
    let newDocument = new Document(null, value.title, value.description, value.documentUrl, null);
    if(this.editMode){
      newDocument.id = this.oldDocument.id;
      this.ds.updateDocument(this.oldDocument, newDocument);
    } else {
      this.ds.addDocument(newDocument);
    }

    this.router.navigate(['documents']);

  }

  onCancel(){
    this.router.navigate(['documents']);
  }

}
