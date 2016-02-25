import { Hero } from './hero';

export interface Guild{
    id:number;
    name:string;
    heroes:Hero[];
    gold:number;
}