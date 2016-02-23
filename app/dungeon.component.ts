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
import DungeonUtils from './dungeon-utils'

import { FightComponent } from './fight.component';


@Component({
  selector: 'my-dungeon-component',
  templateUrl : 'app/dungeon.component.html',
  directives: [NgClass, FightComponent],
  styleUrls: ['app/dungeon.component.css']
})

export class DungeonComponent implements OnInit {
    heroes: Hero[] = [];
    dungeons: Dungeon[] = [];
    activeMonster:Creature;
    monsters: Creature[] = [];
    fightCommentarys: Hit[] = [];
    fightResult: FightResult;
    selectedHero:Hero;
    selectedDungeon:Dungeon;
    
    fightEngine:FightEngine;
    @ViewChild(FightComponent) fightComponent:FightComponent;
    
    heroUnselected:boolean = false;
    dungeonUnselected:boolean = false;
    enterDungeonError:boolean = false;
    selectedHeroIsDead:boolean = false;
    
    activeMonsterIsDead:boolean = false;
    
    // Change this later:
    fightStarted:boolean  = false;
    
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
    
    setDungeon(id:number){
        this.selectedDungeon = DungeonUtils.getById(this.dungeons,id);
    }
    
    startDungeon():void{
        this.heroUnselected = (this.selectedHero == null);
        this.selectedHeroIsDead = CreatureUtils.isDead(this.selectedHero);
        this.dungeonUnselected = (this.selectedDungeon == null);
        
        this.enterDungeonError = (this.heroUnselected || this.selectedHeroIsDead || this.dungeonUnselected);
        
        if(!this.enterDungeonError){
            this.dungeonStarted = true;
            
            // TODO: add stepper (decision to keep fighting, queue next monster)
            // TODO: Create new monster copy. Currently a pointer to a monster.
            this.activeMonster = DungeonUtils.getMonster(this.selectedDungeon, this.monsters);
            this.fightStarted = true;
            this.fightResult = this.fightComponent.startFight(this.selectedHero, this.activeMonster);
            
            this.resolveFightResults();
        }
    }
    
    resolveFightResults() {

        this.selectedHeroIsDead = CreatureUtils.isDead(this.selectedHero);
        this.activeMonsterIsDead = CreatureUtils.isDead(this.activeMonster);

        // TODO: Implement experience gain -- probably put this in FightEngine
    }
}