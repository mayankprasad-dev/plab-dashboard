import { Component } from '@angular/core';
import { ITooltipAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'tooltip-component',
  template: ` <div class="custom-tooltip" style="border: solid; background-color: white;">
    <div [ngClass]="'panel panel-' + data.type">
      <div class="panel-heading">
      </div>
      <div class="panel-body">
        <p>WPM: 34.5<br> Error %: 10</p>
        <p>{{ data.total }}</p>
      </div>
    </div>
  </div>`,
  styles: [
    `
      :host {
        position: absolute;
        overflow: visible;
        pointer-events: none;
        transition: opacity 1s;
      }

      :host.ag-tooltip-hiding {
        opacity: 0;
      }

      .custom-tooltip p {
        margin: 5px;
        white-space: nowrap;
      }

      .custom-tooltip p:first-of-type {
        font-weight: bold;
      }
    `,
  ],
})

export class CustomTooltip implements ITooltipAngularComp {
    private params: any;
    private data: any;
  
    agInit(params): void {
      this.params = params;
  
      this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
      this.data.type = this.params.type || 'primary';
    }
}