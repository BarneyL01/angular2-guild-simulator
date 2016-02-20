import {Hero} from './hero';
import {HeroContainer} from './hero-container';
import {HEROES} from './mock-heroes';
import {Injectable} from 'angular2/core';

@Injectable()
export class HeroService {
    heroContainer:HeroContainer;
    
  getHeroes():Promise<HeroContainer> {
    return Promise.resolve(HEROES).then(
            heroes => this.heroContainer = new HeroContainer(heroes)
        );
  }
  
/*  // See the "Take it slow" appendix
  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }*/
  
/*    getHero(id: number) {
        return Promise.resolve(HEROES).then(
            heroes => heroes.filter(hero => hero.id === id)[0]
        );
    }*/
    
    getHero(id: number) {
        return Promise.resolve(HEROES).then(
            heroes => {
                this.heroContainer = new HeroContainer(heroes);
                return this.heroContainer.heroes.filter(hero => hero.id === id)[0];
            }
        );
    }

}
