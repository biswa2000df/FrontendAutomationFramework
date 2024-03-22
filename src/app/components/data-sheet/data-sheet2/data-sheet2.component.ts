import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-data-sheet2',
  standalone: true,
  imports: [
    MatTableModule,
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
  ],
  templateUrl: './data-sheet2.component.html',
  styleUrl: './data-sheet2.component.css'
})
export class DataSheet2Component implements OnInit, AfterViewInit, OnChanges {

  displayedColumns: any = []

  @Input() sheetArray: any;

  modidyData: any[] = [];
  dataSource!: MatTableDataSource<any>;
  editedRowIndex: number = -1;
  showDialog: boolean = false;
  enableDrag: boolean = true;


  currentPage = 0;
  serialNumber = 0;
  message = "Data Saved Successfully!!!!";

  spinnerDisabled: boolean = false;
  columnArray: any = [];
  keysArray: any = [];
  valuesArray: any = [];
  keys: any = [];
  showSubmitWarning: boolean = false;

  i: any;
  // @ViewChild('table') table: MatTable<PeriodicElement>;
  constructor(private tableDataService: TableDataService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this.getTableData();

    this.keysArray = this.columnArray.map((element: any) => {
      if (typeof element === 'object') {
        return Object.keys(element);
      }
      return [];
    });

    if (this.columnArray.length > 0) {
      this.valuesArray = this.columnArray.map((element: any) => {
        if (typeof element === 'object') {
          return Object.values(element);
        }
        return [];
      });
    }
    else {

    }
    console.log("keys ARRAY", this.keysArray);
    if (this.keysArray.length > 0) {
      this.showSubmitWarning=false;
      this.displayedColumns = this.keysArray[0];
      this.displayedColumns.push('add', 'edit', 'delete');
    } else {
      console.error('columnArray is empty');
      this.showSubmitWarning = true;
    }

    console.log("DISPLAY COLUMN", this.keysArray[0]);

  }
  ngOnChanges() {
    console.log("ON CHANGES");
    console.log("sheetArray", this.sheetArray);
    this.columnArray = this.sheetArray;

    console.log("COLUMN ARRAY", this.columnArray);

    this.keysArray = this.columnArray.map((element: any) => {
      if (typeof element === 'object') {
        return Object.keys(element);
      }
      return [];
    });

    if (this.columnArray.length > 0) {
      this.valuesArray = this.columnArray.map((element: any) => {
        if (typeof element === 'object') {
          return Object.values(element);
        }
        return [];
      });
    }
    else {

    }

    console.log("keys ARRAY", this.keysArray);
    if (this.keysArray.length > 0) {
      this.showSubmitWarning=false;
      this.displayedColumns = this.keysArray[0];
      this.displayedColumns.push('add', 'edit', 'delete');
    } else {
      console.error('columnArray is empty');
      this.showSubmitWarning = true;
    }

    console.log("DISPLAY COLUMN", this.keysArray[0]);

    this.getTableData();
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

  getTableData() {
    this.dataSource = new MatTableDataSource(this.columnArray);
    console.log("dataSource", this.dataSource);
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

    const keys = this.columnArray.map((element: any) => {
      if (typeof element === 'object' && element !== null) {
        return Object.keys(element);
      }
      return [];
    });
    console.log("KEYS", keys);

    let payload = {
      "columns": keys[0],
      "values": this.valuesArray[0],
    }
    console.log("PAYLOAD", payload);

    this.tableDataService.postSheet2Data(payload).subscribe((res: any) => {
      console.log("RES", res);
      this.tableDataService.openSnackBar(this.message);
      // this.snackBar.open(this.message, '', { duration: 3000, verticalPosition: 'top', panelClass: ['blue-snackbar'] });
      this.spinnerDisabled = false;
      this.enableDrag = true;

    })
  }

  addRow(index: any) {
    console.log("INDEX", index);
    console.log("EDITROW", this.editedRowIndex);
    // this.enableDrag = false;
    // this.dataSource.data.splice(this.serialNumber + index + 1, 0, {

    // });

    let combinedArray = this.keys.reduce((result: any, key: any, index: any) => {
      result[key] = '';
      return result;
    }, {});

    this.dataSource.data.push(combinedArray);

    this.dataSource.data = this.dataSource.data;
    this.editedRowIndex = this.editedRowIndex === index ? -1 : index + 1;
    console.log("EDITROW", this.editedRowIndex);

  }

  toggleEditMode(index: number, rowData: any) {
    console.log("index", index);
    console.log("row Data", rowData);
    this.enableDrag = false;

    this.editedRowIndex = this.editedRowIndex === index ? -1 : index;


    // if (this.editedRowIndex == index) {
    //   this.enableEdit = true
    // }
    // else {
    //   this.enableEdit = false
    // }

  }

  cancelEdit() {
    this.editedRowIndex = -1;
    this.enableDrag = true;

  }

  saveChanges(index: number, item: any) {
    // Implement logic to save changes to your data source
    console.log('Save changes for index:', index, item);

    this.dataSource.data.splice(index, 1, item);

    this.dataSource.data = this.dataSource.data;

    this.valuesArray = [];

    this.valuesArray = this.dataSource.data.map((element: any) => Object.values(element));

    // let filteredArray = res.map(innerArray => innerArray.filter(value => value !== null));
    // console.log("RESSSSS", res);

    // this.valuesArray = filteredArray

    console.log("SAVED DATA", this.valuesArray);


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

