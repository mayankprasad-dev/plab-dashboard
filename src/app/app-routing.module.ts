import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SmartTableComponent } from './components/smart-table/smart-table.component';
import { ResultCompareComponent } from './components/result-compare/result-compare.component';
import { DialogContentExampleDialog } from './components/smart-table/result-modal.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { 
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'resultDetails',
    component: DialogContentExampleDialog
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
