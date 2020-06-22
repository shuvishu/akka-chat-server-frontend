import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { LoginSuccess, Clients , User, ChatMessage, PollSuccess} from '../models/model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<LoginSuccess> {
    return this.httpClient.post<LoginSuccess>(`http://0.0.0.0:8080/login`, user);
  }

  clients(): Observable<Clients> {
    return this.httpClient.get<Clients>(`http://0.0.0.0:8080/clients`);
  }

  poll(id: string): Observable<PollSuccess> {
    return this.httpClient.get<PollSuccess>(`http://0.0.0.0:8080/poll/${id}`);
  }

  sendMessage(msg: ChatMessage): Observable<any> {
    return this.httpClient.post<any>(`http://0.0.0.0:8080/send-message`, msg);
  }

}
