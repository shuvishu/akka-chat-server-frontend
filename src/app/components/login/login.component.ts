import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login-service.service';
import { LoginSuccess , Clients , User, Chats, ChatMessage} from 'src/app/models/model';
import { v4 as uuid } from 'uuid';
import {getObservable, unsubscribeObservable} from '../../utils/observables';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  id: string = uuid();
  loggedIn: boolean = false;

  destroyed: boolean = true;

  chats: Chats[];

  name: string;

  currentChat: Chats;

  getClientsObservable: Subscription;

  heartBeatObservable: Subscription;

  currentMessage: string;

  constructor(private service: LoginService) { }
  ngOnDestroy(): void {
    this.destroyed = false;
    unsubscribeObservable(this.getClientsObservable);
    unsubscribeObservable(this.heartBeatObservable);
  }

  ngOnInit() { }


  sendMessage() {
    const newMessage = new ChatMessage(this.currentMessage, true, new Date().getTime());
    this.currentMessage = undefined;
    this.currentChat.chat.push(newMessage);
  }

  openChat(client: Chats) {
    console.log('Open chat called for ');
    console.log(client);
    this.currentChat = this.chats.filter(x => x.id.id === client.id.id)[0];
    console.log(this.currentChat);

  }

  login() {
    const user: User = new User(this.id, this.name);
    this.service.login(user).subscribe((loggedIn: LoginSuccess) => {
      console.log(loggedIn.message);

      this.service.clients().subscribe((res: Clients) => {
        this.loggedIn = true;
        this.chats = res.clients.filter(x => x.id !== this.id).map((user: User) => new Chats(user));
        this.runClientsObservable();
        this.runHeartBeat();
      });
    }, error => {
      if (error.status === 0) {
        alert('Server is unavailable');
      }
    });
  }

  runClientsObservable() {
    this.getClientsObservable = getObservable(5000, 10000, this.destroyed).subscribe(() => {
      this.service.clients().subscribe((res: Clients) => {
        res.clients.forEach((newClient: User) => {
          if (this.id !== newClient.id) {
            if (this.chats.filter((u: Chats) => u.id.id === newClient.id).length === 0) {
              this.chats.push(new Chats(newClient));
            }
          }
        });
        this.chats.filter(us => {
          return res.clients.filter(x => x.id === us.id.id).length === 0;
        }).map(v => v.id.id)
        .forEach(id => {
          this.chats.forEach(u => {
            if (u.id.id === id) {
              u.isOnline = false;
            }
          });
        });
      });
    });
  }

  runHeartBeat() {
    this.heartBeatObservable = getObservable(0, 5000, this.destroyed).subscribe(() => {
      this.service.poll(this.id).subscribe((res: any) => {
        console.log('Poll success full');
      }, error => {
        console.log(error);
      });
    });
  }

}
