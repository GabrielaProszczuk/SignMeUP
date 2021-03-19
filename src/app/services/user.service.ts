import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEvent  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serializeNodes } from '@angular/compiler/src/i18n/digest';
import { tap,map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Token } from './../../types';
import { Router, ActivatedRoute } from '@angular/router';
import { Time } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseurl = "https://signmeupgql.herokuapp.com/graphql";
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});
  httpHeadersFile = new HttpHeaders({'Content-Type' : 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'})
  constructor(private http: HttpClient, private apollo: Apollo, private router: Router) { }
/*
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
*/
//MUTACJE

LOGIN_MUTATION = gql`

  mutation tokenAuthMutation($username: String!, $password: String!) {
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
        university{
            departments{
                name
                id
                departmentAdmins{
                    user{
                        username
                        email
                    }
                }
            }
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
            user{
              username
            }
           
          }
        }
      }
`
STUDENT_MUTATION = gql`
      query{	
        me{
          students{
            user{
              username
            }
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
  mutation CreateDepartmentAdmin($departmentId: Int!, $username : String!, $password : String!, $email : String!){
    createDepartmentAdmin(departmentId: $departmentId, username: $username, password: $password, email : $email){
      departmentAdmin{
          user{
              username
          }
      }
  }
}
`

DELETE_DEPARTMENT_ADMIN_MUTATION = gql`
      mutation delDepartmentAdmin($id: Number!){
        deleteDepartmentAdmin(
          departmentAdminId: $id
        ){
          departmentAdmin{
            user{
              username
            }
          }
        }
      }
`

GET_DEPARTMENTS = gql`
  query{	
    me{
      universityAdmin{
        university{
            departments{
                name
                id
                departmentAdmins{
                    user{
                        username
                        email
                    }
                }
            }
        }
        id
      }
    }
  }
 `
GET_YEARS = gql`
  query{	
    me{
      departmentAdmin{
          user{
              username
          }
          department{
              years{
                  startYear
                  id
                  fieldsOfStudy{
                    name
                    id
                  }
              }
          }
          id
        }   
    }
  }
`
CREATE_YEAR = gql`
  mutation CreateYear($startYear: Int!){
    createYear(startYear: $startYear){
        year{
            startYear
        }
    }
  }
 `
CREATE_FIELD_OF_STUDY = gql`
  mutation CreateFieldOfStudy($yearId: Int!,$name : String!){
    createFieldOfStudy(yearId: $yearId,name : $name){
        fieldOfStudy{
            name
        }
    }
  }
 `
CREATE_SUBJECT_TYPE = gql`
  mutation CreateSubjectType($fieldOfStudyId: Int!,$name : String!, $pointsToGive: Int!){
    createSubjectType(fieldOfStudyId: $fieldOfStudyId,name : $name, pointsToGive: $pointsToGive){
        subjectType{
            name
        }
    }
  }
`

CREATE_SUBJECT = gql`
  mutation CreateSubject($subjectTypeId: Int!,$description : String!, $lecturer: String!, $day : String!, $type : String!, $startTime : Time!, $endTime : Time!, $limit : Int!){
    createSubject(subjectTypeId: $subjectTypeId,description : $description, lecturer : $lecturer, day : $day, type : $type, startTime : $startTime, endTime : $endTime, limit : $limit){
        subject{
            day
        }
    }
  }
`

CREATE_STUDENT  = gql`
  mutation CreateStudent($fieldOfStudyId: Int!, $username : String!, $password : String!, $email : String!){
    createStudent(fieldOfStudyId: $fieldOfStudyId, username: $username, password: $password, email : $email){
        student{
            user{
                username
            }
        }
    }
  }
`

GET_FIELDS = gql`
  query{	
    me{
      departmentAdmin{
          department{
              years{
                  startYear
                  id
                  fieldsOfStudy{
                      name
                  }
                  
              }
          }
        }   
    }
  }
`
//autoryzacja użytkownika
login(name: string, pass: string) {
  this.apollo.mutate({
    mutation: this.LOGIN_MUTATION,
    variables: {
      username: name,
      password: pass
    }
  }).subscribe(
    response=> {
     localStorage.setItem('token', response.data.tokenAuth.token);
     this.apollo.mutate({
      mutation: this.ADMIN_MUTATION,
    }).subscribe(
      res =>{
        if(res.data.me.universityAdmin){
          localStorage.setItem('id',res.data.me.universityAdmin.id)
          localStorage.setItem('username',res.data.me.universityAdmin.user.username)
          this.router.navigate(['/admin'])
        }
      }      
    );
    this.apollo.mutate({
      mutation: this.DEAN_MUTATION,
    }).subscribe(
      res=>{
        if(res.data.me.departmentAdmin){
          localStorage.setItem('id',res.data.me.departmentAdmin.id)
          localStorage.setItem('username',res.data.me.departmentAdmin.user.username)
          this.router.navigate(['/dean'])
        }
      }      
    );
    this.apollo.mutate({
      mutation: this.STUDENT_MUTATION,
    }).subscribe(
      res=>{
        if(res.data.me.students){
          localStorage.setItem('id',res.data.me.students.id)
          localStorage.setItem('username',res.data.me.students.user.username)
          this.router.navigate(['/student'])
        }
      }      
    );
});
}

  register(name: string, pass: string, mail: string, university: string) { 
    console.log(pass)
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
        console.log("university added")
        this.router.navigate([''])
      })
  }

  logout() {
    localStorage.clear();
  }

  getUser(){
    return localStorage.getItem('username');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getDepartments(){
    this.apollo.mutate({
      mutation: this.GET_DEPARTMENTS,
    }).subscribe(
      response=> {
        console.log(response)
        localStorage.setItem('departments', JSON.stringify(response.data.me.universityAdmin.university.departments))
      })
  }

  getYears(){
    this.apollo.mutate({
      mutation: this.GET_YEARS,
    }).subscribe(
      response=> {
        console.log(response)
        localStorage.setItem('years', JSON.stringify(response.data.me.departmentAdmin.department.years))
      })
  }


  //dodawanie użytkowników wydziałowych
  addUser(departmentId: number, username: string, password: string, email: string){
    this.apollo.mutate({
      mutation: this.CREATE_DEPARTMENT_ADMIN_MUTATION,
      variables: {
        departmentId: departmentId,
        username: username,
        password: password,
        email: email
      }
    }).subscribe(
      response=> {
        console.log(response);
      })
  }

  addDepartment(name: string){
    this.apollo.mutate({
      mutation: this.CREATE_DEPARTMENT_MUTATION,
      variables: {
        name: name,
      }
    }).subscribe(
      response=> {
        console.log(response);
      })
  }
//usuwanie użytkowników wydziałowych
  deleteDepAdmin(id: number){
    this.apollo.mutate({
      mutation: this.DELETE_DEPARTMENT_ADMIN_MUTATION,
      variables:{
        id: id
      }
    }).subscribe(
      res =>{
        console.log("deleted")
      }
    )
  }

  addYear(startYear: number){
    this.apollo.mutate({
      mutation: this.CREATE_YEAR,
      variables: {
        startYear: startYear,
      }
    }).subscribe(
      response=> {
        console.log("year added");
      })
  }

  addField(yearId: number, field: string){
    this.apollo.mutate({
      mutation: this.CREATE_FIELD_OF_STUDY,
      variables: {
        yearId: yearId,
        name: field,
      }
    }).subscribe(
      response=> {
        console.log("year added");
      })
  }
/*
  getFields(yearId: number){
    this.apollo.mutate({
      mutation: this.GET_FIELDS,
    }).subscribe(
      response=> {
        console.log(response);
        localStorage.setItem('fields', JSON.stringify(response.data.me.departmentAdmin.department.years.fieldsOfStudy))
      })
  }*/

  addSubject(fieldId: number, name: string, pointsToGive: number){
    this.apollo.mutate({
      mutation: this.CREATE_SUBJECT_TYPE,
      variables: {
        fieldOfStudyId: fieldId,
        name: name,
        pointsToGive: pointsToGive,
      }
    }).subscribe(
      response => {
        console.log("subject added")
      }
    )
  }

  addClass(subjectTypeId: number | null, description: string, lecturer: string, day: string, type: string, startTime: Time, endTime: Time, limit: number){
    this.apollo.mutate({
      mutation: this.CREATE_SUBJECT,
      variables: {
        subjectTypeId: subjectTypeId,
        description: description,
        lecturer: lecturer,
        day: day,
        type: type,
        startTime: startTime,
        endTime: endTime,
        limit: limit,
      }
    }).subscribe(
      response => {
        console.log("class added")
      }
    )
  }
  /*
  //pobieranie listy użytkowników
  getOfficials(){ 
    this.apollo.mutate({
      mutation: this.GET_OFFICIALS_MUTATION,
      variables: {
        universityId: localStorage.getItem('id')
      }
    }).subscribe(
      response => {
        console.log(response)
      })
  }*/

  /*
  getTokenDean(){
    return {token: localStorage.getItem('token'),id: localStorage.getItem('id'), email: localStorage.getItem('email'),
     university: localStorage.getItem('university'),department: localStorage.getItem('department')  }
  }
  getTokenStudent(){
    return {token: localStorage.getItem('token'), email: localStorage.getItem('email'), id: localStorage.getItem('id'), university: localStorage.getItem('university'),
    department: localStorage.getItem('department'), year: localStorage.getItem('year')  }
  }

  getStudentID(id: number): Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/users/' + id + '/students/',
     {headers: this.httpHeaders} )
  }


  getStudents(depID: number, yearId, fieldID): Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/years/' + yearId + '/fieldsofstudy/' + fieldID + '/students/', {headers: this.httpHeaders} );
  }
  getDepartments(id): Observable<any>{
    return this.http.get(this.baseurl + '/api/v1/departments/', {headers: this.httpHeaders} )
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
*/
}
