import {BasicModel} from './basicModel';
import {Configuration} from './configuration';

export interface BasicModelWithIDInt extends BasicModel {

  id?: number;
  configuration?: Configuration;

}
