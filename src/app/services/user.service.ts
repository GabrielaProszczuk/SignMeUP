import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { tap,map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = "https://signmeupapi.herokuapp.com";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  httpHeadersFile = new HttpHeaders({'Content-Type' : 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'})
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseurl}/v1/api/registerstudents`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: this.httpHeadersFile
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseurl}/api/v1/`);
  }


  //autoryzacja użytkownika
  login(email, password): Observable<any>{
   return this.http.post<{token}>(this.baseurl + '/api/v1/rest-auth/login/', {email, password}).pipe(
     tap(
       res => {
         //year field studentID
    localStorage.setItem('token', res.key);
    localStorage.setItem('id', res.user.id);
   localStorage.setItem('email', res.user.email);

    localStorage.setItem('university', res.user.university.id);
    },
    err => {
    console.log(err);
    }))
  }

  register(user) { 
    return  this.http.post<{token: string}>(this.baseurl + '/api/v1/rest-auth/registration/', user);
  }

  logout() {
    localStorage.clear();
    console.log("user logged put")
  }

  public get loggedIn(): boolean{
    return localStorage.getItem('token') !==  null;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getTokenDean(){
    return {token: localStorage.getItem('token'),id: localStorage.getItem('id'), email: localStorage.getItem('email'),
     university: localStorage.getItem('university'),department: localStorage.getItem('department')  }
  }
  getTokenStudent(){
    return {token: localStorage.getItem('token'), email: localStorage.getItem('email'), id: localStorage.getItem('id'), university: localStorage.getItem('university'),
    department: localStorage.getItem('department'), year: localStorage.getItem('year')  }
  }

  getStudentID(id): Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/users/' + id + '/students/',
     {headers: this.httpHeaders} )
  }

  //pobieranie listy użytkowników, aplikacji
  getOfficials(id): Observable<any>{    //ten nie działa jeszcze
    return this.http.get(this.baseurl + '/api/v1/universities/' + id + '', 
    )
  }

  getStudents(depID, yearId, fieldID): Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/years/' + yearId + '/fieldsofstudy/' + fieldID + '/students/', {headers: this.httpHeaders} );
  }
  getDepartments(id): Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/departments/', {headers: this.httpHeaders} )
  }

  getFields(idUni, idDep, year): Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/years/' + year + '/fieldsofstudy/',
     {headers: this.httpHeaders} )
  }

  getYears(idDep): Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/years/', {headers: this.httpHeaders} )
  }

  getExchanges(userId, studentId):Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/users/'+ userId + '/students/'+ studentId + '/applications/',
    {headers: this.httpHeaders});
    
  }
  getSubjects(uniID, depID, yearID, fieldID){
    return this.http.get(this.baseurl + '/api/v1/years/'+yearID+'/fieldsofstudy/'+fieldID + '/subjects/',
    {headers: this.httpHeaders});
  }

  //dodawanie użytkowników, aplikacji
  addUser(userData): Observable<any>{
    return this.http.post(this.baseurl + '/api/v1/users/', userData );
  }

  addExchange(userId, studentId, data): Observable<any>{
    return this.http.post(this.baseurl + '/api/v1/users/'+ userId + '/students/'+ studentId + '/applications/', data);
  }

  //usuwanie używtkoników, aplikacji
  deleteUser(id):Observable<any>{
    return this.http.delete(this.baseurl + '/api/v1/users/'+id + '/',
    {headers: this.httpHeaders});
    
  }
  deleteApp(userId, studentId, app):Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/users/'+ userId + '/students/'+ studentId + '/applications/' + app +'/',
    {headers: this.httpHeaders});
    
  }

  //password changes
  changePassword(id, pass):Observable<any>{
    return this.http.put(this.baseurl + '/api/v1/users/' + id +'/', {password: pass}, {headers: this.httpHeaders})
  }

}
