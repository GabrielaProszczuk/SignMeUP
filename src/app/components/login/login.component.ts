import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name="";
  constructor() { }
  StudentLogin = false;
  DeanLogin = false;
  ngOnInit(): void {
  }

  showStudentLogin(){
    this.StudentLogin = true;
    this.DeanLogin = false;
  }
  showDeanLogin(){
    this.StudentLogin = false;
    this.DeanLogin = true;
  }
}
