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

  private subscription: Subscription;
  contactIdx: number;
  contact: Contact;
  contactGroup: Contact[];

  constructor(private contactService: ContactsService,
              private router: Router,
              private route: ActivatedRoute) { }


  /* subscribing to changes to make sure app updates */
  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.contactIdx = params['idx'];
        this.contact = this.contactService.getContact(this.contactIdx);
        this.contactGroup = this.contact.group;
      }
    )
  }

  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

  /* unsubscribing to those changes to prevent memory leaks */
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
