import { Component, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { LoginPage } from "../login/login";
import { SessionStudentPage } from "./session/session";

@Component({
    selector: 'page-home-student',
    templateUrl: 'studentHome.html'
})
export class StudentHomePage {
    private user: Object = {
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
    };

    constructor(public navCtrl: NavController, public storage: Storage, public events: Events) {
      this.events.publish('pages', this.getPages());
    }

    ngOnInit() {
        this.storage.get('user').then(user => {
            this.user = user;
        });
    }

    getPages() {
      return [
        { title: 'Responder Sessões', component: SessionStudentPage },
        { title: 'Logout', component: LoginPage }
      ];
    }
}
