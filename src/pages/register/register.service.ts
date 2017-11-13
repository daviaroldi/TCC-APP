import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http'
import { AlertController } from 'ionic-angular';
import { BaseService } from '../../services/base.service';
import { Storage } from "@ionic/storage";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService extends BaseService {
    /**
     * Método para buscar os contadores
     */
    private data: any;

    constructor(
        public http: Http,
        public alertCtrl: AlertController,
        public storage: Storage
    ) {
        super(http, alertCtrl, storage);
    }

    register(params){
        let result = this.post(environment.urlStudents, params);

        return result;
    }

    post(endpoint: string, params: any) {
        let body = JSON.stringify(params);

        return new Promise(resolve => {
            this.http.post(environment.urlBase + endpoint, body, this.getOptions())
                .map(response => {
                        return response.json();
                }).subscribe((data) => {
                        this.data = data;
                        resolve(this.data)
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
}
