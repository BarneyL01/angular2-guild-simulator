import { Component, OnInit, ViewChild} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgClass} from 'angular2/common';

import { Hero } from './hero';
import { Creature } from './creature';
import { Dungeon } from './dungeon';
import { HeroService } from './hero.service';
import { DungeonService } from './dungeon.service';
import { MonsterService } from './monster.service';
import { Hit } from './hit';
import { FightEngine } from './fight-engine';
import {FightResult} from './fight-result';
import HeroUtils from './hero-utils';
import CreatureUtils from './creature-utils'

@Component({
  selector: 'my-dungeon-component',
  templateUrl : 'app/dungeon.component.html',
  directives: [NgClass],
  styleUrls: ['app/dungeon.component.css']
})

export class DungeonComponent implements OnInit {
    heroes: Hero[] = [];
    dungeons: Dungeon[] = [];
    monsters: Creature[] = [];
    fightCommentarys: Hit[] = [];
    fightResult: FightResult;
    selectedHero:Hero;
    
    heroUnselected:boolean = false;
    enterDungeonError:boolean = false;
    selectedHeroIsDead:boolean = false;
    
    // @ViewChild(Selection) selectHero:Selection;
    dungeonStarted:boolean = false;
    
    constructor(
        private _router: Router,
        private _heroService: HeroService,
        private _dungeonService: DungeonService,
        private _monsterService: MonsterService) {
    }
    
    ngOnInit() {
        this._heroService.getHeroes()
            .then(heroes => {
                this.heroes = heroes;
            });
            
        this._dungeonService.getDungeons().then(dungeons => this.dungeons = dungeons);
        this._monsterService.getMonsters().then(monsters => this.monsters = monsters);
                
         
    }
    
    setHero(id:number){
        this.selectedHero = HeroUtils.getById(this.heroes,id);
    }
    
    startDungeon():void{
        this.heroUnselected = (this.selectedHero == null);
        this.selectedHeroIsDead = CreatureUtils.isDead(this.selectedHero);
        
        this.enterDungeonError = (this.heroUnselected || this.selectedHeroIsDead);
        
        if(!this.enterDungeonError){
            this.dungeonStarted = true;
        }
    }
}