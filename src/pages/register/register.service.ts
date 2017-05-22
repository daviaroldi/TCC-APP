import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseService } from '../../services/base.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService extends BaseService {
    /**
     * Método para buscar os contadores
     */
    register(params){
        let result = this.post(environment.urlStudents, params);

        return result;
    }
}
