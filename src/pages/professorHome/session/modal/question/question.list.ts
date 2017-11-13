import { Component, OnInit } from '@angular/core';
import { NavController, Events, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { QuestionCreatePage } from './question.create'

@Component({
    selector: 'page-question-list',
    templateUrl: 'question.list.html'
})
export class QuestionListPage {
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
      let questionModal = this.modalCtrl.create(QuestionCreatePage, {session: this.session});
    }
    //
    // delete() {
    //
    // }
    //
    // dismiss() {
    //   this.viewCtrl.dismiss();
    // }
}
