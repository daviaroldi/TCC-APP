import { Component, OnInit } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SessionService } from "../session.service"
import moment from 'moment';

@Component({
    selector: 'page-session-create',
    templateUrl: 'session.create.html',
    providers: [ SessionService ]
})
export class SessionCreatePage {
    private session: Object = {
      name: '',
      deadline: moment().format('YYYY-MM-DDTHH:mm:ss'),
      started_at: moment().format('YYYY-MM-DDTHH:mm:ss')
    };
    // private deadline = moment().format('YYYY-MM-DDTHH:mm:ss');
    // private started_at = moment().format('YYYY-MM-DDTHH:mm:ss');

    constructor(
      public storage: Storage,
      public service: SessionService,
      public viewCtrl: ViewController,
      public alertCtrl: AlertController,) { }

    // ngOnInit() {
    //
    // }

    create() {
      // let t = new Date();
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let deadline = new Date(this.session['deadline']);
          let started_at = new Date(this.session['started_at']);

          let params = {
            professor: user.id,
            deadline: deadline.toISOString(),
            started_at: started_at.toISOString(),
            name: this.session['name']
          };

          this.service.create(params, token).then((sessions) => {
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

    dismiss() {
      this.viewCtrl.dismiss({});
    }
}
