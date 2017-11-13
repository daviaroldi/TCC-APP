import {Injectable, Pipe} from 'angular2/core';
import * as _ from 'lodash';

@Pipe({ name: 'order-by' })
export class OrderByPipe {
  transform(array, args) {
    return _.sortBy(array, args);
  }
}
