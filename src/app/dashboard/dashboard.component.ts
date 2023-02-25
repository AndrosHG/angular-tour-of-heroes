import { Component, OnInit, Inject, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { CsvService } from 'src/servicios/csv.service';
import { Transaction } from '../clases/ttEntrada.model';
import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

import { DistribuidoraServicesService } from '../../servicios/distribuidoraService/distribuidora-services.service';
import { MatDialog, } from '@angular/material/dialog';


import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

const THUMBUP_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
  `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
  `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>
`;


interface Dist {
  dist: string;
  planta: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

interface Meses {
  nombre: string;
  id: number;
}

interface Periodo {
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
  providers: [CsvService, DistribuidoraServicesService]
})



@Injectable({
  providedIn: 'root',

})

export class DashboardComponent implements OnInit {
  constructor(private _csvService: CsvService,
    private _DistService: DistribuidoraServicesService,
    public dialog: MatDialog,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 

      iconRegistry.addSvgIconLiteral('thumbs-up', sanitizer.bypassSecurityTrustHtml(THUMBUP_ICON));
    }

  
    
  nota = "Campos Obligatorios";
  selected = "";
  tiempo = "";
  viMesSelect = 0;
  TotalHB = 0;
  name = "Holdback.xlsx";
  vcAnio = "";
  vcQna = "";
  vcArchivo1 = "";
  vcArchivo2 = "";
  vcArchivo3 = "";

  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight'];
  dataSource = ELEMENT_DATA;

  public ArraySalida: any = [];
  public importedData: Array<any> = [];
  public importedEntrada: Array<Transaction> = [];
  public importedSalida: Array<any> = [];
  public importedRep: Array<any> = [];

  public ReporteMes: Array<any> = [];
  public ReporteTrimestral: Array<any> = [];
  public ReporteFinal: Array<any> = [];

  ngOnInit() {
    this._DistService.GetDist();
  }

  meses: Meses[] = [
    { nombre: 'ENERO', id: 1 },
    { nombre: 'FEBRERO', id: 2 },
    { nombre: 'MARZO', id: 3 },
    { nombre: 'ABRIL', id: 4 },
    { nombre: 'MAYO', id: 5 },
    { nombre: 'JUNIO', id: 6 },
    { nombre: 'JULIO', id: 7 },
    { nombre: 'AGOSTO', id: 8 },
    { nombre: 'SEPTIEMBRE', id: 9 },
    { nombre: 'OCTUBRE', id: 10 },
    { nombre: 'NOVIEMBRE', id: 11 },
    { nombre: 'DICIEMBRE', id: 12 },
  ];

  periodo: Periodo[] = [
    { periodo: 'PRIMER  TRIMESTRE', mes1: 'NOVIMEBRE', mes2: 'DICIEMBRE', mes3: 'ENERO', id: 1 },
    { periodo: 'SEGUNDO TRIMESTRE', mes1: 'FEBRERO', mes2: 'MARZO', mes3: 'ABRIL', id: 2 },
    { periodo: 'TERCER  TRIMESTRE', mes1: 'MAYO', mes2: 'JUNIO', mes3: 'JULIO', id: 3 },
    { periodo: 'CUARTO  TRIMESTRE', mes1: 'AGOSTO', mes2: 'SEPTIEMBRE', mes3: 'OCTUBRE', id: 4 },
  ]

  dist: Dist[] = [
    { planta: '101', dist: 'AEROPLAZA' },
    { planta: '164', dist: 'FR AUTOMOTRIZ' },
    { planta: '180', dist: 'GRUPO ITSMO' },
    { planta: '207', dist: 'CUAUTLA' },
    { planta: '243', dist: 'CALIDADSANJERA' }

  ]

  selectMes(vcMes: String) {
    const vcPeriodo = this.periodo.find(vcmesP => vcmesP.mes1 == vcMes || vcmesP.mes2 == vcMes || vcmesP.mes3 == vcMes);
    if (vcPeriodo != undefined) {
      this.tiempo = vcPeriodo?.periodo;
    }
    const viMesID = this.meses.find(viMes => viMes.nombre == vcMes);
    if (viMesID != undefined) {
      this.viMesSelect = viMesID?.id;
    }
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

  /*Reporte Trimestral*/
  public async importDataFromCSVByTypeR(event: any) {
    let fileContent = "";
    let viFile = 0;
    fileContent = await this.getTextFromFile(event);
    this.ReporteMes = this._csvService.importDataFromCSVByType(
      fileContent,
      new Transaction()
    );

    if (this.ReporteTrimestral.length === 0) {
      viFile = 1;
      this.vcArchivo1 = event.target.files[0].name;
    } else {
      viFile = 2;
      const found = this.ReporteTrimestral.find(element => element.d === viFile);
      if (found == undefined) {
        viFile = 2;
        this.vcArchivo2 = event.target.files[0].name;
      } else {
        viFile = 3;
        this.vcArchivo3 = event.target.files[0].name;
      }
    }

    for (let a = 0; a < this.ReporteMes.length; a++) {
      this.ReporteMes[a].d = viFile;
      this.ReporteTrimestral.push(this.ReporteMes[a]);

    }
  }
  /*------------------*/

  CreaReporteFin() {
    if (this.ReporteTrimestral.length === 0) {
      return;
    }

    for (let i = 0; i < this.ReporteTrimestral.length; i++) {
      if (this.ReporteTrimestral[i].a != null) {

        if (this.ReporteFinal.length === 0) {
          this.ReporteFinal.push(this.ReporteTrimestral[i]);
        } else {
          const found = this.ReporteFinal.find(element => element.a === this.ReporteTrimestral[i].a);
          if (found == undefined) {
            this.ReporteFinal.push(this.ReporteTrimestral[i]);
          }
        }
      }
    }


    for (let i = 0; i < this.ReporteFinal.length; i++) {
      let total1 = "0", total2 = "0", total3 = "0";

      if (this.ReporteFinal[i].a != null) {

        const avaiDist1 = this.ReporteTrimestral.find(cElemento => cElemento.a === this.ReporteFinal[i].a && cElemento.d === 1);
        if (avaiDist1 != undefined) {
          total1 = avaiDist1?.c;
        } else {
          total1 = "0";
        }
        const avaiDist2 = this.ReporteTrimestral.find(cElemento => cElemento.a === this.ReporteFinal[i].a && cElemento.d === 2);
        if (avaiDist2 != undefined) {
          total2 = avaiDist2?.c;
        } else {
          total2 = "0";
        }
        const avaiDist3 = this.ReporteTrimestral.find(cElemento => cElemento.a === this.ReporteFinal[i].a && cElemento.d === 3);
        if (avaiDist3 != undefined) {
          total3 = avaiDist3?.c;
        } else {
          total3 = "0";
        }

        let vdeImporteFin = (total1) + (total2) + (total3);

        this.ReporteFinal[i].c = total1;
        this.ReporteFinal[i].d = total2;
        this.ReporteFinal[i].e = total3;
        this.ReporteFinal[i].f = String(parseFloat(vdeImporteFin).toFixed(2));

      }
    }
    this.ExportaRep(this.ReporteFinal, "");
  }

  private async getTextFromFile(event: any) {
    console.log(event.target.files[0].name);
    const file: File = event.target.files[0];
    let fileContent = await file.text();
    return fileContent;
  }

  Procesar() {
    this.dataSource = [];
    this.importedSalida = [];
    this.importedRep = [];
    this.importedEntrada = [];
    this.TotalHB = 0;
    let ELEMENT_DAT: any = [];


    for (let i = 0; i < this.importedData.length; i++) {
      if (this.importedData[i].a !== null) {
        this.importedData[i].b = this.importedData[i].b.substring(5);

        const avaiDist = this.dist.find(cPlanta => cPlanta.planta === this.importedData[i].b);
        this.importedData[i].c = avaiDist?.dist;

        if (this.importedSalida.length === 0) {
          this.importedSalida.push(this.importedData[i]);
        }
        else {
          const found = this.importedSalida.find(element => element.b === this.importedData[i].b);
          if (found != undefined) {
            for (let j = 0; j < this.importedSalida.length; j++) {
              if (this.importedSalida[j].b === this.importedData[i].b) {
                this.importedSalida[j].l = parseFloat(this.importedSalida[j].l) + parseFloat(this.importedData[i].l)
              }
            }
          }
          else {
            this.importedSalida.push(this.importedData[i]);
          }
          const avai = this.importedRep.find(element => element.a === this.importedData[i].b);
          if (avai != undefined) {
            for (let a = 0; a < this.importedRep.length; a++) {
              if (this.importedRep[a].dist === this.importedData[a].b) {
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
    row.push("Holdback_" + this.vcQna + "_" + this.viMesSelect + "_" + this.vcAnio);
    this.importedRep.push(row);

    var row = new Array();
    row.push(" ");
    this.importedRep.push(row);

    var row = new Array();
    row.push("PLANTA")
    row.push("DISTRIBUIDORA")
    row.push("IMPORTE $")
    this.importedRep.push(row);



    for (let a = 0; a < this.importedSalida.length; a++) {
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

    this.dataSource = ELEMENT_DAT;
    /*this.ExportaRep(this.importedRep, "");*/
  }

  ExportaRep(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Holdback': worksheet },
      SheetNames: ['Holdback']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);

    


  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    let data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + "Holdback_" + this.vcQna + "_" + this.viMesSelect + "_" + this.vcAnio + EXCEL_EXTENSION);

    let vcCadena = "";

    /*for (let a = 0; a < this.importedSalida.length; a++) {
      vcCadena = vcCadena + this.importedSalida[a].b + "," + this.importedSalida[a].c + "," + this.importedSalida[a].l + "\n";
    }

    let blob = new Blob([vcCadena], { type: "csv/plain;charset=utf-8" });
    FileSaver.saveAs(blob, fileName + "Holdback_" + this.vcQna + "_" + this.viMesSelect + "_" + this.vcAnio + ".csv");*/
  }

  LimpiarPantalla() {
    this.dataSource = [];
    this.importedData = [];
    this.importedEntrada = [];
    this.importedSalida = [];
    this.importedRep = [];
    this.ReporteFinal = [];
    this.ReporteMes = [];
    this.ReporteFinal = [];
    this.viMesSelect = 0;
    this.TotalHB = 0;
    this.selected = "";
    this.tiempo = "";
    this.vcArchivo1 = "";
    this.vcArchivo2 = "";
    this.vcArchivo3 = "";
  }
}


/*
Formato excel
https://learn.microsoft.com/es-es/office/dev/add-ins/excel/excel-add-ins-workbooks*/