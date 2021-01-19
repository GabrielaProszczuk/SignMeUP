import { Component, OnInit} from '@angular/core';
//import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { Department, Query } from './../../../types';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [/*UserService*/]
})
export class AdminComponent implements OnInit {
  
  token;
  officials = [{id: 1, email: 'jola@jola.pl'}];
  departments = [{id:1, name: 'weaiib', university:'' }, {id:2, name:'wiet', university:''}, {id:3, name:'wimip', university:''}];
  headers = ["id", "email"];
  registeredUser: User;
  MainDisplay = true;
  UsersDisplay = false;
  PasswordDisplay = false;
  departments: Observable<Query>;
  constructor(private apollo: Apollo, private api:UserService){  }
  name:string ='';
  ngOnInit(){ 
    this.name = localStorage.getItem('username');
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  addUser() {
    this.api.addUser(this.registeredUser.department, this.registeredUser.username, this.registeredUser.password, this.registeredUser.email);
   }


/*
  constructor(private api:UserService, private router: Router) {
    this.getMyUser();
    this.getAllOfficials();
    console.log(this.token.token)
    this.getAllDepartments();
    this.registeredUser = new User('','',2, null, this.token.university);
  }
  ngOnInit(): void {

  }


  getAllDepartments = () =>{
    this.api.getDepartments(this.token.university).subscribe(
      data =>{
        this.departments = data;
        
      },
      error => {
          console.log(error);
      }
    )
   }

  getMyUser = () =>{
    this.token = this.api.getTokenDean() || '{}';
  }
  toDarkMode(){
    this.router.navigate(['/admin-dark'])
  }

  loggout(){
    this.api.logout();
    this.router.navigate(['/'])
  }

  showMain(){
    this.MainDisplay = true;
    this.PasswordDisplay = false;
    this.UsersDisplay = false;
  }

  showUsers(){
    this.MainDisplay = false;
    this.PasswordDisplay = false;
    this.UsersDisplay = true;
  }

  showPassword(){
    this.MainDisplay = false;
    this.PasswordDisplay = true;
    this.UsersDisplay = false;
  }
   getAllOfficials = () =>{
    this.api.getOfficials().subscribe(
      data =>{
        this.officials = data;
        
      },
      error => {
          console.log(error);
      }
    )
   }

   deleteUser(id){
    this.api.deleteUser(id).subscribe(
      data => {
        alert("Admin deleted");
        this.getAllOfficials();
      },
      error =>{
        console.log(error)
      }
    );
   }
   */
}
