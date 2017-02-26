import {Component, OnInit, Input, OnDestroy} from '@angular/core';

import { Contact } from '../contact';
import {Subscription} from "rxjs";
import {ContactsService} from "../contacts.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit, OnDestroy {

  @Input() selectedContact: Contact;
  private subscription: Subscription;
  private contactIdx: number;
  private contact: Contact;

  constructor(private contactGroup: Contact[],
              private contactService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.contactIdx = params['id'];
        this.selectedContact = this.contactService.getContact(this.contactIdx);
        this.contactGroup = this.selectedContact.group;
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
