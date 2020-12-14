import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  NewExchangeDisplay = false;
  EditExchangeDisplay = false;
  ChoicesDisplay = false;
  PasswordDisplay = false;
  MainDisplay= true;
  ScheduleDisplay = false;
  constructor() { }

  ngOnInit(): void {
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
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
