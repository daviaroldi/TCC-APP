import { Component, OnInit } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SessionConnectService } from "./session.connect.service";

@Component({
    selector: 'page-session-connect',
    templateUrl: 'session.connect.html',
    providers: [ SessionConnectService ]
})
export class SessionConnectPage {
    private session: Object = {
      name: '',
      deadline: ''
    };
    private code: any;

    constructor(
      public storage: Storage,
      public service: SessionConnectService,
      public viewCtrl: ViewController,
      public alertCtrl: AlertController,) { }

    // ngOnInit() {
    //
    // }

    connect() {
      if (!this.code) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: 'Código inválido!',
            buttons: [
              {
                text: 'OK'
            //     role: 'ok',
            //     // handler: () => {
            //     //   // this.viewCtrl.dismiss(this.session);
            //     // }
              }
            ]
        });

        alert.present();
      } else {
        this.storage.get('token').then(token => {
          this.storage.get('user').then(user => {
            let params = {
              student: user.id,
              code: this.code
            };

            this.service.connect(params, token).then((result) => {
              let alert = this.alertCtrl.create({
                  title: (result['error'] ? 'Erro' : 'Sucesso'),
                  subTitle: (result['error'] ? result['message'] : 'Sessão conectada com sucesso'),
                  buttons: [
                    {
                      text: 'OK',
                      role: 'ok',
                      handler: () => {
                        if (!result['error']) {
                          this.viewCtrl.dismiss(this.session);
                        }
                      }
                    }
                  ]
              });

              alert.present();
            });
          });
        });
      }
    }

    dismiss() {
      this.viewCtrl.dismiss({});
    }
}
