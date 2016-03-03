import { Component, OnInit, ViewChild} from 'angular2/core';
import { Router } from 'angular2/router';
import {NgClass} from 'angular2/common';


import { Guild } from './guild';
import { Hero } from './hero';
import { Creature } from './creature';
import { Dungeon } from './dungeon';
import { HeroService } from './hero.service';
import { DungeonService } from './dungeon.service';
import { MonsterService } from './monster.service';
import { GuildService } from './guild.service';
import { Hit } from './hit';
import { FightEngine } from './fight-engine';
import {FightResult} from './fight-result';
import {StringValuePair} from './string-value-pair';
import HeroUtils from './hero-utils';
import CreatureUtils from './creature-utils'
import DungeonUtils from './dungeon-utils'

import {HeroRule} from './hero-rule';

import { FightComponent } from './fight.component';


@Component({
  selector: 'my-dungeon-component',
  templateUrl : 'templates/dungeon.component.html',
  directives: [NgClass, FightComponent],
  styleUrls: ['styles/dungeon.component.css']
})

export class DungeonComponent implements OnInit {
    guild: Guild;
    heroes: Hero[];
    dungeons: Dungeon[] = [];
    activeMonster:Creature;
    monsters: Creature[] = [];
    dungeonMonsters:Creature[];
    fightCommentarys: Hit[] = [];
    fightResult: FightResult;
    selectedHero:Hero;
    selectedDungeon:Dungeon;
    heroRules:HeroRule[];
    
    monstersFought: StringValuePair<number>[] = [];
    
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
    
    goldGained:number = 0;
    
    constructor(
        private _router: Router,
        private _guildService: GuildService,
        private _dungeonService: DungeonService,
        private _monsterService: MonsterService,
        private _heroService:HeroService) {
    }
    
    ngOnInit() {
        this._guildService.getGuild()
        .then(
            guild => {
                console.log('getGuild() succeeded');
                this.guild = guild;
                this._heroService.getAllHeroesById(this.guild.heroIds).then(
                    heroes => this.heroes = heroes
                );
            });
            
        this._dungeonService.getDungeons().then(dungeons => this.dungeons = dungeons);
        this._monsterService.getMonsters().then(monsters => this.monsters = monsters);
                
        //  console.log('monstersFought.length', this.monstersFought.length);
    }
    
    setHero(id:number){
        this.selectedHero = HeroUtils.getById(this.heroes,id);
    }
    
    setDungeon(id:number){
        this.selectedDungeon = DungeonUtils.getById(this.dungeons,id);
        this.dungeonMonsters = DungeonUtils.getMonsterList(this.selectedDungeon, this.monsters);
    }
    
    startDungeon():void{
        
        
        this.enterDungeonError = this.checkErrors();
        
        if(!this.enterDungeonError){
            this.dungeonStarted = true; // disables selectors
            var dungeonLength = DungeonUtils.generateDungeonLength(this.selectedDungeon);
            // console.log('dungeonLength: ', dungeonLength);
            
            
            
            // this.activeMonster = DungeonUtils.spawnMonster(this.selectedDungeon, this.monsters);
            
            // this.fightResult = this.fightComponent.startFight(this.selectedHero, this.activeMonster, false);
            this.fightComponent.setHeroRules(this.buildHeroRules());
            
            for(var i = 0; i < dungeonLength; i++)
            {
                    this.fightResult = this.fightMonster();
                    if(this.fightResult.heroFled == true){
                        break;
                    } else {
                        // defeated monster TODO: this should probably check if they actually did.
                        this.goldGained += this.monstersFought.length > 0 ? 
                                            this.monstersFought[this.monstersFought.length-1].value
                                            : 0;
                    }
            }
            
            this.resolveDungeonMission();
                       
        }
    }
    
    /**
     * At the moment this is a STUB.
     * TODO: Need to collect rules from Guild + Hero. 
    */
    buildHeroRules():HeroRule[]{
        
        this.heroRules = [];
        
        var heroRule1:HeroRule = {
            type:"HP",
            threshold:10,
            thresholdTypePercentage:true
        };
        
        this.heroRules.push(heroRule1);
        
        var heroRule2:HeroRule = {
            type:"HP",
            threshold:2,
            thresholdTypePercentage:false
        };

        
        this.heroRules.push(heroRule2);

        return this.heroRules;
    }
    
    checkErrors():boolean{
        this.heroUnselected = (this.selectedHero == null);
        this.selectedHeroIsDead = CreatureUtils.isDead(this.selectedHero);
        this.dungeonUnselected = (this.selectedDungeon == null);
        
        return (this.heroUnselected || this.selectedHeroIsDead || this.dungeonUnselected);
    }
    
    private fightMonster():FightResult{
        // This probably should already have been checked earlier:
        if(this.checkErrors()) return;
        var newMonster:Creature = DungeonUtils.spawnMonster(this.selectedDungeon, this.monsters);
        this.monstersFought.push({string:newMonster.name, value:DungeonUtils.calculateMonsterGold(this.selectedDungeon)});
            
        return this.fightComponent.startFight(this.selectedHero, newMonster);
    }
    
    private resolveDungeonMission():void{
        this.selectedHeroIsDead = CreatureUtils.isDead(this.selectedHero); 
        
        if(!this.selectedHeroIsDead){
            this.guild.gold += this.goldGained;
        }
        
    }
    
}