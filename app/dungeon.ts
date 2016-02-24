import {Creature} from './creature';
import {IdValuePair} from './id-value-pair';

export interface Dungeon {
  id: number;
  name: string;
  
/*   {monsterId, weight} value pairs. 
    -- weight being number/chance of occuring in the dungeon, i.e. 
    -- [{monster1, 2}, {monster2, 1}] -- monster1 should appear twice as much as monster2*/
  monsterArray:IdValuePair<number>[];
  minDungeonLength:number;
  maxDungeonLength:number;
  creatureGoldMin:number;
  creatureGoldMax:number;
}
