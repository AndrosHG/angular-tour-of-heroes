import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogginserviceService {

  constructor(private http: HttpClient) { }


  LoadUser(vcUsuario: string, vcPassw: string): Observable<any>{
    console.log("servicio");
    let params = new HttpParams();

    params = params.append('ipcContrato', "1362023000176");
    

    return this.http.get("http://201.149.45.230:1414/SuautoOnline/rest/SuautoOnlineService/estadoCuenta", { params: params })
    

  }
}

/*https://www.npmjs.com/package/ts-sql-query*/