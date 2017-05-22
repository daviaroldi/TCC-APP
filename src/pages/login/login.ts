import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginService } from './login.service';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ LoginService ]
})
export class LoginPage {
	private user: Object = {
	    username: '',
        password: ''
    };

	private imgWidth: number = 128;
	private imgHeight: number = 128;

	constructor(public navCtrl: NavController, public service: LoginService) {
	}

	login(user) {
		this.service.login(user);
	}

	register(user) {
		this.navCtrl.push(RegisterPage);
	}
}
