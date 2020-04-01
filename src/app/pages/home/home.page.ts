import { ChatService } from '../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent,{ static: false }) content: IonContent;
  message : string;
  disable: boolean = true;
  isNewUser: boolean = true;
  new: boolean = true;
  newSet: boolean = false;

  constructor(
    public chatService : ChatService,
    public authService : AuthService,
    public router : Router,
    
  ){ }

  ionViewDidEnter()
  {
    this.chatService.init();
    this.ngOnInit();
  }

  ngOnInit()
  {
    this.disable = true;
    this.isNewUser = true;
    this.new = true;
    this.newSet = false;
    this.isNew();
    this.chatService.socket.on('end',()=>
    {
      this.disable = true;
    });
  }

  sendMessage()
  {
    if(this.new)
    {
      this.newOrder();
    }
    else
    {
      this.preference()
    }
  }

  preference() {
    this.chatService.messageOld(this.message);
    this.chatService.sending = true;
    this.disable = true;
    this.message = '';
  }

  newOrder()
  {
    this.chatService.messageNew(this.message);
    this.message = '';
    this.chatService.sending = true;
  }

  updateNewOrOld(val)
  {
    this.new = val;
    this.newSet = true;
    this.disable = false;
    if(!this.new)
    {
      this.message = 'Hi!';
      this.sendMessage();
    }
  }

  isNew()
  {
    this.authService.isNewUser().subscribe(
      res =>
      {
        this.isNewUser = res['new'];
      },
      error =>
      {
        this.router.navigateByUrl('/dashboard');
      }
    )
  }

  back()
  {
    this.chatService.disconnect();
    this.chatService.clearChat();
    this.router.navigateByUrl('/dashboard');
  }
}
