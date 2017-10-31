import { Component, OnInit } from '@angular/core';
import { NavController, Events, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { QuestionService } from "./question.service";
import { QuestionType } from "./question.interface";
import { Question } from "./question.model";

@Component({
    selector: 'page-question-create',
    templateUrl: 'question.create.html',
    providers: [ QuestionService ]
})
export class QuestionCreatePage {
    private question: QuestionType;
    private session: Object;
    private showOptions: boolean = false;

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public params: NavParams,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      public service: QuestionService,
      public alertCtrl: AlertController) { }

    ngOnInit() {
      let questionTMP = this.params.get('question');
      this.session = this.params.get('session');
      if (questionTMP != undefined) {
        this.question = questionTMP;
        if (this.question.type == 1) {
          this.showOptions = true;
        }
      } else {
        this.question = new Question('', '', 0, null);
      }
      this.question.session = this.session['id'];
    }

    addQuestion() {
      if (this.question['description'].trim() != '' && (this.question['type'] == 1 || this.question['type'] == 2)) {
        this.storage.get('token').then((token) => {
          console.log(this.question.id);
          if (this.question.id) {
            this.service.update(this.question, token).then((data) => {
              this.notifySucess();
            });
          } else {
            this.service.create(this.question, token).then((data) => {
              this.notifySucess();
            });
          }
        });
      } else {
        this.notifyError('Verifique os campos preenchidos');
      }
    }

    // delete() {
    //
    // }

    dismiss() {
      this.params.get('parentPage').reload();
      this.viewCtrl.dismiss();
    }

    changeQuestionType() {
      if (this.question['type'] == 1) {
        this.showOptions = true;
      } else {
        this.showOptions = false;
      }
    }

    addOption() {
      this.question['options'].push({
        label: ""
      });
      // this.options.nativeElement.insertAdjacentHTML('beforeend', '<ion-item><ion-input type="text" [(ngModel)]="question.options[1]" name="options" required></ion-input></ion-item>');
    }

    private notifySucess() {
        let alert = this.alertCtrl.create({
            title: 'Sucesso',
            subTitle: 'Questão Inserida com Sucesso',
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.dismiss();
                    }
                }
            ]
        });

        alert.present();
    }

    private notifyError(message) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: message,
            buttons: [
                {
                    text: 'OK'
                    // handler: () => {
                    //     this.dismiss();
                    // }
                }
            ]
        });

        alert.present();
    }
}
