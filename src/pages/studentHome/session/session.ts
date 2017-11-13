import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SessionService } from "../../professorHome/session/session.service";
import { SessionConnectPage } from "./modal/session.connect";
// import { SessionDetailPage } from "./modal/session.detail"

@Component({
    selector: 'page-student-session',
    templateUrl: 'session.html',
    providers: [ SessionService ]
})
export class SessionStudentPage {
    private sessions: any[];

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public service: SessionService,
      public modalCtrl: ModalController) { }

    ngOnInit() {
      this.reloadList();
    }

    connect() {
      let createModal = this.modalCtrl.create(SessionConnectPage, {});
      createModal.present();
      createModal.onDidDismiss(data => {
        if ('name' in data) {
          this.reloadList();
        }
      });
    }

    sessionDetail(session) {
      // let detailModal = this.modalCtrl.create(SessionDetailPage, {session: session});
      // detailModal.present();
    }

    reloadList() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            student: user.id
          };
          this.service.getSessions(params, token).then((sessions) => {
            this.sessions = sessions;
          });
        });
      });
    }
}
