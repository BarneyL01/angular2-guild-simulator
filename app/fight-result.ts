import { Creature } from './creature';

export interface FightResult{
    winner:Creature;
    loser:Creature;
    experienceGained:number;
    resultTie:boolean;
}