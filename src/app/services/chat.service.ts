import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatModel } from '../../models/chatModel';
import { Storage } from '@ionic/storage';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public sending: boolean = false;
  public recieving: boolean = false;
  public sessionID:number = 0;
  public chats: ChatModel[] = [];

  constructor(
    public http: HttpClient,
    public storage: Storage,
    public socket: Socket
  ) {
  }

  async init()
  {
    this.chats = [];
    this.disconnect();
    this.socket.connect();
    let token = await this.storage.get('token');
    this.socket.emit('init',token);
    this.socket.on('push',(chat) =>
    {
      if(chat.isMe)
      {
        this.sending = false;
        this.recieving = true;
      }
      else
      {
        this.sending = true;
        this.recieving = false;
      }
      this.chats.push(chat);
    });
    this.socket.on('end',() =>
    {
      this.disconnect();
    });
  }

  disconnect()
  {
    this.socket.removeAllListeners();
    this.sending = false;
    this.recieving = false;
    this.socket.disconnect();
  }

  clearChat()
  {
    this.chats = [];
  }

  messageNew(message)
  {
    this.socket.emit('messageNew',message);
  }

  messageOld(message)
  {
    this.socket.emit('messageOld',message);
  }
}