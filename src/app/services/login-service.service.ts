import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { LoginSuccess, Clients , User} from '../models/model';
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

  poll(id: string): Observable<any> {
    return this.httpClient.get<any>(`http://0.0.0.0:8080/poll/${id}`);
  }

}
