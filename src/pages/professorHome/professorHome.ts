import { Component, OnInit } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";

import { LoginPage } from "../login/login";
import { SessionPage } from "./session/session";
import { AnswerPage } from "./answer/answer";

@Component({
    selector: 'page-home-professor',
    templateUrl: 'professorHome.html'
})
export class ProfessorHomePage {
    private user: Object = {
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
    };

    constructor(public navCtrl: NavController, public storage: Storage, public events: Events) {
      this.events.publish('pages', this.getProfessorPages());
    }

    ngOnInit() {
        this.storage.get('user').then(user => {
            this.user = user;
        });
    }

    getProfessorPages() {
      return [
        { title: 'Sessões', component: SessionPage },
        { title: 'Respostas', component: AnswerPage },
        { title: 'Logout', component: LoginPage }
      ];
    }
}
