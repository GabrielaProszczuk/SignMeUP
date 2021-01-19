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
  
  token: any;
  officials = [{id: 1, email: 'jola@jola.pl'}];
  departments = [{id:1, name: 'weaiib', university:'' }, {id:2, name:'wiet', university:''}, {id:3, name:'wimip', university:''}];
  headers = ["id", "email"];
  registeredUser: User;
  MainDisplay = true;
  UsersDisplay = false;
  PasswordDisplay = false;


  constructor(private api:UserService, private router: Router) {
    this.getMyUser();
    this.getAllOfficials();
    console.log(this.token.token)
    this.getAllDepartments();
    this.registeredUser = new User('','',2, 0, this.token.university);
  }
  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
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
    this.api.getOfficials().subscribe(
      data =>{
        this.officials = data;
        
      },
      error => {
          console.log(error);
      }
    )
   }
   addUser() {
    this.api.addUser(this.registeredUser).subscribe(
      response => {
        alert('User has been added to database');
        this.getAllOfficials();
      },
      error =>{
        console.log(error)
      }
    );
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
