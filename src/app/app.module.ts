import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AgGridModule } from 'ag-grid-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppbarComponent } from './components/appbar/appbar.component';
import { HeaderComponent } from './components/header/header.component';

import { HttpClientModule } from '@angular/common/http';
import { ResultsComponent } from './components/results/results.component';
import { ServerstatusComponent } from './components/serverstatus/serverstatus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { SmartTableComponent } from './components/smart-table/smart-table.component';
import { DialogContentExampleDialog  } from './components/smart-table/result-modal.component';
import { ResultCompareComponent } from './components/result-compare/result-compare.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    AppbarComponent,
    HeaderComponent,
    ResultsComponent,
    ServerstatusComponent,
    LineChartComponent,
    PieChartComponent,
    SmartTableComponent,
    DialogContentExampleDialog,
    ResultCompareComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    AgGridModule.withComponents([])
  ],

  exports:[
    MatDialogModule
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogContentExampleDialog]
})
export class AppModule { }
