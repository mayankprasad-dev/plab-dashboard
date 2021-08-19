import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { CustomTooltip } from './custom-tooltip.component';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { DialogContentExampleDialog } from '../smart-table/result-modal.component';
import { ConstantPool, ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-result-compare',
  templateUrl: './result-compare.component.html',
  styleUrls: ['./result-compare.component.scss']
})

export class ResultCompareComponent implements OnInit {
  rowData;
  counter_scenario;
  name = 'Angular';
  resultCompare: FormGroup;

  requestForAppName: any;


  releaseNameList: any = [];
  appNameList: any = [];
  testTypeList: any = [];
  runNumberList: any = [];


  releaseName;
  appName;
  testType;
  runNumber;
  testCondition;

  submitStatus : boolean = true;
  addMoreStatus : boolean = true;

  test_type_responses: any = {}
  release_name_responses: any = {}
  run_no_responses: any = {}

  typesOfResult = ['All Results','Passed Results', 'Closure Results']


  constructor(
    public dialog: MatDialog,
    private appService: AppService,
    private fb: FormBuilder
  ) {
    this.resultCompare = this.fb.group({
      app_name: '',
      test_condition: '',
      release_name: '',
      test_type: '',
      test_run_no: '',
      data: this.fb.array([]),
    });

  }

  
  getAppNames() {
    let respBody = {
      "getDataFor": "app_name"
    };
    this.appService.getInfo(respBody).subscribe(data => {
      this.appNameList = data['data'];
    });
  }

  getReleaseNames() {
    let respBody = {
      "getDataFor": "release_name"
    };
    
    this.appService.getResult(respBody).subscribe(data => {
      this.releaseNameList = data['data'];
    });  
  }

  onAppNameSelect(app_name_t) {
    this.submitStatus = true
    this.addMoreStatus = true
    this.removeRow('all');
    this.appName = app_name_t;
    this.testType = null;
    this.runNumber = null;
    this.releaseName = null;
    this.testTypeList = [];
    this.runNumberList = [];
    this.releaseNameList = [];

    // if(this.resultCompare.data.length > 0)

    // this.fileToRender = null;

    let requestForReleaseName = {
      "getDataFor": "release_name",
      "app_name": app_name_t,
      "test_condition": this.testCondition

    };

    if(this.testCondition && this.appName){
      return this.appService.getInfo(requestForReleaseName).subscribe(
        data => {
          this.resultCompare.patchValue({
            release_name: '',
            test_type: '',
            test_run_no: ''
          })
          let response = data['data'];
          this.releaseNameList = response;
          this.testTypeList = null;
          this.runNumber = null;
          this.runNumberList = [];
        });
    }    
  }

  onConditionSelect(testCondition){
    this.submitStatus = true
    this.addMoreStatus = true
    this.removeRow('all');
    this.testCondition = testCondition;
    this.testType = null;
    this.runNumber = null;
    this.releaseName = null;
    this.testTypeList = [];
    this.runNumberList = [];
    this.releaseNameList = [];

    // if(this.resultCompare.data.length > 0)

    // this.fileToRender = null;

    let requestForReleaseName = {
      "getDataFor": "release_name",
      "app_name": this.appName,
      "test_condition": testCondition
    };

    if(this.testCondition && this.appName){
      return this.appService.getInfo(requestForReleaseName).subscribe(
        data => {
          this.resultCompare.patchValue({
            release_name: '',
            test_type: '',
            test_run_no: ''
          })
          let response = data['data'];
          this.releaseNameList = response;
          this.testTypeList = null;
          this.runNumber = null;
          this.runNumberList = [];
        });
    }    
  }


  onReleaseNameSelect(release_name_t, sect, c_index) {
    
    if (sect == "c_main") {
      this.addMoreStatus = true
      this.submitStatus = true
      this.testType = null;
      this.runNumber = null;
      this.releaseName = release_name_t
      this.testTypeList = [];
      this.runNumberList = [];
    }

    if (sect == "c_sub") {
      this.submitStatus = true
      this.addMoreStatus = true
      this.release_name_responses[c_index] = release_name_t
    }

    let requestForAppName = {
      "getDataFor": "test_type",
      "release_name": release_name_t,
      "app_name": this.appName,
      "test_condition": this.testCondition
    };

    return this.appService.getInfo(requestForAppName).subscribe(
      data => {
        if (sect == "c_main") {
          this.resultCompare.patchValue({
            test_type: '',
            test_run_no: ''
          })
          let response = data['data'];
          this.testTypeList = response;
          this.runNumberList = [];
          this.runNumber = null;
        }
        if (sect == "c_sub") {
          this.test_type_responses[c_index] = data['data'];
        }
      });
  }


