import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { environment } from '../environments/environment';
import { Storage } from "@ionic/storage";

import 'rxjs/Rx';

@Injectable()
export class BaseService {

    private headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    });

    /**
    * Método construtor
    * @param http: Http
    */
    constructor(
        public http: Http,
        public alertCtrl: AlertController,
        public storage: Storage
    ) {}

    createAuthorizarionHeader(header: Headers) {
        this.storage.get('token').then((val) => {
            this.headers.append('Authorization', val);
        });
    }

    /**
     * Método para buscar os contadores
     */
    get(endpoint, params, token){
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Token ' + token
        });

        let options = {
            withCredentials: true,
            search: this.montaQueryParams(params),
            headers : headers
        };

        return this.http.get(environment.urlBase + endpoint, options)
            .toPromise()
            .then(response => {
                return response.json();
            }).catch((error) => (error));
    }

    post(endpoint: string, params: any, token: any = null) {
        let body = JSON.stringify(params);

        let options = this.getOptions();
        if (token != null) {
          let headers = new Headers({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Access-Control-Allow-Headers': 'Authorization',
              'Authorization': 'Token ' + token
          });
          let options = new RequestOptions({
              withCredentials: true,
              headers : headers
          });
          console.log(options);
        }


        return this.http.post(environment.urlBase + endpoint, body, options)
                .toPromise()
                .then(response => {
                    return response.json();
                }).catch((err) => {
                this.notifyError('Erro!');
            });
    }

    getOptions() {
        let options = new RequestOptions({
            // withCredentials: true,
        //     search: this.montaQueryParams(params),
            headers : this.headers
        });

        return options;
    }

    notifyError(msg) {
        let alert = this.alertCtrl.create({
            title: 'Erro',
            subTitle: msg,
            buttons: ['OK']
        });

        alert.present();
    }

    montaQueryParams(params) {
        let parameters = new URLSearchParams();
        for (let key in params) {
            parameters.set(key, params[key]);
        }

        return parameters
    }
}
