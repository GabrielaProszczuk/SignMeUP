import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-dark',
  templateUrl: './student-dark.component.html',
  styleUrls: ['./student-dark.component.css'],
  providers: [UserService]
})
export class StudentDarkComponent implements OnInit {

  token;
  name:String = "";
  exchange ={id: '1', unwanted_subject_id: '', wanted_subject_id: '', priority: '4'};
  exchanges = [{id: '1', unwanted_subject_id: 'Algebra', wanted_subject_id: 'Analiza', priority: '4'}];
  subjects = [{id: '', name: 'algebra', day:'', start_time: '', end_time:''}];
  headers = ['id', 'unwanted_subject_id', 'wanted_subject_id', 'priority'];
  NewExchangeDisplay = false;
  EditExchangeDisplay = false;
  ChoicesDisplay = false;
  PasswordDisplay = false;
  MainDisplay= true;
  ScheduleDisplay = false;

  constructor(private api:UserService, private router:Router) { 
    this.getMyUser();
    this.getMyExchanges();
    this.getAllSubjects();
  }
  
  ngOnInit(): void {
    this.token = this.api.getTokenStudent();
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

  }

  toLightMode(){
    this.router.navigate(['/student'])
  }
  getMyUser = () =>{
    this.token = this.api.getTokenStudent() || '{}';
    console.log(this.token);
  }
  getMyExchanges = () =>{
    console.log(this.token.id)
    this.api.getExchanges(this.token.id, this.token.student_id).subscribe(
      data =>{
        console.log(data)
        this.exchanges = data;
        
      },
      error => {
          console.log(error);
      }
    )
   }
   getAllSubjects = () =>{
    this.api.getSubjects(this.token.university, this.token.department, this.token.year_id, this.token.field_id).subscribe(
      data =>{
        console.log(data);
        this.subjects = data;
        
      },
      error => {
          console.log(error);
      }
    )
   }
   logout(){
     this.api.logout();
     this.router.navigate(['/'])
   }
  addExchange() {
    this.api.addExchange(this.token.id, this.token.student_id, this.exchange).subscribe(
      response => {
        alert('User ' + this.exchange.id + 'has been added to database')
      },
      error =>{
        console.log(error)
      }
    );
   }
   deleteExchange(exchangeID){
    this.api.deleteApp(this.token.id, this.token.student_id, exchangeID);
    this.getMyExchanges();
   }
  makeNewExchange() {
    this.NewExchangeDisplay = true;
    this.EditExchangeDisplay = false;
    this.ChoicesDisplay = false;
    this.PasswordDisplay = false;
    this.MainDisplay= false;
    this.ScheduleDisplay = false;
  }

  editExchanges() {
    this.NewExchangeDisplay = false;
    this.EditExchangeDisplay = true;
    this.ChoicesDisplay = false;
    this.PasswordDisplay = false;
    this.MainDisplay= false;
    this.ScheduleDisplay = false;
 
  }
  showMain(){
    this.NewExchangeDisplay = false;
    this.EditExchangeDisplay = false;
    this.ChoicesDisplay = false;
    this.PasswordDisplay = false;
    this.MainDisplay= true;
    this.ScheduleDisplay = false;
  }
  showChoices(){
    this.NewExchangeDisplay = false;
    this.EditExchangeDisplay = false;
    this.ChoicesDisplay = true;
    this.PasswordDisplay = false;
    this.MainDisplay= false;
    this.ScheduleDisplay = false;
  }
  changePassword(){
    this.NewExchangeDisplay = false;
    this.EditExchangeDisplay = false;
    this.ChoicesDisplay = false;
    this.PasswordDisplay = true;
    this.MainDisplay= false;
    this.ScheduleDisplay = false;
  }
  showSchedule(){
    this.NewExchangeDisplay = false;
    this.EditExchangeDisplay = false;
    this.ChoicesDisplay = false;
    this.PasswordDisplay = false;
    this.MainDisplay= false;
    this.ScheduleDisplay = true;
  }
}
