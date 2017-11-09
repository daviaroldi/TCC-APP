import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AnswerService } from "../answer.service";
import { AnswerShowPage } from "./answer.show";

@Component({
    selector: 'page-answer-list',
    templateUrl: 'answer.list.html',
    providers: [ AnswerService ]
})
export class AnswerListPage {
    private session: any;
    private questions: any[];

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public service: AnswerService,
      public params: NavParams) { }

    ngOnInit() {
      this.session = this.params.get('session');
      this.reloadList();
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
    showAnswers(question) {
      this.navCtrl.push(AnswerShowPage, {question: question, parentPage: this});
    }

    public reloadList() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            session: this.session.id
          };
          this.service.getQuestions(params, token).then((questions) => {
            // console.log(questions);
            this.questions = questions;
          });
        });
      });
    }
    //
    // reload() {
    //   this.reloadList();
    // }
}