  onTestTypeSelect(test_type_t, sect, c_index) {
    let requestForRunNumber = {}
    if (sect == "c_main") {
      this.addMoreStatus = true
      this.submitStatus = true
      this.runNumber = null;
      this.testType = test_type_t
      this.runNumberList = [];

      requestForRunNumber = {
        "getDataFor": "run_number",
        "app_name": this.appName,
        "release_name": this.releaseName,
        "test_type": test_type_t,
        "test_condition": this.testCondition
      };
    }

    if (sect == "c_sub") {
      this.submitStatus = true
      this.addMoreStatus = true
      requestForRunNumber = {
        "getDataFor": "run_number",
        "app_name": this.appName,
        "release_name": this.release_name_responses[c_index],
        "test_type": test_type_t,
        "test_condition": this.testCondition
      };
    }



    return this.appService.getInfo(requestForRunNumber).subscribe(
      data => {
        let response = data['data'];

        if (sect == "c_main") {
          this.resultCompare.patchValue({
            test_run_no: ''
          })
          this.runNumberList = response;
        }

        if (sect == "c_sub") {
          this.run_no_responses[c_index] = response
        }
      });
  }

  onRunNoSelect(sect){
    if(sect === 'c_main'){
      this.submitStatus = false
      this.addMoreStatus = false
    }
    
    if(sect === 'c_sub'){
      let table_rows_count = this.resultCompare.value.data.length
      this.submitStatus = false
      if (table_rows_count == 5){
        this.addMoreStatus = true
      }
      else{
        this.addMoreStatus = false
      }
    }
  }

  dataSet(): FormArray {
    return this.resultCompare.get("data") as FormArray
  }

  compareDataSet(): FormArray {
    return this.resultCompare.get("compare") as FormArray
  }

  compareData(): FormGroup {
    return this.fb.group({
      release_name: '',
      test_type: '',
      test_run_no: ''
    });
  }

  pushCompareDate() {
    this.compareDataSet().push(this.compareData());
  }

  newRow(): FormGroup {
    return this.fb.group({
      release_name: '',
      test_type: '',
      test_run_no: ''
    })
  }

  addRow() {
    this.dataSet().push(this.newRow());
    this.submitStatus = true
    this.addMoreStatus = true
    let table_rows_count = this.resultCompare.value.data.length
    if(table_rows_count == 5){
      this.addMoreStatus = true
    }
  }

  removeRow(i) {
    if(i == 'all'){
      let table_rows_count = this.resultCompare.value.data.length
      while(table_rows_count!=-1){
        this.dataSet().removeAt(table_rows_count);
        table_rows_count = table_rows_count - 1
      }
    }
    else{
    this.dataSet().removeAt(i);
    let table_rows_count = this.resultCompare.value.data.length
    if (table_rows_count == 0){
      this.submitStatus = false
      this.addMoreStatus = false
      }
    }
  }


  ngOnInit() {
    this.getAppNames();
  }


  app_name_c: '';
  release_name_c: '';
  test_type_c: '';
  test_run_no_c: '';

  public test_info_cw: any[] = [{
    release_name_cw: '',
    test_type_cw: '',
    test_run_no_cw: ''
  }];

 
  tooltipShowDelay = 0;
  frameworkComponents = { customTooltip: CustomTooltip };

  openDialog() {


    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.hasBackdrop = true;
    dialogConfig.height = '90%';
    // dialogConfig.position = {
    //   top: '0',
    //   left: '0',

    // };
    dialogConfig.data = {
      dataKey: this.resultCompare.value
    };

    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      height: '95%',
      width: '90%',
      data: {
        dataKey: this.resultCompare.value,
        resultType: "Comparision",
        title: this.resultCompare.value['app_name']
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
