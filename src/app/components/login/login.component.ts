import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login-service.service';
import { LoginSuccess , Clients , User} from 'src/app/models/model';
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

  clientsToChat: User[];

  name: string;

  getClientsObservable: Subscription;

  heartBeatObservable: Subscription;

  constructor(private service: LoginService) { }
  ngOnDestroy(): void {
    this.destroyed = false;
    unsubscribeObservable(this.getClientsObservable);
    unsubscribeObservable(this.heartBeatObservable);
  }

  ngOnInit() {
  }

  login() {
    const user: User = new User(this.id, this.name);
    this.service.login(user).subscribe((loggedIn: LoginSuccess) => {
      console.log(loggedIn.message);

      this.service.clients().subscribe((res: Clients) => {
        this.loggedIn = true;
        this.clientsToChat = res.clients.filter(x => x.id !== this.id);
        this.runClientsObservable();
        this.runHeartBeat();
      });
    }, error => {

    });
  }

  runClientsObservable() {
    this.getClientsObservable = getObservable(5000, 10000, this.destroyed).subscribe(() => {
      this.service.clients().subscribe((res: Clients) => {
        this.loggedIn = true;
        this.clientsToChat = res.clients.filter(x => x.id !== this.id);
      });
    });
  }

  runHeartBeat() {
    this.heartBeatObservable = getObservable(0, 5000, this.destroyed).subscribe(() => {
      this.service.poll(this.id).subscribe((res: any) => {
        console.log('Poll success full');
      }, error => {
        console.log('---------------------- Error Occured');
        console.log(error);
      });
    });
  }

}
