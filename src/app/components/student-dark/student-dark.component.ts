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
  studentID;
  name:String = "";
  chosenField = {id:1, name:'', year:null};
  fields = [{id:1, name:''}];
  exchange ={id: '1', unwanted_subject_id: '', wanted_subject_id: '', priority: '4'};
  exchanges = [{id: '1', unwanted_subject_id: 'Algebra', wanted_subject_id: 'Analiza', priority: '4'}];
  subjects = [{id: '11', name: 'Algebra', day:'Monday', start_time: '09:30', end_time:'11:00'}];
  headers = ['id', 'unwanted_subject_id', 'wanted_subject_id', 'priority'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
  hours = ['8:00-9:30', '9:30-11:00', '11:00-12:30', '12:30-14:00', '14:00-15:30', '15:30-17:00', '17:00-18:30','18:30-20:00'];
  indexes =[0,1,2,3,4,5,6,7];
  start_hours = ['8:00', '9:30', '11:00', '12:30', '14:00', '15:30', '17:00','18:30'];
  end_hours = ['9:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30','20:00'];
  fields = [{id:null, name:'Informatyka'}];
  NewExchangeDisplay = false;
  EditExchangeDisplay = false;
  ChoicesDisplay = false;
  PasswordDisplay = false;
  MainDisplay= true;
  ScheduleDisplay = false;

  constructor(private api:UserService, private router:Router) { 
    this.getMyUser();
    this.getStudentID();
    this.getMyFields(); 
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
  }

  getMyFields(){
    /*
    this.api.getMyFields(this.token.id, this.studentID).subscribe(
      data =>{
        console.log(data)
        this.exchanges = data;
        
      },
      error => {
          console.log(error);
      }
    )*/
  }
  getStudentID(){
    this.api.getStudentID(this.token.id).subscribe(
      data =>{ 
        this.studentID = data[0].id;  
        this.getMyExchanges();  
        this.getAllSubjects();   
      },
      error =>{
        console.log(error);
      })
   }

  getMyExchanges(){   
    this.api.getExchanges(this.token.id, this.studentID).subscribe(
      data =>{
        this.exchanges = data;
        
      },
      error => {
          console.log(error);
      }
    )
   }


 
   getAllSubjects = () =>{
    this.api.getSubjects(this.token.id, this.studentID).subscribe(
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
