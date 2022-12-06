import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { ConnectionService } from './connection.service';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  public authToken;
  public options;
  picture: HttpHeaders;

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
      'Accept': 'image/jpeg',
      'authorization': this.authToken
    })
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  getRoute(endpoint,apiName,data){
    this.createAuthenticationHeaders()
    if(endpoint == 'put'){
      return this.http.put(this.cs.domain + `/users/${apiName}`, data,{ headers: this.options });
    }else if(endpoint == 'post'){
      return this.http.post(this.cs.domain + `/users/${apiName}`,  data ,{ headers: this.options });
    }else{
      return this.http.get(this.cs.domain + `/users/${apiName}/` + data, { headers: this.options});
    }
  }

 getAllUsers() {
  this.createAuthenticationHeaders()
  return this.http.get(this.cs.domain + '/users/getAllUser',{ headers: this.options });
  }


 getUserProfilePic(data) {
  this.createAuthenticationHeaders()
  this.picture = new HttpHeaders({
    // 'Accept': 'image/jpeg',
    'Content-Type': 'application/octet-stream',
    'authorization': this.authToken
  })
  return this.http.get(this.cs.domain + '/users/UserProfilePic/' + data ,{ headers: this.picture,  responseType: 'blob'  });
  }





/*

 headers: { 'Content-Type': 'application/octet-stream'},
      responseType: 'blob'


getRoutes(apiName) {
  this.createAuthenticationHeaders()
  return this.http.get(this.cs.domain + `/users/${apiName}`,{ headers: this.options });
  }

 postRoutes(apiName,data) {
  this.createAuthenticationHeaders()
  return this.http.post(this.cs.domain + `/users/${apiName}`,  data ,{ headers: this.options });
  }
 putRoutes(apiName,data) {
  this.createAuthenticationHeaders()
  return this.http.put(this.cs.domain + `/users/${apiName}`, data,{ headers: this.options });
  }

  addUser(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + '/users/addUser', data, { headers: this.options });
  }
  changeStatus(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/users/changeStatus', data, { headers: this.options });
  }
  updateUser(data) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + '/users/updateUser', data, { headers: this.options });
  }
*/

}
