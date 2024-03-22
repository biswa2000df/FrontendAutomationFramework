import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableDataService } from '../../../table-data.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-main-sheet1',
  standalone: true,
  imports: [MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    CdkTableModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule],
  templateUrl: './main-sheet1.component.html',
  styleUrl: './main-sheet1.component.css'
})
export class MainSheet1Component implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['srno', 'runStatus', 'browser', 'applicationID',
    'module', 'process1', 'reportType', 'add',
    'delete', 'edit'];

  mainTableData: any = [];
  dataSource!: MatTableDataSource<any>;
  editedRowIndex: number = -1;
  showDialog: boolean = false;
  enableDrag: boolean = true;

  srno: any;
  module: any;
  runStatus: any;
  process1: any;
  applicationID: any;
  browser: any;
  reportType: any;

  currentPage = 0;
  serialNumber = 0;

  browserData = ['Chrome', 'Brave', 'Microsoft Edge'];
  message = "Data Saved Successfully!!!!";

  spinnerDisabled: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild('table') table: MatTable<PeriodicElement>;
  constructor(private tableDataService: TableDataService) { }

  ngOnInit() {
    this.getTableData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 100);
    this.updateSerialNumber();
  }

  getTableData() {
    this.tableDataService.getMainSheet1Data().subscribe((res: any) => {
      console.log("RES", res);
      this.mainTableData = res
      this.dataSource = new MatTableDataSource(this.mainTableData);
      this.dataSource.paginator = this.paginator;
      console.log("dataSource", this.dataSource);
    })
  }

  updateSerialNumber() {
    if (this.paginator) {
      this.paginator.page.subscribe((page) => {
        this.currentPage = page.pageIndex;
        this.serialNumber = this.currentPage * this.paginator.pageSize;
      });
    }
  }


  addRow(index: any) {
    console.log("INDEX", index);
    console.log("EDITROW", this.editedRowIndex);
    console.log("DATA", this.dataSource);
    this.enableDrag = false;
    let allEmpty = true;
    let isValuesNull: any = Object.values(this.dataSource.data);

    isValuesNull.forEach((ele: any) => {
      if (ele !== "") {
        allEmpty = false;
      }
    });
    if (this.dataSource && !allEmpty) {
      this.dataSource.data.splice(this.serialNumber + index + 1, 0, {
        srno: '',
        module: '',
        runStatus: '',
        process1: '',
        applicationID: '',
        browser: '',
        reportType: '',
      });
      this.dataSource.data = this.dataSource.data;
      this.editedRowIndex = this.editedRowIndex === index ? -1 : index + 1;
    }
    else {
      this.mainTableData.splice(this.serialNumber + index + 1, 0, {
        srno: '',
        module: '',
        runStatus: '',
        process1: '',
        applicationID: '',
        browser: '',
        reportType: '',
      });
      this.dataSource = new MatTableDataSource(this.mainTableData);
      this.dataSource.paginator = this.paginator;
      this.editedRowIndex = index + 1;
    }
    console.log("EDITROW", this.editedRowIndex);

  }

  deleteRow(index: any) {
    console.log("INDEX", index);

    this.dataSource.data.splice(index, 1);
    this.dataSource.data = this.dataSource.data;

    if (this.dataSource.data.length === 0) {
      this.editedRowIndex = 0;
    }
  }

  submit() {
    this.showDialog = true;
    this.enableDrag = false;
  }

  closePopup() {
    this.showDialog = false;
    this.enableDrag = true;
  }

  submitData() {
    this.showDialog = false;
    this.spinnerDisabled = true;
    this.enableDrag = false;

    let payload = this.dataSource.data;
    console.log("PAYLOAD", payload);

    this.tableDataService.postMainSheet1Data(payload).subscribe((res: any) => {
      console.log("RES", res);
      this.tableDataService.openSnackBar(this.message);
      this.spinnerDisabled = false;
      this.enableDrag = true;

    })
  }

  toggleEditMode(index: number, rowData: any) {
    console.log("index", index);
    console.log("row Data", rowData);
    this.enableDrag = false;

    this.editedRowIndex = this.editedRowIndex === index ? -1 : index;

    this.srno = rowData.srno
    this.module = rowData.module;
    this.runStatus = rowData.runStatus;
    this.process1 = rowData.process1;
    this.applicationID = rowData.applicationID;
    this.browser = rowData.browser;
    this.reportType = rowData.reportType;

    // if (this.editedRowIndex == index) {
    //   this.enableEdit = true
    // }
    // else {
    //   this.enableEdit = false
    // }

  }

  cancelEdit(index: number, rowData: any) {
    this.editedRowIndex = -1;
    this.enableDrag = true;
    let allEmpty = true;
    let isValuesNull: any = Object.values(rowData);
    console.log("isValuesNull", isValuesNull);

    isValuesNull.forEach((ele: any) => {
      if (ele !== "") {
        allEmpty = false;
      }
    });

    if (allEmpty) {
      this.deleteRow(index)
    }

    this.srno = '';
    this.module = '';
    this.runStatus = '';
    this.process1 = '';
    this.applicationID = '';
    this.browser = '';
    this.reportType = '';
  }

  saveChanges(index: number) {
    // Implement logic to save changes to your data source
    console.log('Save changes for index:', index);

    this.dataSource.data.splice(index, 1,
      {
        srno: index ? index + 1 : 0,
        module: this.module ? this.module : '',
        runStatus: this.runStatus ? this.runStatus : '',
        process1: this.process1 ? this.process1 : '',
        applicationID: this.applicationID ? this.applicationID : '',
        browser: this.browser ? this.browser : '',
        reportType: this.reportType ? this.reportType : ''
      });

    this.dataSource.data = this.dataSource.data;

    console.log("SAVED DATA", this.dataSource.data);
    this.srno = '';
    this.module = '';
    this.runStatus = '';
    this.process1 = '';
    this.applicationID = '';
    this.browser = '';
    this.reportType = '';


    this.enableDrag = true;
    // Reset edit mode
    this.editedRowIndex = -1;
  }

  dropTable(event: any) {

    console.log("EVENT", event);
    console.log("DATASOURCE", this.dataSource);
    const prevIndex = this.dataSource.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource.data, prevIndex, event.currentIndex);
    this.dataSource.data = this.dataSource.data;
    // this.table.renderRows();
    // this.dataSource.data.renderRows();
  }


}
