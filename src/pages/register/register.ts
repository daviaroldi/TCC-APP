import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { RegisterService } from './register.service';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
    providers: [ RegisterService ]
})
export class RegisterPage {
    private user: Object = {
        username: '',
        password: '',
        email: '',
        first_name: '',
        last_name: ''
    };

    constructor(public navCtrl: NavController, public service: RegisterService, public loadingCtrl: LoadingController) {
    }

    backToLogin() {
        this.navCtrl.pop();
    }

    register(user) {
        let result = this.service.register(user);

        // if (result.username)
        this.notifySucess();
    }

    private notifySucess() {
        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Usuário Cadastrado com Sucesso',
            duration: 3000
        });

        loading.onDidDismiss(() => {
            this.navCtrl.pop();
        });

        loading.present();
    }
}
