import { Component, OnInit } from 'angular2/core';
import {RouteParams} from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import GeneralUtils from './general-utils';
import CreatureUtils from './creature-utils';
import HeroUtils from './hero-utils';


@Component({
    selector: 'hero-detail',
    templateUrl: 'app/templates/hero-detail.component.html',
    styleUrls: ['app/styles/hero-detail.component.css'],
    inputs: ['hero']
})

export class HeroDetailComponent {
    hero: Hero;
    showBack:boolean=true;
    
    constructor(
        private _heroService: HeroService,
        private _routeParams: RouteParams) {
    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._heroService.getHero(id)
        .then(hero => this.hero = hero);
    }

    goBack() {
        window.history.back();
    }

    setHero(hero:Hero){
        this.hero = hero;
    }
    
    setShowBack(show:boolean){
        this.showBack = show;
    }
    
    getHeroStrModifier():number{
        return GeneralUtils.processModifier(this.hero.strength);
    }
    
    getHeroDexModifier():number{
        return GeneralUtils.processModifier(this.hero.dexterity);
    }
    
    getHeroDodge():number{
        return CreatureUtils.calculateDodge(this.hero)*100;
    }
    
    getHeroTotalAttackAccuracy():number{
        return this.hero.weaponAttackAccuracy + this.getHeroStrModifier();
    }
    
    getHeroTotalDamageModifier():number{
        return this.hero.damageModifier + this.getHeroDexModifier();
    }
    
    getHeroXPThreshold(hero:Hero):number{
        return HeroUtils.getExperienceThreshold(hero);
    }
}
