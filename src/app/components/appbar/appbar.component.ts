import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  @Input() clickedSidebarItem: any;
  @Output() fileToRender = new EventEmitter();
  public buttonClicked = 'LR';
  public applist: any = [
    {
      isOpen: false,
      title: 'BCM',
      status: false,
      appInfrastructure: 0,
      dbInfrastructure: 0,
      path: '/bcm/view/OPEN',
    }
  ];

  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  onAppClick(app) {
    this.fileToRender.emit(app);
  }

  onClick(buttonClicked) {
    this.buttonClicked = buttonClicked;
  }

}
