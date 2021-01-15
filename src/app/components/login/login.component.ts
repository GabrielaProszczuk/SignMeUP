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

  username = '';
  password = '';
  constructor(private api:UserService, private router: Router) { }
  DisplayRegister = false;
  DisplayLogin = true;
  user;
  ngOnInit(): void {
    this.user = {first_name: '', last_name: '', username: '', email: '', university: '', password1: '', password2: '', group: 1}
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
    this.api.login(this.username, this.password).subscribe(
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
        console.log("nie ok");
        console.log(error)
      }
    );
  }
  register(){
    this.api.register(this.user).subscribe(
      response => {
          console.log("dodano admina");
          this.router.navigate(['/'])
      },
      error =>{
        console.log("nie ok");
        console.log(error)
      }
    );
  }

}
