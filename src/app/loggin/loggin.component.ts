import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    console.log("inicio");
    
    this._serviceLog.LoadUser(this.email,this.password ).subscribe(
      result => {
        let respuesta = result.response;
        let mensaje: string = "";
        let resultado: string = "";

        resultado = respuesta.oplRespuesta;
        mensaje = respuesta.opcMensaje;
        
        console.log("<-----------respuesta estadoCuentaGet estado-cuenta.component----------->");
        console.log(respuesta);
        console.log("<-----------respuesta estadoCuentaGet estado-cuenta.component----------->");
      },
      error => {

        console.log("<-----------error estadoCuentaGet estado-cuenta.component----------->");
        console.log(error);
        console.log("<-----------error estadoCuentaGet estado-cuenta.component----------->");

      },
    );    
  }

  login() {
    
  }

}