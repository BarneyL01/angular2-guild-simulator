import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Hit } from './hit';
import { FightEngine } from './fight-engine';
import {FightResult} from './fight-result';
import HeroUtils from './hero-utils';
import CreatureUtils from './creature-utils'

@Component({
  selector: 'my-duel',
  templateUrl : 'app/duel.component.html',
  directives: [],
  styleUrls: ['app/duel.component.css']
})

export class DuelComponent implements OnInit {
    heroes: Hero[] = [];
    heroesByrank: Hero[] = [];
    fightCommentarys: Hit[] = [];
    fightResult: FightResult;
    
    heroUnselected:boolean = false;
    sameHeroSelected:boolean = false;
    duelError:boolean = false;
    selectedHero1IsDead:boolean = false;
    selectedHero2IsDead:boolean = false;
    
    fightStarted:boolean = false;
    
    selectedHero1:Hero;
    selectedHero2:Hero;
    
    fightEngine:FightEngine;
    
    constructor(
        private _router: Router,
        private _heroService: HeroService) {
    }

    ngOnInit() {
         this._heroService.getHeroes()
            .then(heroes => {
                this.heroes = heroes;
                this.heroesByrank = HeroUtils.heroListByRank(this.heroes);
            })
                
         
    }
    
/*    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this._router.navigate(link);
    }*/
    
    addHit(hit:Hit){
        this.fightCommentarys.push(hit);
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
        this.selectedHero1 = HeroUtils.getById(this.heroes,id);
        this.fightStarted = false;
        this.duelError=false;
        //   console.log('selectedHero1', this.selectedHero1.name);
    }
    
    setHero2(id:number){
        this.selectedHero2 = HeroUtils.getById(this.heroes,id);
        this.fightStarted = false;
        this.duelError=false;
    }
    
    startFight(){
        this.heroUnselected = (this.selectedHero1 == null || this.selectedHero2 == null);
        this.sameHeroSelected = HeroUtils.isSameHero(this.selectedHero1, this.selectedHero2);
        this.selectedHero1IsDead = CreatureUtils.isDead(this.selectedHero1);
        this.selectedHero2IsDead = CreatureUtils.isDead(this.selectedHero2);
        
        
        // check for selection, then start fight.
        if(this.heroUnselected || this.sameHeroSelected ||
           this.selectedHero1IsDead ||  this.selectedHero2IsDead)
        {
            this.duelError=true;
            this.fightStarted = false;
        }else{
            this.duelError=false;
            this.fightStarted = true;
            // clear existing fight commentary: 
            this.fightCommentarys = [];
            
            this.fightEngine = new FightEngine(this.selectedHero1, this.selectedHero2, this.fightCommentarys);
            // this.fightCommentarys = this.fightEngine.fight(); 
            
            this.resolveFightResults();
        }
        
        
    }
    
    resolveFightResults(){
        this.fightResult = this.fightEngine.fight();
            
        this.selectedHero1IsDead = CreatureUtils.isDead(this.selectedHero1);
        this.selectedHero2IsDead = CreatureUtils.isDead(this.selectedHero2);
        
        console.log('type', typeof this.fightResult.winner)
        if(!this.fightResult.resultTie){
            // Update wins/losses
            HeroUtils.updateDuel(this.heroes, this.fightResult.winner.id, true);
            HeroUtils.updateDuel(this.heroes, this.fightResult.loser.id, false);
        }else{
            // In a tie, both lose.
            HeroUtils.updateDuel(this.heroes, this.fightResult.winner.id, false);
            HeroUtils.updateDuel(this.heroes, this.fightResult.loser.id, false);
        }
        
        HeroUtils.updateRank(this.heroes);
        this.heroesByrank = HeroUtils.heroListByRank(this.heroes);
    }
    
    
}
