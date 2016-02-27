import { Hero } from './hero';

export interface Guild{
    id:number;
    name:string;
    heroIds:number[];
    gold:number;
}