import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from './../../services/user.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dean-dark',
  templateUrl: './dean-dark.component.html',
  styleUrls: ['./dean-dark.component.css'],
  providers: [UserService]
})
export class DeanDarkComponent implements OnInit {

  token;
  EditsDisplay = false;
  GroupsDisplay = false;
  ImportDisplay = false;
  PasswordDisplay = false;
  MainDisplay= true;
  chosenYear={id:1, start_year: null};
  chosenField = {id:1, name:'', year:null};
  years = [{id:1, start_year: null}];
  fields = [{id:1, name:'ugh'}]
  users = [{id: null, first_name: '', last_name: '', email: ''}];
  headers = ["id", "first_name", "last_name", "email"];
  constructor(private api:UserService, private router:Router) {
    this.getMyUser();
    this.getAllYears();
   }

  toLightMode(){
    this.router.navigate(['/dean'])
  }

  loggout(){
    this.api.logout();
    this.router.navigate(['/'])
  }

  getMyUser = () =>{
    this.token = this.api.getTokenDean() || '{}';
    console.log(this.token);
  }
  ngOnInit(): void {
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  getAllYears(){
    this.api.getYears(this.token.department).subscribe(
      data =>{
        this.chosenYear = data;
        console.log(data)
      },
      error => {
          console.log(error);
      }
    )
  }
  getAllFields(){
    this.api.getFields(this.token.university, this.token.department, this.chosenYear).subscribe(
      data =>{
        this.fields = data;
        console.log(data)
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
