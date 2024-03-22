import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class TableDataService {

  baseUrl = 'http://localhost:8080/api';
  // headers: HttpHeaders;
  //baseUrl = 'http://192.168.0.244:8080/api';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, @Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
    const sessionStorage = document.defaultView?.sessionStorage;

    // const sessionId: any = sessionStorage?.getItem('SessionID');

    // this.headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Cookie': `JSESSIONID=${sessionId}`
    // })
  }

  // Run Jar
  runJar() {
    return this.http.get(this.baseUrl + "/AutomationSheetData/runjar");
  }

  //Stop Jar
  stopJar() {
    return this.http.get(this.baseUrl + "/AutomationSheetData/stopjar");
  }

    Apmosys_IDE() {
    return this.http.get(this.baseUrl + '/AutomationSheetData/openApmosys_IDE');
  }

  // Method to upload file
  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/AutomationSheetData/IDE_FileUpload`, formData);
  }

  // Data Sheet1

  getDropDownList() {
    return this.http.get(this.baseUrl + "/ProcessController/xlsxName")
  }

  postDropDownList(fileName: any) {
    return this.http.post(this.baseUrl + "/ProcessController/" + fileName, {})
  }

  getSheetData() {
    return this.http.get(this.baseUrl + "/AutomationSheetData")
  }

  postSheetData(data: any) {
    return this.http.post(this.baseUrl + "/AutomationSheetData/listofAutomationData", data)
  }

  // Data Sheet 2

  getSheet2Columns() {
    return this.http.get(this.baseUrl + "/AutomationSheetData/all-datafield")
  }

  getSheet2Data() {
    return this.http.get(this.baseUrl + "/allDynamicTableDataWithoutId")
  }

  postSheet2Data(data: any) {
    return this.http.post(this.baseUrl + "/insertData", data)
  }


  // Main Controller Sheet 1 Data
  getMainSheet1Data() {
    return this.http.get(this.baseUrl + "/MainControllerSheet1/getAllMC_Sheet1")
  }

  postMainSheet1Data(data: any) {
    return this.http.post(this.baseUrl + "/MainControllerSheet1/ListOfMainControllerSheet1", data)
  }

  // Main Controller Sheet 2 Data
  getMainSheet2Data() {
    return this.http.get(this.baseUrl + "/MainControllerSheet2/getAllMC_Sheet2")
  }

  postMainSheet2Data(data: any) {
    return this.http.post(this.baseUrl + "/MainControllerSheet2/ListOfMainControllerSheet2", data)
  }

  // Main Controller Sheet 3 Data
  getMainSheet3Data() {
    return this.http.get(this.baseUrl + "/MailSend/getAllMailSendSheet")
  }

  postMainSheet3Data(data: any) {
    return this.http.post(this.baseUrl + "/MailSend/ListOfMailSend", data)
  }

  // Result Folder Structure
  getResults() {
    return this.http.get(this.baseUrl + "/MainControllerSheet2/folder-structure")
  }

  openSnackBar(message: any) {
    const config = new MatSnackBarConfig();
    config.panelClass = 'mycsssnackbartest';
    config.duration = 3000;
    config.verticalPosition = 'top';

    this.snackBar.open(message, '', config);
  }
}
