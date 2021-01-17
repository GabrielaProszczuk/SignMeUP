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
  user = {email: '', password1: '', password2: '', university: ''}
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
    this.api.login(this.email, this.password).subscribe(
      response => {
        if(response.user.groups == 1){
         this.router.navigate(['/admin'])
        }else if(response.user.groups == 2){
          this.router.navigate(['/dean'])
        }else if(response.user.groups == 3){
          this.router.navigate(['/student'])
        }
      },
      error =>{
        this.err1 = "Incorrect credentials";
        console.log(error)
      }
    );
  }
  register(){
    this.api.register(this.user).subscribe(
      response => {
          console.log("dodano admina");
          this.router.navigate(['/'])
          this.msg = "Zarejestrowano";
      },
      error =>{
        this.err2 = "Incorrect credentials. Make sure password has min 8 characters and that given passwords are identical";
        console.log(error)
      }
    );
  }

}
