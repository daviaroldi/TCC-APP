import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseService } from '../../services/base.service';

@Injectable()
export class LoginService extends BaseService {
    /**
     * Método para buscar os contadores
     */
    login(params){
        let result = this.post(environment.urlLogin, params);

    }
}
