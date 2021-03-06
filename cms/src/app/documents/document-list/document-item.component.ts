import {Component, OnInit, Input} from '@angular/core';
import {Document} from "../document";

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: Document;
  @Input() documentIdx: number;

  constructor() { }

  ngOnInit() {
  }

}
