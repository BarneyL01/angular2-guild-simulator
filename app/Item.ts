import {StringValuePair} from './string-value-pair';

export interface Item {
  id: number;
  name: string;
  type: string;
  effects:  StringValuePair<number>[];
  // e.g. {weaponAttackAccuracy,2} would mean increase that stat by 2 
}