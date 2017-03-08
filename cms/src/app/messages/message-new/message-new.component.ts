import { Component, OnInit } from '@angular/core';
import {Contact} from "../../contacts/Contact";
import {Message} from "../message";
import {ContactsService} from "../../contacts/contacts.service";
import {MessagesService} from "../messages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'cms-message-new',
  templateUrl: './message-new.component.html',
  styleUrls: ['./message-new.component.css']
})
export class MessageNewComponent implements OnInit {

  sender: Contact;


  constructor(private cs: ContactsService,
              private ms: MessagesService,
              private router: Router) {

    this.sender = cs.getCurrentContact();
  }

  ngOnInit() {
  }

  onSubmit(value){
    const newMessage = new Message(null, this.sender.name, "", value.text);
    this.ms.addMessage(newMessage);
    this.router.navigate(['messages']);
  }

  onCancel(){
    this.router.navigate(['messages']);
  }

}
