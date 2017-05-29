import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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

    constructor(public navCtrl: NavController, public service: RegisterService, public alertCtrl: AlertController) {
    }

    backToLogin() {
        this.navCtrl.pop();
    }

    register() {
        this.service.register(this.user).then(data => {
            if (data.hasOwnProperty('id')) {
                this.user = data;
                this.notifySucess();
            }
        });
    }

    private notifySucess() {
        let alert = this.alertCtrl.create({
            title: 'Sucesso',
            subTitle: 'Usuário Cadastrado com Sucesso',
            buttons: [
                {
                    text: 'OK',
                    handler: () => {
                        this.navCtrl.pop();
                    }
                }
            ]
        });

        alert.present();
    }

    // private notifySucess() {
    //     let loading = this.alertCtrl.create({
    //         spinner: 'hide',
    //         content: 'Usuário Cadastrado com Sucesso',
    //         duration: 3000
    //     });
    //
    //     loading.onDidDismiss(() => {
    //         this.navCtrl.pop();
    //     });
    //
    //     loading.present();
    // }
    //
    // private notifyError(msg) {
    //     let loading = this.loadingCtrl.create({
    //         spinner: 'hide',
    //         content: msg,
    //         duration: 3000
    //     });
    //
    //     loading.present();
    // }
}
