import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  /*styleUrls: ['./buzon.component.css'],*/
  providers: [ {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'online'}}],
})




export class BuzonComponent implements OnInit {

  buzon = "Buzón";


  
  constructor() { }

  ngOnInit(): void {

    
  }

}
