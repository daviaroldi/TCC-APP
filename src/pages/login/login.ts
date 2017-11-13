import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginService } from './login.service';
import { RegisterPage } from '../register/register';
import { Storage } from "@ionic/storage";
import { ProfessorHomePage } from "../professorHome/professorHome";
import { StudentHomePage } from "../studentHome/studentHome";
import { ProfessorListPage } from "../professorList/professorList";
import { HomePage } from "../home/home";
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

    private imgWidth: number = 221;
    private imgHeight: number = 172;

    constructor(public navCtrl: NavController, public service: LoginService, private storage: Storage) {
        let user = null;
        this.storage.get('user').then(value => {
            user = value;
        });
        if (user != null) {
            this.redirectToHome(user);
        }
    }

    login(user) {
        this.service.login(user).then(login => {
            if (login.hasOwnProperty('token')) {
                this.storage.set('token', login['token']);
            }

            this.service.userInfo(login['token']).then(data => {
                this.storage.set('user', data);

                this.redirectToHome(data);
            });
        });
    }

    register(user) {
        this.navCtrl.push(RegisterPage);
    }

    redirectToHome(user) {
        if (user.is_professor === true)
            this.navCtrl.setRoot(ProfessorHomePage);
        else if (user.is_professor === false)
            this.navCtrl.setRoot(StudentHomePage);
        else
            this.navCtrl.setRoot(LoginPage);
    }
}
