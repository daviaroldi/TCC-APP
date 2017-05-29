import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { SessionService } from "../session.service"

@Component({
    selector: 'page-session-create',
    templateUrl: 'session.create.html',
    providers: [ SessionService ]
})
export class SessionCreatePage {
    private session: Object = {
      name: '',
      deadline: ''
    };

    constructor(
      public storage: Storage,
      public service: SessionService,
      public viewCtrl: ViewController) { }

    // ngOnInit() {
    //
    // }

    create() {
      this.storage.get('token').then(token => {
        this.storage.get('user').then(user => {
          let params = {
            professor: user.id,
            deadline: this.session['deadline'],
            name: this.session['name']
          };

          this.service.create(params, token).then((sessions) => {
            console.log(sessions);
            // this.sessions = sessions;
          });
        });
      });
    }

    dismiss() {
      this.viewCtrl.dismiss();
    }
}
