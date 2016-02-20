import { Creature } from './creature';
export interface Hero extends Creature{
    experience:number;
    duelWins?:number;
    duelLosses?:number;
    rank?:number;
}
