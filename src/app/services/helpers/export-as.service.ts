
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';



import { Injectable } from '@angular/core';
import { PasseDataService } from '../passe-data.service';

 
// .doc	Microsoft Word	application/msword
// .docx	Microsoft Word (OpenXML)	application/vnd.openxmlformats-officedocument.wordprocessingml.document
const EXCEL_TYPE_XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION_XLSX = '.xlsx';
const EXCEL_TYPE_XLS = 'application/vnd.ms-excel;charset=UTF-8';
const EXCEL_EXTENSION_XLS = '.xls';
const EXCEL_TYPE_CSV = 'text/csv;charset=UTF-8';
const EXCEL_EXTENSION_CSV = '.csv';
const EXCEL_TYPE_PDF = 'application/pdf;charset=UTF-8';
const EXCEL_TYPE_JSON = 'application/json;charset=UTF-8';
const EXCEL_EXTENSION_PDF = ".pdf";
const EXCEL_EXTENSION_JSON = ".json";

@Injectable({
    providedIn: 'root'
  })
export  class ExportAsService{

  constructor(public passeDataService:PasseDataService){
    
  }
    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
      }
      private saveAsExcelFile(buffer: any, fileName: string,type:string="xlsx"): void {
        if(type=="xlsx"){
          const data: Blob = new Blob([buffer], {type: EXCEL_TYPE_XLSX});
          // FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION_XLSX);
          FileSaver.saveAs(data, fileName + ''+ EXCEL_EXTENSION_XLSX);
        }else if(type=="xls"){
          const data: Blob = new Blob([buffer], {type: EXCEL_TYPE_XLS});
          // FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION_XLS);
          FileSaver.saveAs(data, fileName + ''+ EXCEL_EXTENSION_XLS);
        }else if(type=="csv"){
          const data: Blob = new Blob([buffer], {type: EXCEL_TYPE_CSV});
          // FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION_CSV);
             FileSaver.saveAs(data, fileName + ''  + EXCEL_EXTENSION_CSV);
        }
     
      }
      private saveAsPdfFile(buffer: any): any {
        const data: Blob = new Blob([buffer], {type: EXCEL_TYPE_PDF});
      return data;
     }
    public saveAsJson(data){
     
      var json = JSON.stringify(data);
      var blob = new Blob([json], {type: EXCEL_TYPE_JSON});
      var url  = URL.createObjectURL(blob);
      
    }
      public  exportAsPdf(file_name:string,head:string[][],data:any){
  
     
       let pdf = new jspdf(); // A4 size page of PDF
        pdf.autoTable({
          theme:'grid',
          headStyles: {textColor:[255, 255, 255],fillColor:[0,0,0]},
          // bodyStyles 
          // footStyles
           styles: {textColor:[0, 0, 0],fillColor: [255, 255, 255]},
          // columnStyles: {0: {halign: 'center', fillColor: [0, 0, 0]}}, // Cells in first column centered and green
          margin: {top: 10},
          head: head,body:data});
        pdf.autoPrint();
        pdf.save(''+file_name+EXCEL_EXTENSION_PDF); // Generated PDF
    
      }
      public  printAsPdf(data:any,head:string[][]){
        let pdf = new jspdf(); // A4 size page of PDF
        pdf.autoTable({
          theme:'grid',
          headStyles: {textColor:[255, 255, 255],fillColor:[0,0,0]},
          // bodyStyles 
          // footStyles
           styles: {textColor:[0, 0, 0],fillColor: [255, 255, 255]},
          // columnStyles: {0: {halign: 'center', fillColor: [0, 0, 0]}}, // Cells in first column centered and green
          margin: {top: 10},
          head: head,body:data});
        pdf.autoPrint();
        window.open(pdf.output('bloburl'), '_blank');
   
 
      }
     public exportAsImage(target_name:string,type_img:string="image/png"){
    var data = document.getElementById(target_name);
    html2canvas(data).then(canvas => {});
html2canvas(data).then(canvas => {
  let objet:{dataSource:any}={dataSource:null};
// Few necessary setting options
// var imgWidth = 208;
// var pageHeight = 295;
// var imgHeight = canvas.height * imgWidth / canvas.width;
// var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL(type_img);
///load here in link to download;
objet.dataSource=contentDataURL;
 
   this.passeDataService.myAnonymousTypeSubject({objet:objet});

// let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
// var position = 15;
// pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight)
  // window.open(pdf.output('bloburl'), '_blank');
      // objet.dataSource=pdf.output('dataurlstring');
// pdf.save('MYPdf.pdf'); // Generated PDF
 
});
  }
      }
    
 

 // ,width:number=208,height:number=295
    
    //    public  exportAsPdf(target_name:string,file_name:string,type_img:string="image/png"){
    //     var data = document.getElementById(target_name);

    // html2canvas(data).then(canvas => {
    // // Few necessary setting options
    // var imgWidth = data.clientWidth*0.2645833333 ;///* 0.0264583333
    // var pageHeight =  data.clientHeight*0.2645833333;//* 0.0264583333
    // // console.log("width:"+imgWidth);
    // var imgHeight = canvas.height * imgWidth / canvas.width;
    // // console.log("height:"+imgHeight);
    // var heightLeft = imgHeight;
     
    // const contentDataURL = canvas.toDataURL(type_img);
    // let pdf=null;
    // if(imgWidth>208) pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
    // else  pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    
    // var position = 15;
    // pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight);
    // window.open(pdf.output('bloburl'), '_blank');
    // objet.dataSource=pdf.output('dataurlstring');
    // pdf.save(''+file_name+EXCEL_EXTENSION_PDF); // Generated PDF
     
    // });
    //   }


