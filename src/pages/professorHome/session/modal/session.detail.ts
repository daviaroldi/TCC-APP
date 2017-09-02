import { Component, OnInit } from '@angular/core';
import { NavController, Events, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { QuestionCreatePage } from './question/question.create';
import { SessionService } from "../session.service";

@Component({
    selector: 'page-session-detail',
    templateUrl: 'session.detail.html',
    providers: [ SessionService ]
})
export class SessionDetailPage {
    private session: Object;

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public params: NavParams,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      public service: SessionService) { }

    ngOnInit() {
      this.session = this.params.get('session');
    }

    addQuestion() {
      // let questionModal = this.modalCtrl.create(QuestionCreatePage, {session: this.session});
      this.navCtrl.push(QuestionCreatePage, {session: this.session, parentPage: this});
    }

    delete() {

    }

    reload() {
      this.storage.get('token').then(token => {
        this.service.getSession(this.session['id'], token).then((session) => {
          console.log(this.session);
          console.log(session);
          this.session = session;
        });
      });
    }

    dismiss() {
      this.viewCtrl.dismiss();
    }
}
