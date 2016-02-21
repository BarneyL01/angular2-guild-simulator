import { Creature } from './creature';

export interface Hit {
  attacker:Creature;
  defender:Creature;
  hitConnected:boolean;
  damage?:number;
  remainingHp?:number;
}
