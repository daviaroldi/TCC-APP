import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { ProfessorHomePage } from '../pages/professorHome/professorHome';
import { LoginPage } from '../pages/login/login';
import { BaseService } from '../services/base.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public storage: Storage, public events: Events) {
    this.initializeApp();
    this.events.subscribe('pages', (pages) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.pages = pages;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title == 'Logout') {
      this.pages = [];
      this.storage.clear();
    }
    this.nav.setRoot(page.component);
  }
}
