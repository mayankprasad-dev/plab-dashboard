import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {  ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public showProfile: boolean = false;
  @Output() showProfileEmit = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  onProfileClick() {
    this.showProfile = !this.showProfile;
    this.showProfileEmit.emit(this.showProfile);
  }

}
