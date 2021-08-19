import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public clickedMenuItem: string = 'None';
  public fileToRender: any;
  public applicationData: any;
  showProfileInfo: false;

  constructor(private appService: AppService, private http: HttpClient) { }

  ngOnInit() {
  }

  clickedItem(clickedMenuItem) {
    this.clickedMenuItem = clickedMenuItem;
  }

  fileToRenderInUI(appInfo) {
    let path = 'assets/result.html';
    this.http.get(path, { responseType: "text" }).subscribe(
      data => {
        this.fileToRender = data;
      });
  }

  showProfile(event) {
    this.showProfileInfo = event;
  }

}
