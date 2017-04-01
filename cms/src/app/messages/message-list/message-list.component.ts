import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[];
  selectedMessage: Message = null;

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
    this.messageService.getMessages().subscribe(
      (messages: Message[]) => this.messages = messages
    );
    this.messageService.getMessagesEmitter.subscribe(
      (messages: Message[]) => this.messages = messages
    );
  }


}
