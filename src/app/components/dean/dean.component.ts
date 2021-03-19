import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Time } from '@angular/common';

@Component({
  selector: 'app-dean',
  templateUrl: './dean.component.html',
  styleUrls: ['./dean.component.css'],
  providers: [UserService]
})
export class DeanComponent implements OnInit {

  token;
  newpass1 = '';
  newpass2 = '';
  EditsDisplay = false;
  GroupsDisplay = false;
  ImportDisplay = false;
  PasswordDisplay = false;
  MainDisplay= true;
  chosenYear={id:1, start_year: null};
  chosenField = {id:1, name:'', year:null};
  years = [{id:1, startYear: null, fieldsOfStudy: [{id:0, name: ''}]}];
  fields = [{id:1, name:''}]
  students = [{id:1, user: {id: null, email: ''}}];
  headers = ["id", "email"];
  days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  types = [{key: 'c', type: 'class'},{key: 'l', type: 'laboratory'}, {key: 'w', type: 'lecture'}];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  name: string;
  startYear: number | null;
  yearInfo: boolean;
  fieldInfo: boolean;
  subjectInfo: boolean;
  classInfo: boolean;
  newField: {year: number, name: string};
  newSubject: {year: number, fieldId: number, name: string, pointsToGive: number | null};
  newClass: {subjectTypeId: number | null, description: string, lecturer: string, day: string, type: string, startTime: Time | null, endTime: Time | null, limit: number | null}
  fileInfos?: Observable<any>;
  yearsFiltered = [{id:1, startYear: null, fieldsOfStudy: [{id:0, name: ''}]}];

  constructor(private api:UserService, private router:Router, private http:HttpClient) {
    this.getMyUser();
    this.getAllYears();
    this.getAllStudents();
    this.getAllYears();
    this.startYear = null;
    this.yearInfo = false;
    this.fieldInfo = false;
    this.subjectInfo = false;
    this.classInfo = false;
    this.newField = {year: 0, name: ''};
    this.newClass =  {subjectTypeId: null, description: '', lecturer: '', day: '', type: '', startTime: null, endTime: null, limit: null};
    this.newSubject = {year: 0, fieldId: 0, name: "", pointsToGive: null};
    this.name = localStorage.getItem('username') || '{}';
   }

   ngOnInit(): void {
    //Toggle Click Function
    this.fileInfos = this.api.getFiles();
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
   
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    this.progress = 0;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.currentFile = file;
  
        this.api.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.api.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
  
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
  
            this.currentFile = undefined;
          });
      }
  
      this.selectedFiles = undefined;
    }
  }

  addYear(){
    this.api.addYear(this.startYear)
    this.yearInfo = true
  }

  addField(){
    this.api.addField(this.newField.year, this.newField.name)
    this.fieldInfo = true
  }
  
  addSubject(){
    this.api.addSubject(this.newSubject.fieldId, this.newSubject.name, this.newSubject.pointsToGive)
    this.subjectInfo = true
  }

  addClass(){
    this.api.addClass(this.newClass.subjectTypeId, this.newClass.description, this.newClass.lecturer, this.newClass.day, this.newClass.type, this.newClass.startTime, this.newClass.endTime, this.newClass.limit)
    this.classInfo = true
  }


  toDarkMode(){
    this.router.navigate(['/dean-dark'])
  }

  loggout(){
    this.api.logout();
    this.router.navigate(['/'])
  }

  getMyUser = () =>{
   // this.token = this.api.getTokenDean() || '{}';
  }


  changeMyPassword(){
    if(this.newpass1 == this.newpass2){
      this.api.changePassword(this.token.id, this.newpass1).subscribe(
        data =>{
          alert("Password changed");
        },
        err =>{
          console.log(err);
        }
      )
    }else{
      alert("Different passwords");
    }
    
  }
  deleteUser(id){  
    this.api.deleteUser(id).subscribe(
      data=>{
        this.getAllStudents();
        alert("User deleted")
      },
      err =>{
        console.log(err);
      }
    )
  }
  getAllStudents(){
   /* this.api.getStudents(this.token.department, this.chosenYear.id, this.chosenField.id).subscribe(
      data =>{
        this.students = data;
      },
      error => {
          console.log(error);
      }
    )*/
  }

  getAllYears(){
    this.api.getYears();
    this.years = JSON.parse(localStorage.getItem('years') || '')
  }
  getAllFields(){
    if(this.newClass.year == 0){
      this.yearsFiltered = [{id:1, startYear: null, fieldsOfStudy: [{id:0, name: ''}]}]
    }else{
      this.yearsFiltered = this.years.filter(object => {
        return object['id'] == this.newClass.year;
      });
    }
  }

  getAllFieldsForSubjects(){
    if(this.newSubject.year == 0){
      this.yearsFiltered = [{id:1, startYear: null, fieldsOfStudy: [{id:0, name: ''}]}]
    }else{
      this.yearsFiltered = this.years.filter(object => {
        return object['id'] == this.newSubject.year;
      });
    }
  }
  showMain(){
    this.MainDisplay = true;
    this.EditsDisplay = false;
    this.GroupsDisplay = false;
    this.ImportDisplay = false;
    this.PasswordDisplay = false;
  }
  showImport() {
    this.ImportDisplay = true;
    this.MainDisplay = false;
    this.EditsDisplay = false;
    this.GroupsDisplay = false;
    this.PasswordDisplay = false;
  }
  showEdits() {
    this.ImportDisplay = false;
    this.MainDisplay = false;
    this.EditsDisplay = true;
    this.GroupsDisplay = false;
    this.PasswordDisplay = false;
  }
  showGroups(){
    this.ImportDisplay = false;
    this.MainDisplay = false;
    this.EditsDisplay = false;
    this.GroupsDisplay = true;
    this.PasswordDisplay = false;
  }
  changePassword(){
    this.ImportDisplay = false;
    this.MainDisplay = false;
    this.EditsDisplay = false;
    this.GroupsDisplay = false;
    this.PasswordDisplay = true;
  }
}
