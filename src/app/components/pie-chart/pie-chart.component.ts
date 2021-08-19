import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Chart } from 'node_modules/chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  server_data;
  bug_data;
  totalBugs;
  loader = true;
  openBugsCount;
  colorBug;
  labelResolution;
  dataResolution;

  labels = [];
  stats = [];


  constructor(private appService: AppService) { }

  ngOnInit() {
    Chart.plugins.unregister(ChartDataLabels);
    Chart.helpers.merge(Chart.defaults.global.plugins.datalabels, {
      color: 'black'
    });
    this.appService.dbMonitoringSprintTrack({
      "getDataFor": "project_wise_data"
    }).subscribe(data => {

      this.labels = data['labels'];
      this.stats = data['data'];
      this.totalBugs = data['bugs']['total'];
      this.openBugsCount = data['bugs']['open'];
      this.colorBug = data['bugs']['color'];
      this.labelResolution = data['labels_resolution'];
      this.dataResolution = data['data_resolution'];
      this.loader = false;

      let colors = this.colorPicker(Object.keys(this.stats).length)

      this.server_data = new Chart("myPieChart", {
        plugins: [ChartDataLabels],
        type: 'bar',
        data: {
          datasets: [{
            data: this.stats,
            backgroundColor: colors,
            borderColor: colors,
            hoverBorderWidth: 5
          }],
          labels: this.labels
        },
        options: {
          layout: {
            padding: {
              top: 15,
            }
          },

          scales:{
            yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
          },

          title: {
            display: true,
            text: 'Module Wise Open Bug Count',
            fontSize: 18,
            fontColor: '#696665'
          },

          legend: {
            display: false,
          },
          maintainAspectRatio: true
        }
      });

      this.bug_data = this.openBugsCount
      this.server_data = new Chart("openBug", {
        plugins: [ChartDataLabels],
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.openBugsCount, this.totalBugs - this.openBugsCount],
            backgroundColor: ['rgb(255, 21, 0, 0.6)', 'rgb(23, 252, 15, 0.6)'],
            borderColor: ['red', 'green'],
            hoverBorderWidth: 8
          }],
          labels: ['Open', 'Closed']
        },
        options: {
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI,
          title: {
            display: true,
            text: ' ',
            fontSize: 18
          },

          legend: {
            display: true,
            labels: {
              fontSize: 10,
              // boxWidth: 15,
            },

            // boxWidth: 20,
            // usePointStyle: true,
            position: 'top'
          },
          maintainAspectRatio: true
        }
      });

      let colors_res = this.colorPicker(Object.keys(this.labelResolution).length)


      this.server_data = new Chart("resolutionChart", {
        plugins: [ChartDataLabels],
        type: 'horizontalBar',
        data: {
          datasets: [{
            data: this.dataResolution,
            backgroundColor: colors_res,
            borderColor: colors_res,
            hoverBorderWidth: 8
          }],
          labels: this.labelResolution
        },
        options: {
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Resolution',
            fontSize: 18
          },
          legend: {
            display: false,
          }
        }
      });

    });
  }


  colorPicker(len) {
    let colors = [];
    for (let i = 0; i < len; i++) {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      colors.push("rgb(" + r + "," + g + "," + b + ")");
    }
    return colors;
  }
}

