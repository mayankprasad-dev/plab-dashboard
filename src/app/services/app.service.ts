import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // private apiServer = '';
  // private apiServer = 'http://172.27.132.224:5000';
  private apiServer = 'http://127.0.0.1:5001';
  // private apiServer = 'msi-l2324.metricstream.com:5678';


  constructor(private http: HttpClient) { }

  public getAppInfo() {
    let path = 'assets/result.html';
    return this.http.get(path, {responseType: "text"}).subscribe(
    data => {
      
    });
  }

  public appsData() {
    return this.http.get(this.apiServer+'/serversData', {responseType: "json"});
    // return this.appbarDetails;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptions_html = {
    headers: new HttpHeaders({ 'Content-Type': 'text/html', responseType: "text" })
  };

  httpOptions_xl = {
    headers: new HttpHeaders({ 'Content-Type': 'application/vnd.ms-excel', responseType: "blob" })
  };


  public serverTransition(requestBody){
    return this.http.post(this.apiServer+'/serverTransition', requestBody, this.httpOptions);
  }

  public getResult(requestBody){
    return this.http.post(this.apiServer+'/displayResult', requestBody, this.httpOptions);
  }

  public getInfo(requestBody){
    return this.http.post(this.apiServer+'/resultInfo', requestBody, this.httpOptions);
  }

  public resultDisplay(requestBody){
    return this.http.post(this.apiServer+'/resultInfo', requestBody, this.httpOptions);
  }

  public dbMonitoringSprintTrack(requestBody){
    return this.http.post(this.apiServer+'/dbMonitoring', requestBody,  {responseType: "json"});
  }

  public results(requestBody){
    return this.http.post(this.apiServer+'/results', requestBody, this.httpOptions);
  }

  public resultCompare(requestBody){
    return this.http.post(this.apiServer+'/resultCompare', requestBody, this.httpOptions);
  }

  public downloadFile(requestBody){
    let response =  this.http.post(this.apiServer+'/resultCompare', requestBody, this.httpOptions_xl);
  }

  public deleteFile(file){
    return this.http.get(this.apiServer+'/deleteReport/'+file, this.httpOptions);
    // console.log(response)
  }

}
