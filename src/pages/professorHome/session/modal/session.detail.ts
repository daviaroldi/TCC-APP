import { Component, OnInit } from '@angular/core';
import { NavController, Events, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
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
      public service: SessionService,
    public alertCtrl: AlertController,) { }

    ngOnInit() {
      this.session = this.params.get('session');
      this.orderQuestions();
    }

    private orderQuestions() {
      if (this.session['questions']) {
        this.session['questions'].sort((n1,n2) => {
            if (n1['id'] > n2['id']) {
                return 1;
            }

            if (n1['id'] < n2['id']) {
                return -1;
            }

            return 0;
        });
      }
    }

    addQuestion() {
      // let questionModal = this.modalCtrl.create(QuestionCreatePage, {session: this.session});
      this.navCtrl.push(QuestionCreatePage, {session: this.session, parentPage: this});
    }

    delete(question) {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            professor: user.id,
            deadline: this.session['deadline'],
            name: this.session['name']
          };
          this.service.deleteQuestion({id: question.id}, token).then((sessions) => {
            let alert = this.alertCtrl.create({
                title: 'Sucesso',
                subTitle: 'Sessão cadastrada com sucesso!',
                buttons: [
                  {
                    text: 'OK',
                    role: 'ok',
                    handler: () => {
                      this.viewCtrl.dismiss(this.session);
                    }
                  }
                ]
            });
            alert.present();
          });
        });
      });
    }

    editQuestion(question) {
      this.navCtrl.push(QuestionCreatePage, {session: this.session, question: question, parentPage: this});
    }

    reload() {
      this.storage.get('token').then(token => {
        this.service.getSession(this.session['id'], token).then((session) => {
          this.session = session;
          this.orderQuestions();
        });
      });
    }

    dismiss() {
      this.orderQuestions();
      this.params.get('parentPage').reload();
      this.viewCtrl.dismiss();
    }
}
