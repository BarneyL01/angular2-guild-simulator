import { Component, OnInit, ViewChild } from 'angular2/core';
import { Router } from 'angular2/router';
import { NgClass } from 'angular2/common';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Hit } from './hit';
import { FightEngine } from './fight-engine';
import { FightComponent } from './fight.component';
import { FightResult } from './fight-result';
import HeroUtils from './hero-utils';
import CreatureUtils from './creature-utils'

@Component({
  selector: 'my-duel',
  templateUrl : 'app/duel.component.html',
  directives: [NgClass,FightComponent],
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
    
    isHero1:boolean = true;
    
    fightEngine:FightEngine;
    
    @ViewChild(FightComponent) fightComponent:FightComponent;
    
    constructor(
        private _router: Router,
        private _heroService: HeroService) {
            
    }

    ngOnInit() {
        
         this._heroService.getHeroes()
            .then(heroes => {
                this.heroes = heroes;
                this.heroesByrank = HeroUtils.heroListByRank(this.heroes);
            });
        
            
         
    }
    
/*    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this._router.navigate(link);
    }*/
    
    
    /*
        Need to get by id because doesn't bind by object.
    */
    setHero(whichHero:number, id:number){
        if (whichHero == 1) {
            this.selectedHero1 = HeroUtils.getById(this.heroes,id);
        } else {
            this.selectedHero2 = HeroUtils.getById(this.heroes,id);
        }
        this.fightStarted = false;
        this.duelError=false;
    }
    
    startFight(){
        this.heroUnselected = (this.selectedHero1 == null || this.selectedHero2 == null);
        this.sameHeroSelected = HeroUtils.isSameHero(this.selectedHero1, this.selectedHero2);
        this.selectedHero1IsDead = CreatureUtils.isDead(this.selectedHero1);
        this.selectedHero2IsDead = CreatureUtils.isDead(this.selectedHero2);
        
        
        // check for selection, then start fight.
        if (this.heroUnselected || this.sameHeroSelected ||
            this.selectedHero1IsDead || this.selectedHero2IsDead) 
        {
                
            this.duelError = true;
            this.fightStarted = false;
            this.fightComponent.resetFights();
        } else {
            this.duelError = false;
            this.fightStarted = true;
            this.fightComponent.setFightType("Duel");
            
            this.fightResult = this.fightComponent.startFight(this.selectedHero1, this.selectedHero2);
            
            this.resolveFightResults();
        }


    }

    resolveFightResults() {
        

        this.selectedHero1IsDead = CreatureUtils.isDead(this.selectedHero1);
        this.selectedHero2IsDead = CreatureUtils.isDead(this.selectedHero2);

        // console.log('type', typeof this.fightResult.winner)
        if (!this.fightResult.resultTie) {
            // Update wins/losses
            HeroUtils.updateDuel(this.heroes, this.fightResult.winner.id, true);
            HeroUtils.updateDuel(this.heroes, this.fightResult.loser.id, false);
        } else {
            // In a tie, both lose.
            HeroUtils.updateDuel(this.heroes, this.fightResult.winner.id, false);
            HeroUtils.updateDuel(this.heroes, this.fightResult.loser.id, false);
        }

        HeroUtils.updateRank(this.heroes);
        this.heroesByrank = HeroUtils.heroListByRank(this.heroes);
    }

    resetHp(){
        
        HeroUtils.resetAllHp(this.heroes);
    }
}
