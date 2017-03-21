import {Injectable, EventEmitter} from '@angular/core';
import { Message } from './message';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';


@Injectable()
export class MessagesService {
  currentMessageId: string;
  getMessagesEmitter = new EventEmitter<Message[]>();
  messages: Message[];

  constructor(private http: Http) {
    this.initMessages();
    this.currentMessageId = '1';
  }

  getMessages(){
    return this.messages;
  }

  getMessage(idx: number){
    return this.messages[idx];
  }

  addMessage(message: Message){
    this.messages.push(message);
    this.storeMessages();
  }


  initMessages(){
    this.http.get('https://stangerjmcms-4075f.firebaseio.com/messages.json').map(
      (response: Response) => response.json()
    ).subscribe(
      (data: Message[]) => {
        this.messages = data;
        console.log(this.messages);
        this.getMessagesEmitter.emit(this.messages);
      }
    );
  }


  storeMessages(){
    const body = JSON.stringify(this.messages);
    const header = new Headers({
      'Content-Type' : 'application/json'
    });
    return this.http.put('https://stangerjmcms-4075f.firebaseio.com/messages.json', body, {headers: header});
  }
}
