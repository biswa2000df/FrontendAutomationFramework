import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { DataSheet1Component } from "../data-sheet1/data-sheet1.component";
import { DataSheet2Component } from "../data-sheet2/data-sheet2.component";
import { TableDataService } from '../../../table-data.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
    selector: 'app-data-table',
    standalone: true,
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.css',
    imports: [
        MatButtonModule,
        MatTabsModule,
        DataSheet1Component,
        DataSheet2Component,
        MatSelectModule,
        CommonModule,
        FormsModule,
        HeaderComponent
    ]
})
export class DataTableComponent implements OnInit {

  sheetArray: any = [];
  sheet1Data: any;
  dropDownList: any;
  showTable: boolean = false;

  constructor(private router: Router, private tableDataService: TableDataService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {

  }
  ngOnInit(): void {
    this.menuList();
  }

  menuList() {
    this.tableDataService.getDropDownList().subscribe((res) => {
      this.dropDownList = res;
    })
  }

  fileSelect(event: any) {
    this.sheet1Data = [];
    console.log(event.value);
    this.tableDataService.postDropDownList(event.value).subscribe((res) => {
      console.log(res);
      this.showTable = true;
      this.getTableData()
    }, (error: any) => {
      console.log(error);
      this.showTable = true;
      this.getTableData()
    })
  }

  getTableData() {
    this.tableDataService.getSheetData().subscribe((res: any) => {
      console.log("RES", res);
      this.sheet1Data = res
    })
  }

  tabClick(event: any) {
    if (event.index == 1) {
      this.tableDataService.getSheet2Data().subscribe((res: any) => {
        this.sheetArray = res;
        console.log("SHEET 2 RES", res);
      })
    }

    this.ngZone.run(() => {
      this.cdr.detectChanges(); // Trigger change detection
    });
  }

  updatesheet() {

  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

// Method to upload file
uploadFile(file: File): void {
  this.tableDataService.uploadFile(file).subscribe(
    (response) => {
      console.log('File uploaded successfully:', response);
      // Add your handling code here, like displaying a success message
    },
    (error) => {
      console.error('Error uploading file:', error);
      // Add your error handling code here, like displaying an error message
    }
  );
}

}
