import { Creature } from './creature';
import { Hero } from './hero';
// import { HeroService } from './hero.service';
import { Hit } from './hit';
import CreatureUtils from './creature-utils';
import HeroUtils from './hero-utils';
import GeneralUtils from './general-utils';
import {FightResult} from './fight-result';
import {HeroRule} from './hero-rule';

export class FightEngine {
    creature1:Creature;
    creature2:Creature;
    // fightCommentary:Hit[];
    fightResult:FightResult;
    
    accuracyDice:number = 20;
    
    creature1NextHit:number;
    creature2NextHit:number;
    
    swingTimer:number;
    fightTimerMax:number = 500;
    
    // Assume Hero is creature 1.
    heroRules:HeroRule[];
    
    constructor(creature1:Creature, creature2:Creature){
        this.creature1 = creature1;
        this.creature2 = creature2;
    }
    
    setHeroRules(heroRules:HeroRule[]){
        this.heroRules = heroRules;
    }
    
    fight():FightResult{
        this.swingTimer = 0;
        this.creature1NextHit = this.creature1.attackSpeed;
        this.creature2NextHit = this.creature2.attackSpeed;
        // console.log('fight running, creature Death:', this.checkCreatureDeath());
        
        this.fightResult = {
                winner: null,
                loser: null,
                experienceGained:0, 
                resultTie: false,
                fightCommentary: [],
                heroFled: false
        };
        
        // Put max on swingTimer so that this doesn't go stupid while I haven't fully tested
        for(this.swingTimer = 0; 
            this.swingTimer < this.fightTimerMax 
                && !this.checkCreatureDeath()
                && !this.checkHeroFlee(); 
            this.swingTimer++){
                
            // console.log(this.swingTimer, ': checkHeroRules():', this.checkHeroRules());
            if(this.creature1NextHit == this.swingTimer){
                this.fightResult.fightCommentary.push(this.creatureAttack(this.creature1, this.creature2));
                this.creature1NextHit += this.creature1.attackSpeed;
            }
            
            if(this.creature2NextHit == this.swingTimer){
                this.fightResult.fightCommentary.push(this.creatureAttack(this.creature2, this.creature1));
                this.creature2NextHit += this.creature2.attackSpeed;
            }
            
            
        }
        
        if(this.checkHeroFlee()){
            // Hero Fled, no experience gained, technically hero lost.
            this.fightResult.winner = this.creature2;
            this.fightResult.loser = this.creature1;
            this.fightResult.heroFled = true;
        }else{
            // tie fight
            if(CreatureUtils.isDead(this.creature1) && 
                    CreatureUtils.isDead(this.creature2))
            {
                // arbitrarily still set winner & loser
                this.fightResult.winner = this.creature1;
                this.fightResult.loser = this.creature2;
                
                this.fightResult.resultTie = true;
            }else{
                    // Creature 1 died : Creature 2 won.
                if(CreatureUtils.isDead(this.creature1)){
                    this.fightResult.winner = this.creature2;
                    this.fightResult.loser = this.creature1;
                    this.fightResult.experienceGained = CreatureUtils.getExperienceIfKilled(this.creature1);                
                }else{
                    // creature 1 won.
                    this.fightResult.winner = this.creature1;
                    this.fightResult.loser = this.creature2;
                    this.fightResult.experienceGained = CreatureUtils.getExperienceIfKilled(this.creature2);
                }
                
                if(HeroUtils.isHero(this.fightResult.winner)){
                    HeroUtils.updateExperience(<Hero>this.fightResult.winner, this.fightResult.experienceGained);
                }
            }
        }
        
        
        
        
        return this.fightResult;
    }
    
    /**
     * Private functions
     */
    
    private checkCreatureDeath():boolean{
        return (CreatureUtils.isDead(this.creature1) || 
                CreatureUtils.isDead(this.creature2));
    }
    
    /** 
     * Check if there is any reason for hero to flee.
    */
    private checkHeroFlee():boolean{
        if(!HeroUtils.isHero(this.creature1)) return false;
        if(CreatureUtils.isDead(this.creature1)) return false; // dead hero can't flee!
        
        for(let rule of this.heroRules){
            if(HeroUtils.checkFlee(rule, <Hero>this.creature1, this.creature2)) return true;
        }
        
        return false;
    }
    
    private creatureAttack(attacker:Creature, defender:Creature):Hit{
        var damage:number;
        if(this.hitSucceed(attacker, defender)){
            damage = this.calculateDamage(attacker);
            // update hp
            defender.hitPoints -= damage;
            
            return {attacker:attacker, 
                    defender: defender, 
                    hitConnected:true, 
                    damage:damage, 
                    remainingHp:defender.hitPoints };
        }else{
            return {attacker:attacker, 
                defender: defender, 
                hitConnected:false};
        }
    }
    
    private updateHp(creature:Creature, damage:number){
        creature.hitPoints = Math.max(creature.hitPoints-damage, 0);
    }
    
    private hitSucceed(attacker:Creature, defender:Creature):boolean{
        if(this.calculateDodge(defender) ) return false;
        
        var attackRoll:number = GeneralUtils.rollDice(this.accuracyDice, 
                                                       (GeneralUtils.processModifier(attacker.dexterity)
                                                        + attacker.weaponAttackAccuracy));
        
        // console.log('hitSucceed: ', attackRoll, ' against ', defender.armourClass);
        return (attackRoll > defender.armourClass);
    }
    
    private calculateDamage(attacker:Creature):number{
        return GeneralUtils.rollDice(attacker.damageRoll, 
                                        (GeneralUtils.processModifier(attacker.strength)
                                        + attacker.damageModifier)
                                        );
    }
    
    private calculateDodge(defender:Creature):boolean{
        var chanceOfDodge = (defender.reflex -10)/1000;
        return chanceOfDodge > GeneralUtils.randomIntFromInterval(0,100);
    }
    
    
    
        
}