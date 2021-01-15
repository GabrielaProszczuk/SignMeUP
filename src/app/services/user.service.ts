import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { tap,map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = "https://signmeupapi.herokuapp.com";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) { }

  login(username, password): Observable<any>{
    //console.log(this.http.post(this.baseurl + '/api/v1/rest-auth/login/', {username, password}));
    //return this.http.post(this.baseurl + '/api/v1/rest-auth/login/', {username, password});
   return this.http.post<{token:  string}>(this.baseurl + '/api/v1/rest-auth/login/', {username, password}).pipe(
     tap(
       res => {
    localStorage.setItem('token', res.key);
    localStorage.setItem('username', res.user.username);
    localStorage.setItem('first_name', res.user.first_name);
    localStorage.setItem('last_name', res.user.last_name);
    localStorage.setItem('university', res.user.university);
    }))
  }
  register(user) {
    return this.http.post<{token: string}>(this.baseurl + '/api/v1/rest-auth/registration/', {user});
  }

  logout() {
    localStorage.removeItem('token');
   //removeItem('currentUser');
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('token') !==  null;
  }

  getToken(){
    return localStorage.getItem('token');
  }
  getTokenUser(){
    return {token: localStorage.getItem('token'), username: localStorage.getItem('username'),first_name: localStorage.getItem('first_name'), 
    last_name: localStorage.getItem('last_name'),university: localStorage.getItem('university') }
  }
  getTokenStudent(){
    return {token: localStorage.getItem('token'), username: localStorage.getItem('username'),first_name: localStorage.getItem('first_name'), 
    last_name: localStorage.getItem('last_name'),university: localStorage.getItem('university'), department: localStorage.getItem('department'),
    year: localStorage.getItem('year')  }
  }

  getOfficials(id): Observable<any>{
    return this.http.get(this.baseurl + '/universities/' + id + '/departments/users/', 
    )
  }

  addUser(userData): Observable<any>{
    return this.http.post(this.baseurl + '/api/v1/users/', userData );
  }

  addExchange(userData): Observable<any>{
    return this.http.post(this.baseurl + '/exchanges/', userData);
  }
  addStudent(userData): Observable<any>{
    return this.http.post(this.baseurl + '/students/', userData);
  }

  loginUser(userData): Observable<any>{
    console.log("service");
    return this.http.post(this.baseurl + 'api/v1/rest-auth/login/', userData);
  }

  getExchanges(id):Observable<any>{
    return this.http.get(this.baseurl + '/exchanges/',
    {headers: this.httpHeaders});
    
  }
  deleteUser(user):Observable<any>{
    return this.http.delete(this.baseurl + '/students/'+user.id,
    {headers: this.httpHeaders});
    
  }
}
