export class CsvService {
  public saveDataInCSV(data: Array<any>): string {
    if (data.length == 0) {
      return '';
    }

    let propertyNames = Object.keys(data[0]);
    let rowWithPropertyNames = propertyNames.join(',') + '\n';

    let csvContent = rowWithPropertyNames;

    let rows: string[] = [];

    data.forEach((item) => {
      let values: string[] = [];

      propertyNames.forEach((key) => {
        let val: any = item[key];

        if (val !== undefined && val !== null) {
          val = new String(val);
        } else {
          val = '';
        }
        values.push(val);
      });
      rows.push(values.join(','));
    });
    csvContent += rows.join('\n');

    return csvContent;
  }

  public importDataFromCSV(csvText: string): Array<any> {
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

    let dataArray: any[] = [];
    dataRows.forEach((row) => {
      let values = row.split(',');

      let obj: any = new Object();

      for (let index = 0; index < propertyNames.length; index++) {
        const propertyName: string = propertyNames[index];

        let val: any = values[index];
        if (val === '') {
          val = null;
        }

        obj[propertyName] = val;
      }

      dataArray.push(obj);
    });

    return dataArray;
  }

  public importDataFromCSVByType(csvText: string, obj: any): Array<any> {
    let resultados = 'a,b,c,d,e,f,g,h,i,j,k,l,m' + '\r' + '\n' + csvText;

   

    const propertyNames = resultados.slice(0, resultados.indexOf('\n') ).split(',');
    
    const dataRows =  resultados.slice(resultados.indexOf('\n')).split('\n');

    
    let dataArray: any[] = [];
    dataRows.forEach((row) => {
      let values = row.split(',');

      let dataObj: any = new Object();
      for (let index = 0; index < propertyNames.length; index++) {
        const propertyName: string = propertyNames[index];

        let value: any = values[index];
        if (value === '') {
          value = null;
        }


        if (typeof obj[propertyName] === 'undefined') {
          dataObj[propertyName] = value;
        } 
        
      }

      dataArray.push(dataObj);
    });

    return dataArray;
  }
    
    
  }