import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TableDataService } from '../../../table-data.service';

@Component({
  selector: 'app-data-sheet1',
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
    MatProgressSpinnerModule],
  templateUrl: './data-sheet1.component.html',
  styleUrl: './data-sheet1.component.css'
})
export class DataSheet1Component implements OnInit, AfterViewInit, OnChanges {

  displayedColumns: string[] = ['srno', 'module', 'pageName',
    'runStatus', 'propertyName',
    'propertyValue', 'datafield',
    'action', 'action_Type',
    'test_Case', 'description',
    'scenario_ID', 'add', 'delete', 'edit'];

  mainTableData: any = [];
  dataSource!: MatTableDataSource<any>;
  editedRowIndex: number = -1;
  showDialog: boolean = false;
  enableDrag: boolean = true;

  srno: any;
  module: any;
  pageName: any;
  runStatus: any;
  propertyName: any;
  propertyValue: any;
  datafield: any;
  action: any;
  action_Type: any;
  test_Case: any;
  description: any;
  scenario_ID: any;

  currentPage = 0;
  serialNumber = 0;
  message = "Data Saved Successfully!!!!";

  spinnerDisabled: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() sheet1Data: any;
  // @ViewChild('table') table: MatTable<PeriodicElement>;
  constructor(private tableDataService: TableDataService) { }
  ngOnChanges() {
    console.log("IN ONCHANGES");

    if (this.sheet1Data) {
      this.getTableData();
    }
  }

  ngOnInit() {
    console.log("SHHET 1 DATA", this.sheet1Data);

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.updateSerialNumber();
  }



  getTableData() {
    console.log("SHHET 1 DATA", this.sheet1Data);
    this.mainTableData = this.sheet1Data;
    this.dataSource = new MatTableDataSource(this.sheet1Data);
    this.dataSource.paginator = this.paginator;
    console.log("dataSource", this.dataSource);

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
    console.log("Main Table data", this.mainTableData);
    this.enableDrag = false;
    let allEmpty = true;
    let isValuesNull: any = Object.values(this.dataSource.data);

    isValuesNull.forEach((ele: any) => {
      if (ele !== "") {
        allEmpty = false;
      }
    });
    if (this.dataSource && !allEmpty) {
      console.log("IN IF EDIT ROW INDEX 1", this.editedRowIndex, this.dataSource);
      this.dataSource.data.splice(this.serialNumber + index + 1, 0, {
        srno: '',
        module: '',
        pageName: '',
        runStatus: '',
        propertyName: '',
        propertyValue: '',
        datafield: '',
        action: '',
        action_Type: '',
        test_Case: '',
        description: '',
        scenario_ID: ''
      });
      this.dataSource.data = this.dataSource.data;
      this.editedRowIndex = this.editedRowIndex === index ? -1 : index + 1;
    }
    else {
      console.log("IN ELSE EDIT ROW INDEX 1", this.editedRowIndex);
      this.mainTableData.splice(this.serialNumber + index + 1, 0, {
        srno: '',
        module: '',
        pageName: '',
        runStatus: '',
        propertyName: '',
        propertyValue: '',
        datafield: '',
        action: '',
        action_Type: '',
        test_Case: '',
        description: '',
        scenario_ID: ''
      });
      this.dataSource = new MatTableDataSource(this.mainTableData);
      this.dataSource.paginator = this.paginator;
      this.editedRowIndex = index + 1;
    }

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

    this.tableDataService.postSheetData(payload).subscribe((res: any) => {
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
    this.pageName = rowData.pageName;
    this.runStatus = rowData.runStatus;
    this.propertyName = rowData.propertyName;
    this.propertyValue = rowData.propertyValue;
    this.datafield = rowData.datafield;
    this.action = rowData.action;
    this.action_Type = rowData.action_Type;
    this.test_Case = rowData.test_Case;
    this.description = rowData.description;
    this.scenario_ID = rowData.scenario_ID;

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
    this.pageName = '';
    this.runStatus = '';
    this.propertyName = '';
    this.propertyValue = '';
    this.datafield = '';
    this.action = '';
    this.action_Type = '';
    this.test_Case = '';
    this.description = '';
    this.scenario_ID = '';
  }

  saveChanges(index: number) {
    // Implement logic to save changes to your data source
    console.log('Save changes for index:', index);

    this.dataSource.data.splice(index, 1,
      {
        srno: index ? index + 1 : 0,
        module: this.module ? this.module : '',
        pageName: this.pageName ? this.pageName : '',
        runStatus: this.runStatus ? this.runStatus : '',
        propertyName: this.propertyName ? this.propertyName : '',
        propertyValue: this.propertyValue ? this.propertyValue : '',
        datafield: this.datafield ? this.datafield : '',
        action: this.action ? this.action : '',
        action_Type: this.action_Type ? this.action_Type : '',
        test_Case: this.test_Case ? this.test_Case : '',
        description: this.description ? this.description : '',
        scenario_ID: this.scenario_ID ? this.scenario_ID : ''
      });

    this.dataSource.data = this.dataSource.data;

    console.log("SAVED DATA", this.dataSource.data);
    this.srno = '';
    this.module = '';
    this.pageName = '';
    this.runStatus = '';
    this.propertyName = '';
    this.propertyValue = '';
    this.datafield = '';
    this.action = '';
    this.action_Type = '';
    this.test_Case = '';
    this.description = '';
    this.scenario_ID = '';

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
