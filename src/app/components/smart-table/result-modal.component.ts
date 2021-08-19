import { Component, Input, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {MatDialog} from '@angular/material/dialog';
import { SmartTableComponent } from './smart-table.component';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpParams } from '@angular/common/http';
// import * as fileSaver from 'file-saver';
import { SetLeftFeature } from 'ag-grid-community';


@Component({
    selector: 'result-modal.html',
    templateUrl: 'result-modal.html',
    styleUrls: ['./result-modal.component.scss']
  })
  
  export class DialogContentExampleDialog {

    private gridApi;
    private gridColumnApi;

    private gridApi_c;
    private gridColumnApi_c;
    
    result_html;
    title = 'Loading...'
    result_type = 'Loading...'
    loading = true;
    rowStyle = {}
    getRowStyle;
    results_count;
    content_to_show;
    arr;
    forDownload;
    header_title;
    header_title_c;

    frameworkComponents;
    rowData;
    rowData_pc;
    // @Input() results: SmartTableComponent;
    constructor(
        private appService: AppService,
        private sanitizer: DomSanitizer,
        @Inject(MAT_DIALOG_DATA) public data: any){

          this.rowStyle = { background: 'lavender' };
          this.getRowStyle = params => {
            
            let color_row = params.data.COLOR
          
            return { background: color_row };
        
      }
    }   

    ngOnInit() {
      if(this.data.resultType !== 'Comparision'){
        this.result_type = this.data.resultType;
        let requestForResult;
        if(this.result_type === 'SIT Results'){
          requestForResult = { 
            "getDataFor": "SIT", 
            ...this.data.dataKey
          };
        } 

        if(this.result_type === 'Load Test') {
          requestForResult = { 
            "getDataFor": "Load Test",
            ...this.data.dataKey
          };
        }
        

        this.appService.getResult(requestForResult).subscribe(
            data => {
              this.result_html = this.transformYourHtml(data['data']);
              this.title = data['result_title'];
            });
          }
      if(this.data.resultType === 'Comparision'){
        this.result_type = this.data.resultType;
        let requestForResult = this.data.dataKey
        this.forDownload = requestForResult
      


        this.appService.resultCompare(requestForResult).subscribe(data => {
          this.results_count = data['total_results'];
          this.rowData = data['data'];
          this.rowData_pc = data['perf_counters'];
          this.header_title = data['header_names'];
          this.header_title_c = data['header_counter'];
          
          this.title = data['title'];
          
          this.arr = data['total_results'];
          this.content_to_show = "counters";
          this.loading = false;            
          });
        }
      }

      downLoadFile(data: any, type: string) {
        let blob = new Blob([data], { type: type});
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert( 'Please disable your Pop-up blocker and try again.');
        }
    }

      downloadReport(){
        let requestForResult = { 
          "file": true,
          ...this.forDownload
        };
        
        this.appService.resultCompare(requestForResult).subscribe((data: any) => {
          let url = "http://localhost:5001/downloadReport/"+data['url'][0]
          window.open(url);
          this.appService.deleteFile(data['url'][0]).subscribe((data: any) => {
          });
        });
      }

      transformYourHtml(htmlTextWithStyle) {
        return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
      }

      openTab(evt, section) {
        this.content_to_show = section

      }

      onGridReady_counter(params_c){
        this.gridApi_c = params_c.api;
        this.gridColumnApi_c = params_c.columnApi;
        
        let filter_arr = [];
        let temp_col = this.columnDefs_Counters;
        for(let i of temp_col){
              if(this.arr.includes(i['field'])) {
              } else {
                filter_arr.push(i)
              }
            }
            let temp = []
            for(let obj of filter_arr){
                if(obj['headerName'] in this.header_title_c){
                  let data = obj;
                  data['headerName'] = this.header_title_c[obj['headerName']];
                  
                  data['cellClass'] = "grid-cell-centered";
                  temp.push(data)
                } else {
                  temp.push(obj);
                }
              }
        this.gridApi_c.setColumnDefs(
              temp
            );

      }

      onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;


        let filter_arr = [];
          let temp_col = this.columnDefs;
  
          for(let i of temp_col){
              if(this.arr.includes(i['field'])) {
              }
              else{
                filter_arr.push(i)
              }
            }
          
            let temp = []
            for(let obj of filter_arr){
                if(obj['headerName'] in this.header_title){
                  let data = obj;
                  data['headerName'] = this.header_title[obj['headerName']];
                  data['cellClass'] = "grid-cell-centered";
                  temp.push(data)
                }
              else{
                temp.push(obj);
              }
            }
            this.gridApi.setColumnDefs(
              temp
            );
      }

      defaultColDef = {
        resizable: true,
        wrapText: true,
        autoHeight: true,
        sortable: true,
        suppressRowTransform: true,
        headerComponentParams: {
          template:
            '<div class="ag-cell-label-container" role="presentation">' +
            '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
            '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
            '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
            '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
            '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
            '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
            '    <span ref="eText" class="ag-header-cell-text" role="columnheader" style="white-space: normal;"></span>' +
            '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
            '  </div>' +
            '</div>',
        },
      };

      cellColorError(params) {
        var sla = 10
    
        let background = 'rgb(255, 196, 247,0.5)';
        let color = 'black';
        let fontWeight = 'bold';
        let border = 'thin';
    
    
        if (+params.value >= +sla) {
          background = "red"
          color = 'white'
          fontWeight = 'bold'
        }
    
        return {
          background: background,
          color: color,
          fontWeight: fontWeight,
          border: border
        };
    
      }
      
      stringFormatter(params) {
      }

      cellColor(params) {
        var sla = params.data.EXPECTED_RESPONSE_TIME;
    
        let background = 'rgb(41, 127, 214,0.2)';
        let color = 'black';
        let fontWeight = 'bold'
    
        if (+params.value >= +sla) {
          background = "red"
          color = 'white'
          fontWeight = 'bold'
        } else if (+params.value < +sla && +params.value >= +sla * 0.9) {
          background = "rgb(225,225,0,0.75)"
          color = 'black'
          fontWeight = 'bold'
        } else {
          background = "rgb(41, 127, 214,0.1)"
        }
    
        return {
          background: background,
          color: color,
          fontWeight: fontWeight,
          border: 'thin'
        };
      }

      columnDefs = [
        { 
          field: 'SCENARIO_NAME',
          filter: 'agTextColumnFilter',
          filterParams: {
            valueFormatter: this.stringFormatter,
          },
          lockPinned: false,
          width: 300,
          tooltipField: 'scenario',
          headerName: 'Scenario',
          tooltipComponentParams: { type: 'success' },
    
        },
        { 
          field: 'OP_TRANSACTION_NAME',
          headerName: 'Transaction Name',
          width: '350',
          lockPinned: false
        },
        { 
          field: 'EXPECTED_RESPONSE_TIME',
          width: '80',
          headerName: 'SLA',
          tooltipField: 'sla',
        },
        { 
          field: 'RESULT_90_PERC',
          headerName: 'RT Run 1',
          colId: 'run_rt_1',
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          
          cellStyle: this.cellColor
    
        },
        { 
          field: 'run_rt_2',
          headerName: 'RT Run 2',
          colId: 'run_rt_2',
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColor
        },
        { 
          field: 'run_rt_3',
          headerName: 'RT Run 3',
          colId: 'run_rt_3',
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColor,
          suppressColumnsToolPanel: true
        },
        { 
          field: 'run_rt_4',
          headerName: 'RT Run 4',
          colId: 'run_rt_4',
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColor,
          suppressColumnsToolPanel: true
        },
        { 
          field: 'run_rt_5',
          headerName: 'RT Run 5',
          colId: 'run_rt_5',
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColor,
          suppressColumnsToolPanel: true
        },
        { 
          field: 'run_rt_6',
          headerName: 'RT Run 6',
          colId: 'run_rt_6',
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColor,
          suppressColumnsToolPanel: true
        },
        { 
          field: 'RESULT_COUNT',
          headerName: "WPM Run 1",
          colId: 'run_wpm_1',
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: {
            background: 'rgb(156, 245, 255,0.5)',
            color: 'black',
            fontWeight: 'bold',
            border: 'thin'
          }
        },
        { 
          field: 'run_wpm_2',
          headerName: "WPM Run 2",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: {
            background: 'rgb(156, 245, 255,0.5)',
            color: 'black',
            fontWeight: 'bold',
            border: 'thin'
          }
        },
        {  
          field: 'run_wpm_3',
          headerName: "WPM Run 3",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: {
            background: 'rgb(156, 245, 255,0.5)',
            color: 'black',
            fontWeight: 'bold',
            border: 'thin'
          }
        },
        {  
          field: 'run_wpm_4',
          headerName: "WPM Run 4",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: {
            background: 'rgb(156, 245, 255,0.5)',
            color: 'black',
            fontWeight: 'bold',
            border: 'thin'
          }
        },
        {  
          field: 'run_wpm_5',
          headerName: "WPM Run 5",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: {
            background: 'rgb(156, 245, 255,0.5)',
            color: 'black',
            fontWeight: 'bold',
            border: 'thin'
          }
        },
        { 
          field: 'run_wpm_6',
          headerName: "WPM Run 6",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: {
            background: 'rgb(156, 245, 255,0.5)',
            color: 'black',
            fontWeight: 'bold',
            border: 'thin'
          }
        },
        { 
          field: 'RESULT_ERROR_PERC',
          headerName: "Err % Run 1",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColorError
        },
    
    
        {  
          field: 'run_err_2',
          headerName: "Err % Run 2",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColorError
        },   
        { 
          field: 'run_err_3',
          headerName: "Err % Run 3",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColorError
        },
        {
          field: 'run_err_4',
          headerName: "Err % Run 4",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColorError
        },
        { 
          field: 'run_err_5',
          headerName: "Err % Run 5",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColorError
        },
        {
          field: 'run_err_6',
          headerName: "Err % Run 6",
          width: 109,
          tooltipField: 'scenario',
          tooltipComponentParams: { type: 'success' },
          cellStyle: this.cellColorError
        },
      ];
      
      columnDefs_Counters = [
        {
          field: 'Performance Counters',
          headerName: 'Performance Counters',
          filter: 'agTextColumnFilter',
          pinned: 'left',
          width: 235,
          cellStyle: {
            background: '#f8f9fa'
          }
        },
        {
          field: 'Target Value',
          headerName: 'Target Value',
          width: 150,
          pinned: 'left',
          cellStyle: {
            background:'#f8f9fa'
          }
        },

        { 
          field: 'run_rt_1',
          headerName: 'RT Run 1',
          width: 250    
        },
        { 
          field: 'run_rt_2',
          headerName: 'RT Run 2',
          width: 250,
        },
        { 
          field: 'run_rt_3',
          headerName: 'RT Run 3',
          width: 250,
        },
        { 
          field: 'run_rt_4',
          headerName: 'RT Run 4',
          width: 250,
        },
        { 
          field: 'run_rt_5',
          headerName: 'RT Run 5',
          width: 250,
        },
        { 
          field: 'run_rt_6',
          headerName: 'RT Run 6',
          width: 250,
        }
      ];

  }