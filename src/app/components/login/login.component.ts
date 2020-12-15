import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name="";
  constructor() { }

  ngOnInit(): void {
  }
  getVal(val){
    console.log(val)
    this.name = val
  }

}
