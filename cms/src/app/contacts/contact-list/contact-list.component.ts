import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Contact } from '../contact';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  @Output() selectedContact = new EventEmitter<Contact>();

  contact = new Contact(1, 'James Stanger', 'jamesstanger987@gmail.com', '3604859925', 'https://images-na.ssl-images-amazon.com/images/I/51E%2B7V-PDyL.jpg', 'hello');

  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: Contact){
    this.selectedContact.emit(contact);
  }

}
