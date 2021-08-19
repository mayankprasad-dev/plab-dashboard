import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-serverstatus',
  templateUrl: './serverstatus.component.html',
  styleUrls: ['./serverstatus.component.scss']
})
export class ServerstatusComponent implements OnInit {

  appDetails: any;
  some: any;
  window: boolean;
  database: boolean;
  application: boolean;
  loading: boolean;
  constructor(private appService: AppService){
  }

  ngOnInit() {
    this.appsData();
  }

  onCheckboxChange(event, title: any, app){
    if(confirm("Do you want to proceed?")){
      let request_body = {"app_name" : title, "transition": event};
      this.appService.serverTransition(request_body).subscribe(status => {
        if (status['success']){
          let response = status['data'];
          let app_name = '';
          let serverType = '';
          app_name = response.app_name.split('@')[0];
          serverType = response.app_name.split('@')[1];
          
          let selectedApp = this.appDetails.filter(app => app.title === app_name);
          
          if (serverType === "WIN"){
          selectedApp.win_status = response.transition;
          }
          else if (serverType === "APP"){
            selectedApp.app_status = response.transition;
          }
          else if (serverType === "DB"){
            selectedApp.db_status = response.transition;
          }
        }
      });
    } else {
      let selectedApp = this.appDetails.filter(appObj => appObj.title === app.title);
      let serverType = title.split("@", 2)[1];
      
      setTimeout(() => {
        if (serverType === "WIN"){
          selectedApp[0].win_status = !event;
        }
        else if (serverType === "APP"){
          selectedApp[0].app_status = !event;
        }
        else if (serverType === "DB"){
          selectedApp[0].db_status = !event;
        }
      }, 1);
    } 
  }

  appsData(){
    this.loading = true;
    this.appService.appsData().subscribe((data) => {
      this.appDetails = data;
      this.loading = false;
    });
  }

  refresh(){
    this.appDetails = this.some;
    this.ngOnInit();
  }

}