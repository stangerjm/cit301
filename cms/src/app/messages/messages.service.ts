import {Injectable, EventEmitter} from '@angular/core';
import { Message } from './message';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import {Http, Response, Headers} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";


@Injectable()
export class MessagesService {
  currentMessageId: string;
  getMessagesEmitter = new EventEmitter<Message[]>();
  messages: Message[];

  constructor(private http: Http) {
  //  this.initMessages();
    this.currentMessageId = '1';
  }

  getMessages(){
    return this.http.get('http://localhost:3000/messages').map(
      (response: Response) => {
        const messages: Message[] = response.json().obj;
        let transformedMessages: Message[] = [];
        for(let message of messages){
          transformedMessages.push(new Message(message.id, message.sender, message.subject, message.text));
        }
        this.messages = transformedMessages;
        console.log(this.messages);
        return transformedMessages;
      }).catch((error: Response) => Observable.throw(JSON.stringify(error)));
  }

  getMessage(idx: number){
    return this.messages[idx];
  }

  addMessage(message: Message){
    this.messages.push(message);

    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/messages', body, {headers: headers}).map((response: Response) => {
      const result = response.json();
      const newMessage = new Message(result.obj.id, result.obj.sender, result.obj.subject, result.obj.text);
      this.messages.push(message);
      return message;
    })
      .catch((error: Response) => Observable.throw(error.json()));

    //this.storeMessages();
  }

/*
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
*/

  storeMessages(){
    const body = JSON.stringify(this.messages);
    const header = new Headers({
      'Content-Type' : 'application/json'
    });
    return this.http.put('https://stangerjmcms-4075f.firebaseio.com/messages.json', body, {headers: header}).subscribe();
  }
}
