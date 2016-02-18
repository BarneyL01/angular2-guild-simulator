import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Hit } from './hit';
import { FightEngine } from './fight-engine';

@Component({
  selector: 'my-fight',
  templateUrl : 'app/fight.component.html'
  //,
  //styleUrls: ['app/fight.component.css']
})

export class FightComponent implements OnInit {
    heroes: Hero[] = [];
    fightResults: Hit[] = [];
    
    
    constructor(
        private _router: Router,
        private _heroService: HeroService) {
    }

    ngOnInit() {
         this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    
    startFight()
    {
        
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
}
