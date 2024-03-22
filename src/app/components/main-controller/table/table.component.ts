import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MainSheet1Component } from "../main-sheet1/main-sheet1.component";
import { TableDataService } from '../../../table-data.service';
import { MainSheet2Component } from "../main-sheet2/main-sheet2.component";
import { Router } from '@angular/router';
import { MainSheet3Component } from "../main-sheet3/main-sheet3.component";
import { HeaderComponent } from "../../header/header.component";


@Component({
    selector: 'app-table',
    standalone: true,
    providers: [TableDataService],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    imports: [MatButtonModule,
        MatTabsModule,
        MainSheet1Component,
        MainSheet2Component, MainSheet3Component, HeaderComponent]
})
export class TableComponent implements OnInit {

  // @ViewChild('table') table: MatTable<PeriodicElement>;
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  
}


