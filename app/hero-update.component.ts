import { Component, OnInit } from 'angular2/core';
// import {RouteParams} from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import GeneralUtils from './general-utils';
import CreatureUtils from './creature-utils';
import HeroUtils from './hero-utils';


@Component({
    selector: 'hero-update',
    templateUrl: 'app/templates/hero-update.component.html',
    styleUrls: ['app/styles/hero-update.component.css']
})

export class HeroUpdateComponent {
    hero: Hero;
    didHeroLevelUp:boolean=true;
    
    originalMaxHitPoints:number;
    originalStrength:number;
    originalDexterity:number;
    originalArmourClass:number;
    originalReflex:number;
    
    constructor(
        private _heroService: HeroService) {
    }

    ngOnInit() {
    }

    setHero(hero:Hero){
        this.hero = hero;
        this.checkAndUpdateHero();
    }
    
    reset(){
        this.hero = null;
        this.originalMaxHitPoints = 0;
        this.originalStrength = 0;
        this.originalDexterity = 0;
        this.originalArmourClass = 0;
        this.originalReflex = 0;
    }
    
    private checkAndUpdateHero(){
        if(this.hero == null) return;
        
        this.didHeroLevelUp = HeroUtils.willHeroLevelUp(this.hero);
        
        if(this.didHeroLevelUp){
            this.originalMaxHitPoints = this.hero.maxHitPoints;
            this.originalStrength = this.hero.strength;
            this.originalDexterity = this.hero.dexterity;
            this.originalArmourClass = this.hero.armourClass;
            this.originalReflex = this.hero.reflex;
        }
        
        HeroUtils.checkAndUpdateHero(this.hero);
    }

}
