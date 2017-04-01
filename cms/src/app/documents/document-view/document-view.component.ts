import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Document} from "../document";
import {DocumentsService} from "../documents.service";
import {Router, ActivatedRoute} from "@angular/router";
import {WindRefService} from "../../wind-ref.service";

@Component({
  selector: 'cms-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  documentIdx: number;
  document: Document;
  nativeWindow: any;

  constructor(private ds: DocumentsService,
              private router: Router,
              private route: ActivatedRoute,
              private winRef: WindRefService) {

    this.nativeWindow = winRef.getNativeWindow();
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.documentIdx = params['idx']
        this.document = this.ds.getDocument(this.documentIdx);
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onView(){
    if(!this.document){
      return;
    }

    let currentUrl = this.document.url;
    this.nativeWindow.open(currentUrl);
  }

  onDelete(){
    this.ds.deleteDocument(this.document).subscribe(
      result => console.log(result)
    );
    this.router.navigate(['/documents']);
  }

}
