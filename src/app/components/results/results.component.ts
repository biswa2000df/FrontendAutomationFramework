import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { TableDataService } from '../../table-data.service';
import { MatTreeNestedDataSource, MatTreeModule, MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlatTreeControl } from '@angular/cdk/tree';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HeaderComponent } from "../header/header.component";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-results',
  standalone: true,
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  imports: [MatTreeModule, MatButtonModule, MatIconModule, MatProgressBarModule, CommonModule, HeaderComponent]
})
export class ResultsComponent implements OnInit {

  treeData: any = [];
  htmlFileData: any;
  progressValue = 0;
  enableProgress: boolean = false;
  isRunScript: boolean = false;
  jarResponse: any;

  constructor(private tableDataService: TableDataService,
    private router: Router, private ngZone: NgZone,
    private cdr: ChangeDetectorRef) {
    this.getResultData();
  }

  private _transformer = (node: TreeNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.data,
      href: this.getNodeHref(node),
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {
  }
  runScript() {
    this.enableProgress = true;
    this.isRunScript = true;
    this.updateTimer();
    this.tableDataService.runJar().subscribe((res) => {
      console.log("RUN JAR", res);

      // const interval = setInterval(() => {
      //   this.ngZone.run(() => {
      //     this.progressValue += 5;
      //     if (this.progressValue >= 100) {
      //       this.enableProgress = false;
      //       clearInterval(interval);
      //       this.cdr.detectChanges(); // Manually trigger change detection
      //     }
      //   });
      // }, 1000);
      if (res) {
        this.jarResponse = res;
      }
    })
  }

  stopScript() {
    this.tableDataService.stopJar().subscribe((res) => {
      console.log("STOP JAR", res);
      this.isRunScript = false;
      this.enableProgress = false;
      this.progressValue = 0;
    })

  }

  getApmosysIDE() {
    this.tableDataService.Apmosys_IDE().subscribe(
      (res: any) => { // Explicitly specify the type of 'res'
        console.log("Console Value:", res);
      },
      (error: HttpErrorResponse) => { // Specify HttpErrorResponse type for error parameter
        console.error("Error fetching console value:", error);
      }
    );
  }


  updateTimer() {
    console.log("progress Value", this.progressValue);
    setTimeout(() => {
      if (this.progressValue < 95 && !this.jarResponse) {
        this.progressValue += 5
        console.log("progress Value", this.progressValue);
        this.updateTimer()
      }
      else if (this.jarResponse) {
        this.progressValue = 100;
        setTimeout(() => {
          this.enableProgress = false;
        }, 1000);
      }
      else {
        this.updateTimer()
      }
    }, 10000);
  }

  getResultData() {
    this.tableDataService.getResults().subscribe((res) => {
      console.log("RESULTS", res);
      this.treeData = res;
      console.log("DATA", this.dataSource);
      this.dataSource.data = this.convertObjectToTreeValues(this.treeData);
    })
  }

  private convertObjectToTreeValues(obj: any): TreeNode[] {
    return Object.keys(obj).map(key => ({
      data: key,
      value: obj[key],  // Added 'value' property to store the corresponding value
      children: obj[key] && typeof obj[key] === 'object' && obj[key] !== null
        ? this.convertObjectToTreeValues(obj[key])
        : undefined
    }));
  }

  private getNodeHref(node: TreeNode): any {
    // Check if the value ends with ".html" and use it as href
    // let finalHref = '';
    // if (typeof node.value === 'string' && (node.value.endsWith('.html') || node.value.endsWith('.csv') || node.value.endsWith('.png'))) {
    //   // let temp = JSON.stringify(node.value);
    //   // console.log("temp", temp);
    //   // finalHref = temp.replace(/^file:\/\/(C:)/, 'file:///C:').replace(/\\/g, '//');
    //   // const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(finalHref);
    //   // console.log("finalHref", safeUrl);

    //   return node;
    //   // this.readHtmlFile(temp)
    // }
    return node.value;
  }

  // readHtmlFile(filePath: string): void {
  //   this.http.get(filePath, { responseType: 'text' }).subscribe(
  //     (htmlContent: string) => {
  //       this.htmlFileData = htmlContent // You can use or process the HTML content here
  //       console.log("HTML", this.htmlFileData);

  //     },
  //     (error: any) => {
  //       console.error('Error reading HTML file:', error);
  //     }
  //   );
  // }
}

interface TreeNode {
  data: string;
  value: string;
  children?: TreeNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  href: string;
  level: number;
}
