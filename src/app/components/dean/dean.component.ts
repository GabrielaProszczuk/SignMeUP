import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse, HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

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
  years = [{id:1, start_year: null}];
  fields = [{id:1, name:''}]
  students = [{id:1, user: {id: null, email: ''}}];
  headers = ["id", "email"];
  newClass = {name: '', lecturer: '',description:'', day: '', type: '', start_time: '', end_time: '', field_of_study: ''};
  days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  types = [{key: 'c', type: 'class'},{key: 'l', type: 'laboratory'}, {key: 'w', type: 'lecture'}];
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos?: Observable<any>;

  constructor(private api:UserService, private router:Router, private http:HttpClient) {
    this.getMyUser();
    this.getAllYears();
    this.getAllStudents();
   }

   httpHeadersFile = new HttpHeaders({'Content-Type' : 'multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL'})
   selectedFile: File;
   onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
   }
   onUpload(){
     console.log("halo?");
     const fd = new FormData();
     fd.append('csv', this.selectedFile, this.selectedFile.name);
     console.log(this.selectedFile);
    this.http.put('https://signmeupapi.herokuapp.com/api/v1/registerstudents', fd,{
      headers: this.httpHeadersFile
    }
     )
    .subscribe(
      res => {
        console.log("hura");
      },
      err =>{
        console.log(err);
      }
    )
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

  addClass(){
    this.api.addClass(this.chosenYear.id, this.newClass.field_of_study, this.newClass).subscribe(
      res =>{
        alert("Class added");
      },
      err =>{
        console.log(err);
      }
    )
  }
  toDarkMode(){
    this.router.navigate(['/dean-dark'])
  }

  loggout(){
    this.api.logout();
    this.router.navigate(['/'])
  }

  getMyUser = () =>{
    this.token = this.api.getTokenDean() || '{}';
  }
  ngOnInit(): void {
    //Toggle Click Function
    this.fileInfos = this.api.getFiles();
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
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
    this.api.getStudents(this.token.department, this.chosenYear.id, this.chosenField.id).subscribe(
      data =>{
        this.students = data;
      },
      error => {
          console.log(error);
      }
    )
  }

  getAllYears(){
    this.api.getYears(this.token.department).subscribe(
      data =>{
        this.years = data;
      },
      error => {
          console.log(error);
      }
    )
  }
  getAllFields(){
    this.api.getFields(this.token.university, this.token.department, this.chosenYear.id).subscribe(
      data =>{
        this.fields = data;
      },
      error => {
          console.log(error);
      }
    )
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
