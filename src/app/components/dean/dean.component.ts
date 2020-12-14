import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dean',
  templateUrl: './dean.component.html',
  styleUrls: ['./dean.component.css']
})
export class DeanComponent implements OnInit {

  EditsDisplay = false;
  GroupsDisplay = false;
  ImportDisplay = false;
  PasswordDisplay = false;
  MainDisplay= true;
  constructor() { }

  ngOnInit(): void {
    //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
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
