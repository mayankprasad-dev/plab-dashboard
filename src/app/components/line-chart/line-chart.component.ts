import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})


export class LineChartComponent implements OnInit {

  labels = [];
  created = [];
  updated = [];
  reopened = [];
  server_data;
  
  constructor(private appService: AppService) {
  }

  ngOnInit() {

    this.appService.dbMonitoringSprintTrack({
      "getDataFor": "track_sprint"
    }).subscribe(data => {
      this.labels = data['sprints'];
      this.created = data['data'][0];
      this.updated = data['data'][1];
      this.reopened = data['data'][2];

      this.server_data = new Chart("myLineChart", {
        type: 'line',

        data: {
          labels: this.labels,
          axisY: {
            title: 'Count'
          },
          axisX: {
            title: 'Sprints'
          },
          datasets: [{
            data: this.created,
            label: 'Created',
            backgroundColor: 'rgb(237, 126, 126, 0.4)',
            borderColor: 'red',
          }, {
            data: this.updated,
            label: 'Updated',
            backgroundColor: 'rgb(255, 239, 92, 0.4)',
            borderColor: 'yellow',
          }, {
            data: this.reopened,
            label: 'Re-Opened',
            backgroundColor: 'rgb(255, 176, 92, 0.4)',
            borderColor: 'orange',
          },
          ]
        },
        options: {
          responsive: true,
          layout: {
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            }
        },

          title: {
            display: true,
            text: 'DB Monitoring Sprint Trend',
            fontSize: 18,
            fontColor: '#696665'
        },
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Count'
              },
              ticks: {
                beginAtZero: true
              },
              stacked: false
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Sprint Name'
              }
            }]
          }
        }
      });
    });
  }
}