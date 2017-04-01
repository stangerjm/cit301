import {Component, OnInit, OnDestroy} from '@angular/core';
import {Contact} from "../Contact";
import {Subscription} from "rxjs";
import {ContactsService} from "../contacts.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {

  private contact: Contact;
  private groupContacts: Contact[] = [];
  private subscription: Subscription;
  private editMode: boolean = false;
  private hasGroup: boolean = false;
  private contactIdx: number;
  private invalidGroupContact: boolean = true;


  constructor(private cs: ContactsService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.editMode = false;
    this.invalidGroupContact = false;
    this.subscription = this.activeRoute.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('idx')){
          this.editMode = true;
          this.contactIdx = +params['idx'];
          this.contact = this.cs.getContact(this.contactIdx);
        } else{
          this.contact = null;
          this.editMode = false;
        }
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(value){
    let newContact = new Contact(null, value.name, value.email, value.phone, value.imgUrl, this.groupContacts);
    if(this.editMode){
      newContact.contactId = this.contact.contactId;
      this.cs.updateContact(this.contact, newContact).subscribe();
    } else {
      this.cs.addContact(newContact).subscribe();
    }

    this.router.navigate(['contacts']);

  }

  onCancel(){
    this.router.navigate(['contacts']);
  }

  isInvalidContact(newContact: Contact) : boolean{
    if(!newContact){
      return true;
    }
    if(newContact.contactId === this.contact.contactId){
      return true;
    }

    for(let i = 0; i < this.groupContacts.length; i++){
      if(newContact.contactId === this.groupContacts[i].contactId){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any){
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if(this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if(idx < 0 || idx>= this.groupContacts.length){
      return;
    }
    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }


}
