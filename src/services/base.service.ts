import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { environment } from '../environments/environment';

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
        private http: Http
    ) {}

    /**
     * Método para buscar os contadores
     */
    get(endpoint, params){
        let options = {
            withCredentials: true,
        //     search: this.montaQueryParams(params),
            headers : this.headers
        };

        return this.http.get(environment.urlBase + endpoint, options)
            .toPromise()
            .then(response => {
                return response.json();
            }).catch((error) => console.log(error));
    }

    post(endpoint: string, params: any) {
        let body = JSON.stringify(params);
        // let body = new FormData();
        // body.append('username', params.username);
        // body.append('password', params.password);

        return this.http.post(environment.urlBase + endpoint, body, this.getOptions())
            .map(response => {
                return response.json();
            }).subscribe((err) => console.log(err));
    }

    getOptions() {
        let options = new RequestOptions({
            // withCredentials: true,
        //     search: this.montaQueryParams(params),
            headers : this.headers
        });

        return options;
    }
}
