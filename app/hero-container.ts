import {Hero} from './hero';

export class HeroContainer{
    heroes: Hero[] = [];
    constructor(heroList:Hero[]){
        for(let hero in heroList){
            this.heroes.push(hero);
        }
    }
    
    addHeroArray(heroList:Hero[]){
        for(let hero in heroList){
            this.heroes.push(hero);
        }
    }
    
    getHeroById(id:number){
        for(let hero of this.heroes){
            // console.log('hero ', hero.id, ':', hero.name);
            if(hero.id==id){
                return hero;
            }
        }
        return ;
    }
    
}