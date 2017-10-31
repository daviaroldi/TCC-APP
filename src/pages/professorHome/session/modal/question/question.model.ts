import { Injectable } from '@angular/core';
import { QuestionType } from './question.interface';

@Injectable()
export class Question implements QuestionType {
  public id: string;
  public description: string;
  public type: number;
  public options: any;
  public session: any;

  constructor(id, description, type, session) {
    this.id = id;
    this.description = description;
    this.type = type;
    this.session = session;
    this.options = [];
  }
}
