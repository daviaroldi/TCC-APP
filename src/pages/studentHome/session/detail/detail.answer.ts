import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SessionService } from "../../../professorHome/session/session.service";
// import { SessionConnectPage } from "./modal/session.connect";
// import { SessionDetailPage } from "./modal/session.detail"

@Component({
    selector: 'page-detail-answer',
    templateUrl: 'detail.answer.html',
    providers: [ SessionService ]
})
export class DetailAnswerPage {
    public question: Object;
    private answer: Object = {
      value: '',
      option: '',
      id: ''
    };

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public params: NavParams,
      public viewCtrl: ViewController,
      public service: SessionService,
      public modalCtrl: ModalController,
      public alertCtrl: AlertController,) { }

    ngOnInit() {
      this.question = this.params.get('question');
      console.log(this.question);
      this.getAnswer();
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

    confirmAnswer() {
      let alert = this.alertCtrl.create({
          title: ('Confirmar'),
          subTitle: ('Confirma o envio da resposta?'),
          buttons: [
            {
              text: 'OK',
              role: 'ok',
              handler: () => {
                  this.answerQuestion();
              }
            },
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
      });

      alert.present();
    }

    answerQuestion() {
      let params;
      if (this.question['type'] == 2 && this.answer['value']) {
        params = {
          value: this.answer['value'],
          question: this.question['id'],
          student: '',
          id: this.answer['id']
        };
      } else if (this.question['type'] == 1 && this.answer['option']) {
        params = {
          value: '',
          option: this.answer['option'],
          question: this.question['id'],
          student: '',
          id: this.answer['id']
        };
      }

      if (params) {
        this.storage.get('token').then(token => {
          this.storage.get('user').then(user => {
            // console.log(this.answer['value']);
            params['student'] = user.id;
            this.service.answerQuestion(params, token).then((answer) => {
              if (!answer['error']) {
                this.answer = answer;
                this.viewCtrl.dismiss({});
              }
            });
          });
        });
      } else {
        let alert = this.alertCtrl.create({
            title: ('Erro'),
            subTitle: ('Resposta inválida!'),
            buttons: [
              {
                text: 'OK',
                role: 'ok',
                handler: () => {
                    // this.answerQuestion();
                }
              }
            ]
        });

        alert.present();
      }
    }

    dismiss() {
      this.viewCtrl.dismiss({});
    }

    getAnswer() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            question: this.question['id'],
            student: user.id
          };
          this.service.getAnswers(params, token).then((answer) => {
            if (answer.length > 0) {
              this.answer['value'] = answer[0]['value'];
              this.answer['id'] = answer[0]['id'];
              if (answer[0]['option']) {
                this.answer['option'] = answer[0]['option']['id'];
              }
            }
          });
        });
      });
    }
}
