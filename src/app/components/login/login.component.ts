import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  err1 = "";
  err2 = "";
  msg = "";
  user = {user: '', email: '', password1: '', password2: '', university: ''}
  constructor(private api:UserService, private router: Router) { }
  DisplayRegister = false;
  DisplayLogin = true;
  ngOnInit(): void {   
  }

  showLogin(){
    this.DisplayLogin = true;
    this.DisplayRegister = false;
  }
  showRegister(){
    this.DisplayLogin = false;
    this.DisplayRegister = true;
  }

  login(){
    this.api.login(this.email, this.password);
  }
  register(){
    this.api.register(this.user.user, this.user.password1,  this.user.email, this.user.university);
  }

}
