import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BaseService } from '../../../../../services/base.service';

@Injectable()
export class QuestionService extends BaseService {
    /**
     * Método para buscar os contadores
     */
    // getSessions(params, token){
    //     return this.get(environment.urlSessions, params, token);
    // }

    create(params, token) {
        return this.post(environment.urlQuestions, params, token);
    }

    update(params, token) {
        return this.put(environment.urlQuestions, params, token);
    }
}
