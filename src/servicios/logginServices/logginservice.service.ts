import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogginserviceService {

  constructor() { }


  LoadUser(vcUsuario: string, vcPassw: string){
    console.log(vcUsuario + vcPassw);
    

  }
}

/*https://www.npmjs.com/package/ts-sql-query*/