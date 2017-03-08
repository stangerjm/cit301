import { Injectable } from '@angular/core';
import { Message } from './message';
import { MOCKMESSAGES } from './MOCKMESSAGES';


@Injectable()
export class MessagesService {

  messages = MOCKMESSAGES;

  constructor() { }

  getMessages(){
    return this.messages;
  }

  getMessage(idx: number){
    return this.messages[idx];
  }

  addMessage(message: Message){
    console.log(message);
    this.messages.push(message);
  }

}
