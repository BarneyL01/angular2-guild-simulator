import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Hit } from './hit';
import { FightEngine } from './fight-engine';
import {HeroContainer} from './hero-container';

@Component({
  selector: 'my-duel',
  templateUrl : 'app/duel.component.html',
  directives: [] 
  //,
  //styleUrls: ['app/fight.component.css']
})

export class DuelComponent implements OnInit {
    heroes: HeroContainer;
    fightResults: Hit[] = [];
    fightError:boolean = false;
    fightStarted:boolean = false;
    
    selectedHero1:Hero;
    selectedHero2:Hero;
    
    fightEngine:FightEngine;
    
    constructor(
        private _router: Router,
        private _heroService: HeroService) {
    }

    ngOnInit() {
         this._heroService.getHeroes().then(heroes => this.heroes = heroes);
         
    }
    
/*    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this._router.navigate(link);
    }*/
    
    addHit(hit:Hit){
        this.fightResults.push(hit);
    }
    
    hitStub():Hit{
        return {attacker:'John', 
                defender:'Bob', 
                hitConnected:true, 
                damage:2, 
                remainingHp:5 };
    }
    
    /*
        Need this function because selector doesn't seem to bind properly.
    */
    
    setHero1(id:number){
        // console.log('heroId', id);
        this.selectedHero1 = this.heroes.getHeroById(id);
        //   console.log('selectedHero1', this.selectedHero1.name);
    }
    setHero2(id:number){
        this.selectedHero2 = this.heroes.getHeroById(id);
    }
    
    startFight(){
        if(this.selectedHero1 == null || this.selectedHero2 == null)
        {
            this.fightError=true;
        }else{
            this.fightError=false;
            this.fightStarted = true;
            
            this.fightEngine = new FightEngine(this.selectedHero1, this.selectedHero2);
            this.fightResults = this.fightEngine.fight();
        }
        
    }
    
    
}
