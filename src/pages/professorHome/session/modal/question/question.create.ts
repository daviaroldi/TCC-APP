import { Component, OnInit } from '@angular/core';
import { NavController, Events, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { QuestionService } from "./question.service";

@Component({
    selector: 'page-question-create',
    templateUrl: 'question.create.html'
})
export class QuestionCreatePage {
    private question: Object = {
      description: ''
    };
    private session: Object;

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public params: NavParams,
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      public service: QuestionService,
      public alertCtrl: AlertController) { }

    ngOnInit() {
      this.session = this.params.get('session');
    }

    addQuestion() {
      this.storage.get('token').then((token) => {
        this.service.create(this.question, token).then((data) => {
          this.notifySucess();
        });
      });
    }
    //
    // delete() {
    //
    // }
    //
    dismiss() {
      this.viewCtrl.dismiss();
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
}