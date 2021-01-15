import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [UserService]
})
export class StudentComponent implements OnInit {

  token;
  name:String = "";
  user = {id:'1', name:'Ania', surname:'Kowalska', email: 'ania@wp.pl', password: 'pass', course: 'Informatyka', year:1};
  exchange = {id: '', classEx: '', fromDate: '', fromHour: '', toDate: '', toHour:'', priority: ''};
  exchanges = [{id: '', classEx: '', fromDate: '', fromHour: '', toDate: '', toHour:'', priority: ''}];
  headers = ['id', 'classEx', 'fromDate', 'fromHour', 'toDate', 'toHour', 'priority'];
  NewExchangeDisplay = false;
  EditExchangeDisplay = false;
  ChoicesDisplay = false;
  PasswordDisplay = false;
  MainDisplay= true;
  ScheduleDisplay = false;
  constructor(private api:UserService) { }
  
  ngOnInit(): void {
    this.token = this.api.getTokenStudent();
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

  }
  getMyExchanges = (userData:String) =>{
    this.api.getExchanges(userData).subscribe(
      data =>{
        console.log(data)
        this.exchanges = data;
        
      },
      error => {
          console.log(error);
      }
    )
   }
   logout(){
     this.api.logout();
   }
  addExchange() {
    this.api.addExchange(this.exchange).subscribe(
      response => {
        alert('User ' + this.exchange.id + 'has been added to database')
      },
      error =>{
        console.log(error)
      }
    );
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
    this.getMyExchanges("1")
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
