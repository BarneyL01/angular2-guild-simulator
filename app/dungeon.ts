import {Creature} from './creature';
import {StringValuePair} from './string-value-pair';

export interface Dungeon {
  id: string;
  name: string;
  
/*   {monsterId, weight} value pairs. 
    -- weight being number/chance of occuring in the dungeon, i.e. 
    -- [{monster1, 2}, {monster2, 1}] -- monster1 should appear twice as much as monster2*/
  monsterArray:StringValuePair<number>[];
  minDungeonLength:number;
  maxDungeonLength:number;
  creatureGoldMin:number;
  creatureGoldMax:number;
}
