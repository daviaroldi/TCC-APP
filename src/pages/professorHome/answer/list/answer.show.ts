import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AnswerService } from "../answer.service";
import { SessionDetailPage } from "../session/modal/session.detail";

@Component({
    selector: 'page-answer-show',
    templateUrl: 'answer.show.html',
    providers: [ AnswerService ]
})
export class AnswerShowPage {
    private answers: any[];
    private question: any;
    private showGraph: boolean = false;

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public service: AnswerService,
      public params: NavParams) { }

    ngOnInit() {
      this.question = this.params.get('question');
      this.getAnswers();
    }

    getAnswers() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            question: this.question.id
          };
          this.service.getAnswers(params, token).then((answers) => {
            // console.log(questions);
            this.answers = answers;
          });
        });
      });
    }
    // Doughnut
    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';

    // events
    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
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
