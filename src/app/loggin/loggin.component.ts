import { Component } from '@angular/core';
import { LogginserviceService } from 'src/servicios/logginServices/logginservice.service'
import { HttpClientModule } from "@angular/common/http";



@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})




export class LogginComponent  {
  
  email!: string;
  password!: string;

 
  
  constructor(private _serviceLog: LogginserviceService ) { }

  

  login() {
    this._serviceLog.LoadUser(this.email,this.password );
  }

}