import { Component, OnInit } from '@angular/core';
import { NavController, Events, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { QuestionCreatePage } from './question/question.create';

@Component({
    selector: 'page-session-detail',
    templateUrl: 'session.detail.html'
})
export class SessionDetailPage {
    private session: Object;

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public params: NavParams,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController) { }

    ngOnInit() {
      this.session = this.params.get('session');
    }

    addQuestion() {
      // let questionModal = this.modalCtrl.create(QuestionCreatePage, {session: this.session});
      this.navCtrl.push(QuestionCreatePage, {session: this.session});
    }

    delete() {

    }

    dismiss() {
      this.viewCtrl.dismiss();
    }
}
