import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { AnswerService } from "./answer.service";
import { AnswerListPage } from "./list/answer.list";

@Component({
    selector: 'page-answer',
    templateUrl: 'answer.html',
    providers: [ AnswerService ]
})
export class AnswerPage {
    private sessions: any[];

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public service: AnswerService,
      public modalCtrl: ModalController) { }

    ngOnInit() {
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
    answersList(session) {
      this.navCtrl.push(AnswerListPage, {session: session, parentPage: this});
    }
    //
    private reloadList() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            professor: user.id,
            deadline_lt_now: 1
          };
          this.service.getSessions(params, token).then((sessions) => {
            this.sessions = sessions;
          });
        });
      });
    }
    //
    // reload() {
    //   this.reloadList();
    // }
}
