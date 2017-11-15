import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SessionService } from '../../../professorHome/session/session.service';

@Injectable()
export class SessionConnectService extends SessionService {
    /**
     * Método para conectar a sessão
     */
    connect(params, token) {
        return this.post(environment.urlSessionConnect, params, token);
    }
}
