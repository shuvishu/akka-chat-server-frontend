import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { LoginSuccess, Clients , User, ChatMessage, PollSuccess} from '../models/model';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) {
  }

  login(user: User): Observable<LoginSuccess> {
    return this.httpClient.post<LoginSuccess>(`${environment.serviceUrl}/api/login`, user);
  }

  clients(): Observable<Clients> {
    return this.httpClient.get<Clients>(`${environment.serviceUrl}/api/clients`);
  }

  poll(id: string): Observable<PollSuccess> {
    return this.httpClient.get<PollSuccess>(`${environment.serviceUrl}/api/poll/${id}`);
  }

  sendMessage(msg: ChatMessage): Observable<any> {
    return this.httpClient.post<any>(`${environment.serviceUrl}/api/send-message`, msg);
  }

}