//     public  printAsPdf(target_name:string,file_name:string,type_img:string="image/png"){
//       var data = document.getElementById(target_name);

//  html2canvas(data).then(canvas => {
//    let objet:{dataSource:any}={dataSource:null};
//  // Few necessary setting options
//  var imgWidth = data.clientWidth*0.2645833333 ;///* 0.0264583333
//  var pageHeight =  data.clientHeight*0.2645833333;//* 0.0264583333
//  // console.log("width:"+imgWidth);
//  var imgHeight = canvas.height * imgWidth / canvas.width;
//  // console.log("height:"+imgHeight);
//  var heightLeft = imgHeight;
  
//  const contentDataURL = canvas.toDataURL(type_img);
//  let pdf=null;
//  if(imgWidth>208) pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
//  else  pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF

//  var position = 15;
//  pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight);
//    // window.open(pdf.output('bloburl'), '_blank');
//  // objet.dataSource=pdf.output('dataurlstring');
//    pdf.autoPrint();

//   this.passeDataService.myAnonymousTypeSubject({objet:pdf.output('bloburl'),imgWidth:imgWidth,imgHeight:imgHeight});
//   //  pdf.save(''+file_name+EXCEL_EXTENSION_PDF); // Generated PDF

//  });

//    }




// html2canvas(data).then(canvas => {
//   // Few necessary setting options
//   var imgWidth = data.clientWidth*0.2645833333 ;///* 0.0264583333
//   var pageHeight =  data.clientHeight*0.2645833333;//* 0.0264583333
//   // console.log("width:"+imgWidth);
//   var imgHeight = canvas.height * imgWidth / canvas.width;
//   // console.log("height:"+imgHeight);
//   var heightLeft = imgHeight;
   
//   const contentDataURL = canvas.toDataURL(type_img);
//   let pdf=null;
//   if(imgWidth>208) pdf = new jspdf('l', 'mm', 'a4'); // A4 size page of PDF
//   else  pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  
//   var position = 15;


//   pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight);
//   pdf.autoPrint();
//   // objet.dataSource=pdf.output('dataurlstring');
//     // window.open(pdf.output('bloburl'), '_blank');
//   // this.passeDataService.myAnonymousTypeSubject({objet:objet});
//    pdf.save(''+file_name+'.pdf'); // Generated PDF

  // });

//   public exportAsImage(target_name:string,type_img:string="image/png"){
//     var data = document.getElementById(target_name);
//     html2canvas(data).then(canvas => {});
// html2canvas(data).then(canvas => {
//   let objet:{dataSource:any}={dataSource:null};
// // Few necessary setting options
// // var imgWidth = 208;
// // var pageHeight = 295;
// // var imgHeight = canvas.height * imgWidth / canvas.width;
// // var heightLeft = imgHeight;
 
// const contentDataURL = canvas.toDataURL(type_img);
// ///load here in link to download;
// objet.dataSource=contentDataURL;
// this.passeDataService.myAnonymousTypeSubject({objet:objet});
// // let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
// // var position = 15;
// // pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight)
//   // window.open(pdf.output('bloburl'), '_blank');
//       // objet.dataSource=pdf.output('dataurlstring');
// // pdf.save('MYPdf.pdf'); // Generated PDF
 
// });
//   }

// }


