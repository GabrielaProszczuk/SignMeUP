import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { tap,map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Token } from './../../types';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = "https://signmeupapi.herokuapp.com";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  httpHeadersFile = new HttpHeaders({'Content-Type' : 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'})
  constructor(private http: HttpClient, private apollo: Apollo, private router: Router) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `${this.baseurl}/api/v1/registerstudents`, formData, {
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

LOGIN_MUTATION = gql`

  mutation tokenAuthQuery($username: String!, $password: String!) {
    tokenAuth(
      username: $username,
      password: $password,
    ) {
      token
    }
  }
`;

ADMIN_MUTATION = gql`
      query{	
        me{
          universityAdmin{
            user{
              username
            }
            id
          }
        }
      }
`
DEAN_MUTATION = gql`
      query{	
        me{
          departmentAdmin{
            id
          }
        }
      }
`
STUDENT_MUTATION = gql`
      query{	
        me{
          students{
            id
          }
        }
      }
`


REGISTER_ADMIN_MUTATION = gql`
      mutation createUniversityAdmin($username: String!, $password: String!, $email: String!, $universityName: String! ){
        createUniversityAdmin(
            username: $username
            password: $password
            email: $email
            universityName: $universityName
        ){
            universityAdmin{
                user{
                    username
                    email
                }
            }
        }
      }
`
CREATE_DEPARTMENT_MUTATION = gql`
      mutation createDepartment($name: String!){
        createDepartment(
          name: $name
        ){
          department{
            name
          }
        }
      }
`
CREATE_DEPARTMENT_ADMIN_MUTATION = gql`
      mutation createDepartmentAdmin($departmentId: Number!, $username: String!, $password: String!, $email: String!){
        createDepartmentAdmin(
          departmentId: $departmentId,
          username: $username,
          password: $password,
          email: $email
        ){
          departmentAdmin(
            user{
              username
            }
          )
        }
      }
`
login(name: string, pass: string) {
  this.apollo.mutate({
    mutation: this.LOGIN_MUTATION,
    variables: {
      username: name,
      password: pass
    }
  }).subscribe(
    response=> {
     console.log(response.data)
     localStorage.setItem('token', response.data.tokenAuth.token);
     this.apollo.mutate({
      mutation: this.ADMIN_MUTATION,
    }).subscribe(
      res=>{
        if(res.data.me.universityAdmin.id){
          localStorage.setItem('username',res.data.me.universityAdmin.user.username)
          this.router.navigate(['/admin'])
        }
      }      
    );
    this.apollo.mutate({
      mutation: this.DEAN_MUTATION,
    }).subscribe(
      res=>{
        if(res.data.me.departmentAdmin.id){
          localStorage.setItem('username',res.data.me.departmentAdmin.user.username)
          this.router.navigate(['/dean'])
        }
      }      
    );
    this.apollo.mutate({
      mutation: this.DEAN_MUTATION,
    }).subscribe(
      res=>{
        if(res.data.me.students.id){
          localStorage.setItem('username',res.data.me.students.user.username)
          this.router.navigate(['/student'])
        }
      }      
    );
});
}

  register(name: string, pass: string, mail: string, university: string) { 
    this.apollo.mutate({
      mutation: this.REGISTER_ADMIN_MUTATION,
      variables: {
        username: name,
        password: pass,
        email: mail,
        universityName: university
      }
    }).subscribe(
      response=> {
        this.router.navigate(['/login'])
      })
  }

  logout() {
    localStorage.clear();
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
  getOfficials(): Observable<any>{    //ten nie działa jeszcze
    return this.http.get(this.baseurl + '/api/v1/users/', {headers: this.httpHeaders})
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
  getSubjects(userID, studentID){
    return this.http.get(this.baseurl + '/api/v1/users/'+userID+'/students/'+studentID+'/subjects/',
    {headers: this.httpHeaders});
  }

  //dodawanie użytkowników, aplikacji
  addUser(userData): Observable<any>{
    return this.http.post(this.baseurl + '/api/v1/users/', userData );
  }

  addExchange(userId, studentId, data): Observable<any>{
    return this.http.post(this.baseurl + '/api/v1/users/'+ userId + '/students/'+ studentId + '/applications/', data);
  }
  addClass(yearId, fieldId, data): Observable<any>{
    return this.http.post(this.baseurl + '/api/v1/years/'+ yearId + '/fieldsofstudy/'+ fieldId + '/subjects/', data);
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
