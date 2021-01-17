import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [UserService]
})
export class StudentComponent implements OnInit {

  token;
  studentID;
  points = 40;
  name:String = "";
  chosenField = {id:1, name:'', year:null};
  fields = [{id:1, name:''}];
  exchange ={id: '1', unwanted_subject_id: '', wanted_subject_id: '', priority: '4'};
  exchanges = [{id: '1', unwanted_subject_id: 'Algebra', wanted_subject_id: 'Analiza', priority: '4'}];
  subjects = [{id: '11', name: 'Algebra', day:'Monday', start_time: '09:30', end_time:'11:00'}];
  headers = ['id', 'unwanted_subject_id', 'wanted_subject_id', 'priority'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
  indexes = [0,1,2,3,4,5,6,7];

  myClasses = [
  {name: 'Matematyka', lecturer: '',description:'', day: 'Monday', type: '', start_time: '8:00', end_time: '9:30', field_of_study: ''},
  {name: 'Język Polski', lecturer: '',description:'', day: 'Tuesday', type: '', start_time: '9:30', end_time: '11:00', field_of_study: ''},
  {name: 'Język Angielski', lecturer: '',description:'', day: 'Wednesday', type: '', start_time: '11:00', end_time: '12:30', field_of_study: ''},
  {name: 'Fizyka superzaawansowana', lecturer: '',description:'', day: 'Thursday', type: '', start_time: '14:00', end_time: '15:30', field_of_study: ''},
  {name: 'Chemia też superzaawansowana', lecturer: '',description:'', day: 'Friday', type: '', start_time: '17:00', end_time: '18:30', field_of_study: ''},
  {name: 'WOS bardzo nudny', lecturer: '',description:'', day: 'Wednesday', type: '', start_time: '12:30', end_time: '14:00', field_of_study: ''},
  {name: 'Historia i społeczeństwo', lecturer: '',description:'', day: 'Tuesday', type: '', start_time: '11:00', end_time: '12:30', field_of_study: ''}];

  hours = ['8:00-9:30', '9:30-11:00', '11:00-12:30', '12:30-14:00', '14:00-15:30', '15:30-17:00', '17:00-18:30','18:30-20:00'];
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

  toDarkMode(){
    this.router.navigate(['/student-dark'])
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
