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
  departments: any;
  officials: any;
  headers = ["username", "email"];
  registeredUser: {email: string, department: number, password: string, username: string};
  MainDisplay = true;
  UsersDisplay = false;
  PasswordDisplay = false;
  name: any;
  addedInfo = false;
  addedDepInfo = false;
  newDepartment: string;

  constructor(private apollo: Apollo, private api:UserService, private router: Router){ 
    this.registeredUser = {email: '', department: 0, password: '', username: ''};
    this.newDepartment = '';
   }
  
  ngOnInit(){ 
    this.addedInfo = false;
    this.addedDepInfo = false;
    this.name = localStorage.getItem('username');
    this.api.getDepartments()
    this.departments = JSON.parse(localStorage.getItem('departments') || '')
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

  addUser() {
    this.api.addUser(Number(this.registeredUser.department), this.registeredUser.username, this.registeredUser.password, this.registeredUser.email);
    this.addedInfo = true
   }

   addDepartment(){
     this.api.addDepartment(this.newDepartment)
     this.addedDepInfo = true;   
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

}
