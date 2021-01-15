import { Component, OnInit} from '@angular/core';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user'
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [UserService]
})
export class AdminComponent implements OnInit {
  
  token;
  officials = [{id: 1, first_name: 'Jola', last_name: 'Jolka', email: 'jola@jola.pl '}];
  headers = ["id", "first_name", "last_name", "email"];
  registeredUser: User;
  
  constructor(private api:UserService) {
    this.getTokenUSer();
    this.getAllOfficials();
    this.registeredUser = new User('','','','','',2,this.token.university);
  }
   ngOnInit(): void {

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

   getTokenUSer(){
     this.token = this.api.getTokenUser() || '{}';
     console.log(this.token)
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
