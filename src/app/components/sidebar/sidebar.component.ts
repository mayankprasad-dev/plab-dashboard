import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() clickedItem = new EventEmitter();
  public clickedMenuItem: any;
  public menuItems: any = [{
    name: 'dashboard',
    isOpen: false,
    title: 'Dashboard',
    path: '/dashboard/view/OPEN',
  },
  {
    name: 'server',
    isOpen: false,
    title: 'Server Status',
    path: '/server/view/OPEN',
  },
  {
    name: 'result',
    isOpen: false,
    title: 'Result',
    path: '/result/view/OPEN',
  },
  {
    name: 'comparision',
    isOpen: false,
    title: 'Comparision',
    path: '/analysis/view/OPEN',
  },
  {
    name: 'sit',
    isOpen: false,
    title: 'SIT Results',
    path: '/sit/view/OPEN',
  }];

  constructor() { }

  ngOnInit() {
  }

  setmenu(menu) {
    if(this.clickedMenuItem) {
      this.clickedMenuItem[0].isOpen = false;
    }
    this.clickedMenuItem = this.menuItems.filter(item => item === menu);
    this.clickedMenuItem[0].isOpen = true;
    this.clickedItem.emit(menu.title);
  }
}
