import { Creature } from './creature';
import { Item } from './item';
export interface Hero extends Creature{
    experience:number;
    duelWins?:number;
    duelLosses?:number;
    rank?:number;
    items?:Item[];
    /*fear:number;
    happiness:number;
    obviousTrait:number;
    hiddenTraits:number[];*/
}
