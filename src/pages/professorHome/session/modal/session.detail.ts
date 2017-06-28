import { Component, OnInit } from '@angular/core';
import { NavController, Events, NavParams, ViewController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@Component({
    selector: 'page-session-detail',
    templateUrl: 'session.detail.html'
})
export class SessionDetailPage {
    private session: Object;

    constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public events: Events,
      public params: NavParams,
      public viewCtrl: ViewController) { }

    ngOnInit() {
      this.session = this.params.get('session');
      console.log(this.session);
    }

    addQuestion() {

    }

    delete() {
      
    }

    dismiss() {
      this.viewCtrl.dismiss();
    }
}
