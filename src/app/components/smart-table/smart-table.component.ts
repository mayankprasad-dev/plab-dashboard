import { Component, Input, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';

import { LocalDataSource } from 'ng2-smart-table';
import { AppService } from 'src/app/services/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogContentExampleDialog } from './result-modal.component';

@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})

export class SmartTableComponent implements OnInit {

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private appService: AppService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) { }

  totalRecs;
  tableData;
  totalRows;
  closeResult: string;
  public htmldata: any;


  ngOnInit() {

    this.appService.results(
      {
        "getDataFor": "SIT"
      }
    ).subscribe(data => {
      this.totalRecs = data['data'].length
      let temp = []
      for (var val of data['data']) {
        val['status'] = this.transformYourHtml(val['status'])
        temp.push(val)
      }
      this.tableData = temp;
      this.source.load(this.tableData);
    });
  }

  ngDoCheck() {
    this.totalRows = this.source != null ? this.source.count() : null;
  }


  settings = {
    pager: {
      display: true,
      perPage: 10,
      doEmit: true
    },
    // actions: true,
    actions: {
      columnTitle: 'Result',
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      class: 'action-column',
      custom: [{
        name: 'view',
        title: 'View',
      }]
    },
    attr: {
      class: 'table table-bordered'
    },
    columns: {
      executionDate: {
        title: 'Date',
      },

      releaseName: {
        title: 'Release Name',
        // sort: true,
        type: 'html'
      },
      applicationName: {
        title: 'App Name'
      },
      runNumber: {
        title: 'Run Number'
      },
      status: {
        title: 'Status',
        type: 'html'
      },
    }
  };

  transformYourHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }


  openDialog(event) {
    this.htmldata = event;
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.height = '90%';

    dialogConfig.data = {
      dataKey: this.htmldata.data
    };

    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: '95%',
      width: '90%',
      data: {
        dataKey: this.htmldata.data,
        resultType: "SIT Results"
      },

    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


}

