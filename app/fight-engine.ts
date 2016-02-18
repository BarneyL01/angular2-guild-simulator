import { Hero } from './hero';
// import { HeroService } from './hero.service';
import { Hit } from './hit';

export class FightEngine {
    hero1:Hero;
    hero2:Hero;
    
    constructor(inHero1:Hero, inHero2:Hero){
        this.hero1 = inHero1;
        this.hero2 = inHero2;
        
    }
}