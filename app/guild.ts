import { Hero } from './hero';

export interface Guild{
    id:string;
    name:string;
    heroIds:string[];
    gold:number;
}