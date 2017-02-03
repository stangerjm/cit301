import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Contact } from '../Contact';

@Component({
  selector: 'cms-contacts-group',
  templateUrl: './contacts-group.component.html',
  styleUrls: ['./contacts-group.component.css']
})
export class ContactsGroupComponent implements OnInit {


  @Input() contact: Contact;
  groupContacts: Contact[] = [];


  @Input() selectedContact: Contact;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.groupContacts = this.contact.group;
    console.log(this.contact.group);
  }

}
