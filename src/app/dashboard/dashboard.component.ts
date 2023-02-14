import { Component, OnInit, Inject, CUSTOM_ELEMENTS_SCHEMA, ElementRef} from '@angular/core';
import { CsvService } from 'src/servicios/csv.service';  
import { Transaction } from '../clases/ttEntrada.model';
import { Injectable } from '@angular/core';
import * as FileSaver   from 'file-saver';
import * as XLSX from 'xlsx';

import { LogginserviceService } from 'src/servicios/logginServices/logginservice.service';
import { DistribuidoraServicesService } from '../../servicios/distribuidoraService/distribuidora-services.service';
import { MatDialogRef, MatDialog, } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';


interface Dist{
  dist: string;
  planta:string;
}

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;    
  }

  export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
  }

  interface Meses{
    nombre: string;
    id:number; 
  }

  interface Periodo{
    periodo: string;
    mes1: string;
    mes2: string;
    mes3: string;
    id: number;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [];
  const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const EXCEL_EXTENSION = '.xlsx';
  
 

 
  
  @Component({
    selector: 'app-grid',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [CsvService,DistribuidoraServicesService]
  })

  

  @Injectable({
    providedIn: 'root',
    
 })


  
 
export class DashboardComponent implements OnInit {
  constructor(private _csvService: CsvService,
              private _DistService: DistribuidoraServicesService,    
              public dialog: MatDialog) 
              { }
  
            
                            
                                 
   
  nota   = "Campos Obligatorios";
  selected = "";
  tiempo   = "";
  viMesSelect = 0;
  TotalHB = 0;
  name    = "Holdback.xlsx";
  vcAnio = "";
  vcQna = "";
  //mensaje = "¿Quitar datos de pantalla?"

  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight'];
  dataSource = ELEMENT_DATA;

  public ArraySalida:any  = [];
  public importedData:Array<any> = [];
  public importedEntrada:Array<Transaction> = [];
  public importedSalida:Array<any> = [];
  public importedRep:Array<any> = [];
  public ReporteTrimestral:Array<any> = [];
 
  ngOnInit() {
    this._DistService.GetDist();        
  }

  meses:  Meses[]=[
    {nombre: 'ENERO', id: 1},
    {nombre: 'FEBRERO', id: 2},
    {nombre: 'MARZO', id: 3},
    {nombre: 'ABRIL', id: 4},
    {nombre: 'MAYO', id: 5},
    {nombre: 'JUNIO', id: 6},
    {nombre: 'JULIO', id: 7},
    {nombre: 'AGOSTO', id: 8},
    {nombre: 'SEPTIEMBRE', id: 9},
    {nombre: 'OCTUBRE', id: 10},
    {nombre: 'NOVIEMBRE', id: 11},
    {nombre: 'DICIEMBRE', id: 12},
  ];

  periodo: Periodo[]=[
    {periodo:'PRIMER  TRIMESTRE', mes1:'NOVIMEBRE', mes2: 'DICIEMBRE',  mes3: 'ENERO',   id: 1},
    {periodo:'SEGUNDO TRIMESTRE', mes1:'FEBRERO',   mes2: 'MARZO',      mes3: 'ABRIL',   id: 2},
    {periodo:'TERCER  TRIMESTRE', mes1:'MAYO',      mes2: 'JUNIO',      mes3: 'JULIO',   id: 3},
    {periodo:'CUARTO  TRIMESTRE', mes1:'AGOSTO',    mes2: 'SEPTIEMBRE', mes3: 'OCTUBRE', id: 4},
  ]

  dist: Dist[]=[
    {planta:'101', dist:'AEROPLAZA'},
    {planta:'164', dist:'FR AUTOMOTRIZ'},
    {planta:'180', dist:'GRUPO ISMO'},
    {planta:'207', dist:'CUAUTLA'},
    {planta:'243', dist:'CALIDA SANJERA'}

  ]
  public saveDataInCSV(name: string, data: Array<any>): void {
    let csvContent = this._csvService.saveDataInCSV(data);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' ;
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }

  
   
  selectMes(vcMes: String){     
    for (let i = 0; i < this.periodo.length; i++) {
      if(this.periodo[i].mes1 == vcMes || 
        this.periodo[i].mes2 == vcMes ||
        this.periodo[i].mes3 == vcMes ){
        this.tiempo = this.periodo[i].periodo;
      }
    }

    for(let j =0;  j < this.meses.length; j++){
        if(this.meses[j].nombre === vcMes){
          this.viMesSelect = this.meses[j].id;
        }      
    }       
  }

  public async importDataFromCSV(event: any) {
    let fileContent = await this.getTextFromFile(event);       
    this.importedData = this._csvService.importDataFromCSV(fileContent);
  }
  
  public async importDataFromCSVByType(event: any) {    
    this.LimpiarPantalla();
    let fileContent = "";      
        fileContent = await this.getTextFromFile(event);
        this.importedData = this._csvService.importDataFromCSVByType(
        fileContent,
        new Transaction()
      );

  }
  private async getTextFromFile(event:any){           
    console.log(event.target.files[0]);    
    const file: File = event.target.files[0];
    let fileContent = await file.text();   
    return fileContent;
  }

  probando(){         
    this.dataSource = [];
    this.importedSalida = [];
    this.importedRep = [];
    this.importedEntrada = [];
    this.TotalHB    = 0;
    let  ELEMENT_DAT: any = [];   
       

    for (let i = 0; i < this.importedData.length; i++) {      
      if(this.importedData[i].a !== null){ 
        this.importedData[i].b  =  this.importedData[i].b.substring(5);  

        console.log("dist-->", this.importedData[i].b);
        

        const avaiDist = this.dist.find(cPlanta => cPlanta.planta === this.importedData[i].b );
        this.importedData[i].c = avaiDist?.dist;
        
        if(this.importedSalida.length === 0){        
          this.importedSalida.push(this.importedData[i]);          
        }
        else{
          const found = this.importedSalida.find(element => element.b === this.importedData[i].b);   
          if(found != undefined){
            for(let j = 0; j < this.importedSalida.length; j++){
              if(this.importedSalida[j].b === this.importedData[i].b){
                this.importedSalida[j].l = parseFloat(this.importedSalida[j].l) + parseFloat(this.importedData[i].l)
              }
            }                                  
          }
          else{
            this.importedSalida.push(this.importedData[i]);                                              
          }
          const avai = this.importedRep.find(element => element.a === this.importedData[i].b);   
          if(avai != undefined){
            for(let a = 0; a < this.importedRep.length; a++){
              if(this.importedRep[a].b === this.importedData[a].b){
                this.importedRep[a].l = parseFloat(this.importedRep[a].l) + parseFloat(this.importedData[i].l)
              }
            }                                  
          }
        } 
        ELEMENT_DAT = this.importedSalida;
        this.TotalHB = this.TotalHB + parseFloat(this.importedData[i].l);        
      }                                
    }

    var row = new Array();
    row.push("Asociacion Mexicana de Distribuidores General Motors, A.C.");
    this.importedRep.push(row);

    var row = new Array();
    row.push("Holdback_" + this.vcQna + "_" +  this.viMesSelect + "_" + this.vcAnio );
    this.importedRep.push(row);

    var row = new Array();
    row.push(" ");
    this.importedRep.push(row);

    var row = new Array();
    row.push("PLANTA")
    row.push("DISTRIBUIDORA")
    row.push("IMPORTE $")
    this.importedRep.push(row); 

    

    for(let a = 0; a < this.importedSalida.length; a++ ){
        var row = new Array();
        row.push(this.importedSalida[a].b)
        row.push(this.importedSalida[a].c)
        row.push(this.importedSalida[a].l)
        this.importedRep.push(row); 
    }


    var row = new Array();
    row.push("")
    row.push("TOTAL:")
    row.push(this.TotalHB)
    this.importedRep.push(row); 

    this.dataSource =   ELEMENT_DAT;
    this.ExportaRep(this.importedRep, ""); //importe de salida
  }  
  
  ExportaRep(json: any[], excelFileName: string):void{ 
   
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'Holdback': worksheet }, 
    SheetNames: ['Holdback'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, excelFileName);

  }

  

  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    let data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + "Holdback_" + this.vcQna + "_" +  this.viMesSelect + "_" + this.vcAnio + EXCEL_EXTENSION);

    let vcCadena = "";

    for(let a = 0; a < this.importedSalida.length; a++ ){
      vcCadena = vcCadena  + this.importedSalida[a].b + " " + this.importedSalida[a].c + " " + this.importedSalida[a].l + "\n";
    }
            
    let blob = new Blob([vcCadena], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob,  fileName + "Holdback_" + this.vcQna + "_" +  this.viMesSelect + "_" + this.vcAnio + ".txt");
  }

  LimpiarPantalla(){
    this.dataSource = [];
    this.importedData = [];
    this.importedEntrada = [];
    this.importedSalida = [];
    this.importedRep = [];
    this.viMesSelect = 0;
    this.TotalHB = 0;
    this.selected = "";
    this.tiempo = "";
  }

    openDialog() {
      const dialogRef = this.dialog.open(DialogContentExampleDialog);
      
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        
      });
    }
  }


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogContentExampleDialog {}
 