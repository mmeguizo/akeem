import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class FileService {

  public authToken;
  public options;

  constructor(
    public auth: AuthService,
    public cs: ConnectionService,
    private http: HttpClient,
  ) {

    //this.getAllUsers();

   }

   createAuthenticationHeaders() {
    this.loadToken();
    this.options = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Accept': 'image/jpeg',
      'authorization': this.authToken
    })
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }


 addFile(data) {
  this.createAuthenticationHeaders()

  console.log('addFile')
  console.log(data)

  return this.http.post(this.cs.domain + '/fileupload/addFile', data ,{ headers: this.options, responseType: 'json' });
  }


 addAvatar(data) {
  this.createAuthenticationHeaders()

  console.log('addAvatar')
  console.log(data)

  return this.http.post(this.cs.domain + '/fileupload/addAvatar', data ,{ headers: this.options, responseType: 'json' });
  // return this.http.post(this.cs.domain + '/fileupload/addAvatar', JSON.stringify(data) ,{ headers: this.options });
  }


}
