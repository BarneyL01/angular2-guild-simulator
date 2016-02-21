import {Creature} from './creature';
import {IdValuePair} from './id-value-pair';

export interface Dungeon {
  id: number;
  name: string;
  monsterArray:IdValuePair<number>[];
  
}
