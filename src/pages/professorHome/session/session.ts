import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SessionService } from "./session.service";
import { SessionCreatePage } from "./modal/session.create";
import { SessionDetailPage } from "./modal/session.detail"

@Component({
    selector: 'page-session',
    templateUrl: 'session.html',
    providers: [ SessionService ]
})
export class SessionPage {
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

    create() {
      let createModal = this.modalCtrl.create(SessionCreatePage, {});
      createModal.present();
      createModal.onDidDismiss(data => {
        if ('name' in data) {
          this.reloadList();
        }
      });
    }

    sessionDetail(session) {
      console.log(session);
      let detailModal = this.modalCtrl.create(SessionDetailPage, {session: session});
      detailModal.present();
    }

    reloadList() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            professor: user.id
          };
          this.service.getSessions(params, token).then((sessions) => {
            this.sessions = sessions;
          });
        });
      });
    }
}
