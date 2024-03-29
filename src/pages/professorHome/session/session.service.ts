import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../../../services/base.service';

@Injectable()
export class SessionService extends BaseService {
    /**
     * Método para buscar os contadores
     */
    getSessions(params, token){
        return this.get(environment.urlSessions, params, token);
    }

    create(params, token) {
        return this.post(environment.urlSessions, params, token);
    }

    getSession(id, token) {
        return this.get(environment.urlSessions + id + '/', {}, token);
    }

    deleteQuestion(params, token) {
        return this.delete(environment.urlQuestions, params, token);
    }

    answerQuestion(params, token) {
        return this.post(environment.urlAnswers, params, token);
    }

    getAnswers(params, token) {
        return this.get(environment.urlAnswers, params, token);
    }
}
