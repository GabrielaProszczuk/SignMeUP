import { Component, OnInit} from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-admin-dark',
  templateUrl: './admin-dark.component.html',
  styleUrls: ['./admin-dark.component.css'],
  providers: [UserService]
})
export class AdminDarkComponent implements OnInit {
  
  token;
  officials = [{id: 1, email: 'jola@jola.pl '}];
  departments = [{id:1, name: 'agh'}, {id:2, name:'pw'}, {id:3, name:'uj'}];
  headers = ["id", "email"];
  registeredUser: User;
  MainDisplay = true;
  UsersDisplay = false;
  PasswordDisplay = false;


  constructor(private api:UserService, private router: Router) {
    this.getMyUser();
    //this.getAllOfficials();
    this.getAllDepartments();
    this.registeredUser = new User('','',2, null, this.token.university);
    
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
  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
  getMyUser = () =>{
    this.token = this.api.getTokenDean() || '{}';
    console.log(this.token.first_name);
  }
  toLightMode(){
    this.router.navigate(['/admin'])
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
    this.api.getOfficials(this.token.university).subscribe(
      data =>{
        this.officials = data;
        
      },
      error => {
          console.log(error);
      }
    )
   }
   addUser() {
     console.log(this.registeredUser);
    this.api.addUser(this.registeredUser).subscribe(
      response => {
        alert('User ' + this.registeredUser.username + 'has been added to database')
      },
      error =>{
        console.log(error)
      }
    );
   }
   deleteUser(user){
    this.api.deleteUser(user).subscribe(
      data => {
        this.getAllOfficials();
      },
      error =>{
        console.log(error)
      }
    );
   }
}
