import {Injectable, EventEmitter} from '@angular/core';

import { Contact } from './contact';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class ContactsService {

  currentContact: Contact;
  currentContactId: string;
  getContactEmitter = new EventEmitter<Contact[]>();


  contacts: Contact[] = [];

  constructor(private http: Http) {
    //this.initContacts();
    this.currentContactId = '1';
    this.currentContact = new Contact(23, "James Stanger", "jamesstanger987@gmail.com", "360-485-9925", "http://www.servicedeskshow.com/wp-content/uploads/James-Stanger-CompTIA-08.06.16-Keynote-1.30pm-09.06.16-T3-3.30pm-e1458741088986.jpg", null);
  }

  getContacts() {
    return this.http.get('http://localhost:3000/contacts').map(
      (response: Response) => {
        const contacts: Contact[] = response.json().obj;
        let transformedContacts: Contact[] = [];
        for(let contact of contacts){
          transformedContacts.push(new Contact(contact.contactId, contact.name, contact.email, contact.phone, contact.imageUrl, contact.group));
        }
        this.contacts = transformedContacts;
        return transformedContacts;
      }).catch((error: Response) => Observable.throw(JSON.stringify(error)));

    /*
    // individual contacts
    this.contacts[0] = new Contact("1", "Rex Barzee", "barzeer@byui.edu", "208-496-3768",
      "../../images/barzeer.jpg", null);
    this.contacts[1] = new Contact("2", "Bradley Armstrong", "armstrongb@byui.edu", "208-496-3766",
      "../../images/armstrongb.jpg", null);
    this.contacts[2] = new Contact("3", "Lee Barney", "barneyl@byui.edu", "208-496-3767",
      "../../images/barneyl.jpg", null);
    this.contacts[3] = new Contact("5", "Kory Godfrey", "godfreyko@byui.edu", "208-496-3770",
      "../../images/godfreyko.jpg", null);
    this.contacts[4] = new Contact("7", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771",
      "../../images/jacksonk.jpg", null);
    this.contacts[5] = new Contact("8", "Craig Lindstrom", "lindstromc@byui.edu", "208-496-3769",
      "../../images/lindstromc.jpg", null);
    this.contacts[6] = new Contact("9", "Michael McLaughlin", "mclaughlinm@byui.edu", "208-496-3772",
      "../../images/mclaughlinm.jpg", null);
    this.contacts[7] = new Contact("11", "Brent Morring", "morringb@byui.edu", "208-496-3778",
      "../../images/morringb.jpg", null);
    this.contacts[8] = new Contact("12", "Mark Olaveson", "olavesonm@byui.edu", "208-496-3773",
      "../../images/olavesonm.jpg", null);
    this.contacts[9] = new Contact("13", "Steven Rigby", "rigbys@byui.edu", "208-496-3774",
      "../../images/rigbys.jpg", null);
    this.contacts[10] = new Contact("15", "Blaine Robertson", "robertsonb@byui.edu", "208-496-3775",
      "../../images/robertsonb.jpg", null);
    this.contacts[11] = new Contact("16", "Randy Somsen", "somsenr@byui.edu", "208-496-3776",
      "../../images/somsenr.jpg", null);
    this.contacts[12] = new Contact("17", "Shane Thompson", "thompsonda@byui.edu", "208-496-3776",
      "../../images/thompsonda.jpg", null);

    // group Contacts
    this.contacts[13] = new Contact("4", "Network/OS team", " ", " ", " ",
      [this.contacts[1], this.contacts[5], this.contacts[8], this.contacts[9]]);
    this.contacts[14] = new Contact("6", "Software Development team", " ", " ", " ",
      [this.contacts[0], this.contacts[2], this.contacts[4], this.contacts[8]]);
    this.contacts[15] = new Contact("10", "Web Development team", " ", " ", " ",
      [this.contacts[10], this.contacts[11], this.contacts[12]]);
    this.contacts[16] = new Contact("14", "Database team", " ", " ", " ",
      [this.contacts[4], this.contacts[6], this.contacts[7]]);
    this.contacts[17] = new Contact("18", "Computer Security team", " ", " ", " ",
      [this.contacts[3], this.contacts[5], this.contacts[9]]);

    // sort by name
    this.contacts = this.contacts.sort(this.compareNames);

    return this.contacts;*/
  }



  compareNames(contactA: Contact, contactB: Contact) {

    if (contactA.name < contactB.name)
      return -1;
    if (contactA.name > contactB.name)
      return 1;
    return 0;

  }

  getContact(idx: number){
    return this.contacts[idx];
  }

  getCurrentContact(){
    return this.currentContact;
  }



  addContact(contact: Contact){
    if(!contact)
      return;
    this.contacts.push(contact);
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }

  updateContact(oldContact: Contact, newContact: Contact){
    if(!oldContact || !newContact){
      return;
    }

    this.contacts[this.contacts.indexOf(oldContact)] = newContact;
    this.contacts = this.contacts.sort(this.compareNames);

    const body = JSON.stringify(newContact);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/contacts/' + newContact.contactId, body, {headers: headers}).map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
    //this.storeContacts();
  }

  deleteNContact(contact: Contact){
    if(!contact){
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if(pos<0){
      return;
    }

    this.contacts.splice(pos, 1);
    this.contacts = this.contacts.sort(this.compareNames);

    return this.http.delete('http://localhost:3000/contacts/' + contact.contactId).map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }
/*
  initContacts(){
    this.http.get('https://stangerjmcms-4075f.firebaseio.com/contacts.json').map(
      (response: Response) => response.json()
    ).subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        this.currentContact = this.getContactById("7");
        this.contacts = this.contacts.sort(this.compareNames);
        this.getContactEmitter.emit(this.contacts);
      }
    );
  }
*/

  storeContacts(){
    const body = JSON.stringify(this.contacts);
    const header = new Headers({
      'Content-Type' : 'application/json'
    });
    return this.http.put('https://stangerjmcms-4075f.firebaseio.com/contacts.json', body, {headers: header}).subscribe();
  }

  getContactById(id: number): Contact{
    return this.contacts.find((contact: Contact) => contact.contactId === id);
  }

}
