import { Component, OnInit , ViewChild } from '@angular/core';
import { NavController, Events, ModalController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AnswerService } from "../answer.service";
import { SessionDetailPage } from "../session/modal/session.detail";
import { Chart } from 'chart.js';

@Component({
    selector: 'page-answer-show',
    templateUrl: 'answer.show.html',
    providers: [ AnswerService ]
})
export class AnswerShowPage {
    private answers: any[];
    private question: any;
    private showGraph: boolean = true;
    private heightCanvas: number = 0;

    @ViewChild('doughnutCanvas') doughnutCanvas;
    doughnutChart: any;

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public service: AnswerService,
      public params: NavParams) { }

    ngOnInit() {
      this.question = this.params.get('question');
      if (this.question['type'] == 2) {

        this.heightCanvas = 0;
        console.log(this.heightCanvas);
      }
      this.getAnswers();
    }

    getAnswers() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            question: this.question.id,
            type: (this.question['type'] == 1 ? 'chart' : 'table')
          };
          this.service.getAnswers(params, token).then((answers) => {
            this.answers = answers;
            console.log(this.answers);
            console.log(this.question.type);
            if (this.question['type'] == 1) {
              this.updateData();
            }
          });
        });
      });
    }
    // Doughnut
    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [350, 450, 100, 351, 451, 101];
    public doughnutChartType:string = 'doughnut';
    //
    // // events
    // public chartClicked(e:any):void {
    //   console.log(e);
    // }
    //
    // public chartHovered(e:any):void {
    //   console.log(e);
    // }

    private updateData():void {
      this.doughnutChartLabels = new Array();
      this.doughnutChartData = new Array();
      for (let ans in this.answers) {
        this.doughnutChartLabels.push(this.answers[ans]['label']);
        this.doughnutChartData.push(this.answers[ans]['value_count']);
      }

      this.doChart();
    }

    private doChart() {
      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: this.doughnutChartType,
            data: {
                labels: this.doughnutChartLabels,
                datasets: [{
                    label: '# of Votes',
                    data: this.doughnutChartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
            }
        });
    }

    // create() {
    //   let createModal = this.modalCtrl.create(SessionCreatePage, {});
    //   createModal.present();
    //   createModal.onDidDismiss(data => {
    //     if ('name' in data) {
    //       this.reloadList();
    //     }
    //   });
    // }
    //
    // answersList(session) {
    //   this.navCtrl.push(, {session: session, parentPage: this});
    // }

    // public reloadList() {
    //   this.storage.get('token').then(token => {
    //     this.storage.get('user').then(user => {
    //       let params = {
    //         session: this.session.id
    //       };
    //       this.service.getQuestions(params, token).then((questions) => {
    //         console.log(questions);
    //         this.questions = questions;
    //       });
    //     });
    //   });
    // }
    // showAnswers(question) {
    //
    // }
    //
    // reload() {
    //   this.reloadList();
    // }
}
