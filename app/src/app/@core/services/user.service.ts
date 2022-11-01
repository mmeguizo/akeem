import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authToken;
  public options;

  constructor(
    public auth: AuthService,
    public cs: ConnectionService,
    private http: HttpClient,
  ) {

    this.getAllUsers();

   }

   createAuthenticationHeaders() {
    this.loadToken();
    this.options = new HttpHeaders({
      'Content-Type': 'application/json',
      'authorization': this.authToken
    })
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }


 getAllUsers() {
  this.createAuthenticationHeaders()
  return this.http.get(this.cs.domain + '/users/getAllUser',{ headers: this.options });
  }


}
