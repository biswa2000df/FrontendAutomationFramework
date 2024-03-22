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

@Component({
  selector: 'app-main-sheet3',
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
  templateUrl: './main-sheet3.component.html',
  styleUrl: './main-sheet3.component.css'
})
export class MainSheet3Component {

  displayedColumns: string[] = ['srno', 'runStatus', 'process', 'host', 'password',
    'mail_TO', 'mail_CC', 'subject', 'body_MESSAGE', 'attachment_FLAG',
    'body_MESSAGE_For_ATTACHMENT', 'attachment_File_Location',
    'add', 'delete', 'edit'];

  mainTableData: any = [];
  dataSource!: MatTableDataSource<any>;
  editedRowIndex: number = -1;
  showDialog: boolean = false;
  enableDrag: boolean = true;

  srno: any;
  process: any;
  runStatus: any;
  password: any;
  subject: any;
  mail_TO: any;
  mail_CC: any;
  host: any;
  body_MESSAGE_For_ATTACHMENT: any;
  body_MESSAGE: any;
  attachment_File_Location: any;
  attachment_FLAG: any;


  currentPage = 0;
  serialNumber = 0;
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
    this.tableDataService.getMainSheet3Data().subscribe((res: any) => {
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
        process: '',
        runStatus: '',
        password: '',
        subject: '',
        mail_TO: '',
        mail_CC: '',
        host: '',
        body_MESSAGE_For_ATTACHMENT: '',
        body_MESSAGE: '',
        attachment_File_Location: '',
        attachment_FLAG: '',

      });
      this.dataSource.data = this.dataSource.data;
      this.editedRowIndex = this.editedRowIndex === index ? -1 : index + 1;
    }
    else {
      this.mainTableData.splice(this.serialNumber + index + 1, 0, {
        srno: '',
        process: '',
        runStatus: '',
        password: '',
        subject: '',
        mail_TO: '',
        mail_CC: '',
        host: '',
        body_MESSAGE_For_ATTACHMENT: '',
        body_MESSAGE: '',
        attachment_File_Location: '',
        attachment_FLAG: '',
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

    this.tableDataService.postMainSheet3Data(payload).subscribe((res: any) => {
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
    this.process = rowData.process;
    this.runStatus = rowData.runStatus;
    this.password = rowData.password;
    this.subject = rowData.subject;

    this.mail_TO = rowData.mail_TO;
    this.mail_CC = rowData.mail_CC;
    this.host = rowData.host;
    this.body_MESSAGE_For_ATTACHMENT = rowData.body_MESSAGE_For_ATTACHMENT;
    this.body_MESSAGE = rowData.body_MESSAGE;
    this.attachment_File_Location = rowData.attachment_File_Location;
    this.attachment_FLAG = rowData.attachment_FLAG;


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
    this.process = '';
    this.runStatus = '';
    this.password = '';
    this.subject = '';
    this.mail_TO = '';

    this.mail_CC = '';
    this.host = '';
    this.body_MESSAGE_For_ATTACHMENT = '';
    this.body_MESSAGE = '';
    this.attachment_File_Location = '';
    this.attachment_FLAG = '';
  }

  saveChanges(index: number) {
    // Implement logic to save changes to your data source
    console.log('Save changes for index:', index);

    this.dataSource.data.splice(index, 1,
      {
        srno: index ? index + 1 : 0,
        process: this.process ? this.process : '',
        runStatus: this.runStatus ? this.runStatus : '',
        password: this.password ? this.password : '',
        subject: this.subject ? this.subject : '',
        mail_TO: this.mail_TO ? this.mail_TO : '',
        mail_CC: this.mail_CC ? this.mail_CC : '',
        host: this.host ? this.host : '',
        body_MESSAGE_For_ATTACHMENT: this.body_MESSAGE_For_ATTACHMENT ? this.body_MESSAGE_For_ATTACHMENT : '',
        body_MESSAGE: this.body_MESSAGE ? this.body_MESSAGE : '',
        attachment_File_Location: this.attachment_File_Location ? this.attachment_File_Location : '',
        attachment_FLAG: this.attachment_FLAG ? this.attachment_FLAG : '',
      });

    this.dataSource.data = this.dataSource.data;

    console.log("SAVED DATA", this.dataSource.data);
    this.srno = '';
    this.process = '';
    this.runStatus = '';
    this.password = '';
    this.subject = '';
    this.mail_TO = '';
    this.mail_CC = '';
    this.host = '';
    this.body_MESSAGE_For_ATTACHMENT = '';
    this.body_MESSAGE = '';
    this.attachment_File_Location = '';
    this.attachment_FLAG = '';

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
