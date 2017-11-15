import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SessionService } from "../../../professorHome/session/session.service";
// import { SessionConnectPage } from "./modal/session.connect";
import { DetailAnswerPage } from "./detail.answer"

@Component({
    selector: 'page-detail',
    templateUrl: 'detail.html',
    providers: [ SessionService ]
})
export class DetailPage {
    private questions: any[];
    private session: Object;

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public params: NavParams,
      public viewCtrl: ViewController,
      public service: SessionService,
      public modalCtrl: ModalController) { }

    ngOnInit() {
      this.session = this.params.get('session');
      console.log(this.session);
      this.reloadList();
    }

    // connect() {
    //   let createModal = this.modalCtrl.create(SessionConnectPage, {});
    //   createModal.present();
    //   createModal.onDidDismiss(data => {
    //     if ('name' in data) {
    //       this.reloadList();
    //     }
    //   });
    // }
    //
    // sessionDetail(session) {
    //   let detailModal = this.modalCtrl.create(DetailPage, {session: session});
    //   detailModal.present();
    //   detailModal.onDidDismiss(data => {
    //     if ('name' in data) {
    //       this.reloadList();
    //     }
    //   });
    // }

    answer(question) {
      this.navCtrl.push(DetailAnswerPage, {session: this.session, question: question, parentPage: this});
    }

    dismiss() {
      this.viewCtrl.dismiss({});
    }

    reloadList() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            session: this.session['id']
          };
          this.service.getSessions(params, token).then((questions) => {
            this.questions = questions;
          });
        });
      });
    }
}
