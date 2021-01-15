import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import{User} from './../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // BASE_PATH: ''
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: String;
  public password: String;

  constructor(private http: HttpClient) {
    this.username = '';
    this.password = '';
  }

  authenticationService(username: String, password: String) {
    console.log("service");
    return this.http.post<User>(`http://127.0.0.1:8000/api/v1/rest-auth/login/`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password,res.group);
      }));
  }

  createBasicAuthToken(username: String, password: String) {
    console.log("basic token" + window.btoa(username + ":" + password))
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username, password, group) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    sessionStorage.setItem("password",password);
    sessionStorage.setItem("group",group);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user;
  }
}