export class Transaction {
    public iCantidad: number;
    public cPlanta: string;
    public cFactura: string;
    public cSerie: string;
    public dtFecha: string;
    public cModelo: string;
    public cA_M: string;
    public cP: string;
    public cT: string;
    public cTD: string;
    public cC: string;
    public deHoldback: string;

    constructor(){
        this.iCantidad = 0
        this.cPlanta   = ""
        this.cFactura  = ""
        this.cSerie    = "";
        this.dtFecha   = "";
        this.cModelo   = "";
        this.cA_M      = "";
        this.cP        = "";
        this.cT        = "";
        this.cTD       = "";
        this.cC        = "";
        this.deHoldback ="";

    }
}