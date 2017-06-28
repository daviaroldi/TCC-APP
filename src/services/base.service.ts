import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { environment } from '../environments/environment';
import { Storage } from "@ionic/storage";
import {Observable} from 'rxjs/Observable';

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

    createAuthorizarionHeader() {
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

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        });
        // let options = this.getOptions();
        if (token != null) {
          headers.append('Authorization', 'Token ' + token);
        }
        let options = {
            withCredentials: true,
            headers : headers
        };
        // return Observable.fromPromise(headers).switchMap((headers) => this.http.post(environment.urlBase + endpoint, body, { headers: headers }));
        // return this.http.post(environment.urlBase + endpoint, body,
        //   options).map(
        //   response => response.json());
        return new Promise(resolve => {
            this.http.post(environment.urlBase + endpoint, body, options)
                .map(response => {
                        return response.json();
                }).subscribe((data) => {
                        // this.data = data;
                        resolve(data)
                    },
                    (err) => {
                        if (err.status == 400) {
                            let body = err._body;
                            body = JSON.parse(body);
                            for (var i in body) {
                                this.notifyError(body[i]);
                            }
                        } else {
                            this.notifyError('Erro ao cadastrar! Verfique os campos preenchidos!');
                        }
                    }
                );

        });
    }

    getOptions() {
        let options = new RequestOptions({
            withCredentials: true,
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
