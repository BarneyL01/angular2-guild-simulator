import { Creature } from './creature';
import { Hit } from './hit';

export interface FightResult{
    winner:Creature;
    loser:Creature;
    experienceGained:number;
    resultTie:boolean;
    fightCommentary:Hit[];
    heroFled:boolean;
}