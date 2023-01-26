class ttRepFin{
    cPlanta: string;
    cDist: string;
    cMes1: string;
    deMonto1: number;
    cMes2: string;
    deMonto2: number;
    cMes3: string;
    deMonto3: number;
    deTotal: number;

    constructor(nvaPlanta: string, 
        nvaDist: string,
        nvaMes1: string,
        nvaMonto1: number,
        nvaMes2: string,
        nvaMonto2: number, 
        nvaMes3: string,
        nvaMonto3: number,
        nvaTotal:number){
        this.cPlanta = nvaPlanta;
        this.cDist = nvaDist;
        this.cMes1 = nvaMes1;
        this.deMonto1=nvaMonto1;        
        this.cMes2 = nvaMes2;
        this.deMonto2=nvaMonto2; 
        this.cMes3 = nvaMes3;
        this.deMonto3=nvaMonto3; 
        this.deTotal = nvaTotal;
    }


}