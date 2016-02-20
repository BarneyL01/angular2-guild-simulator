import { Creature } from './creature';
// import { HeroService } from './hero.service';
import { Hit } from './hit';

export class FightEngine {
    creature1:Creature;
    creature2:Creature;
    fightResult:Hit[] = [];
    
    accuracyDice:number = 6;
    strengthDice:number = 6;
    
    creature1NextHit:number;
    creature2NextHit:number;
    
    swingTimer:number;
    fightTimerMax:number = 500;
    
    constructor(creature1:Creature, creature2:Creature){
        this.creature1 = creature1;
        this.creature2 = creature2;
    }
    
    fight():Hit[]{
        this.swingTimer = 0;
        this.creature1NextHit = this.creature1.attackSpeed;
        this.creature2NextHit = this.creature2.attackSpeed;
        console.log('fight running, creature Death:', this.checkCreatureDeath());
         
        // Put max on swingTimer so that this doesn't go stupid while I haven't fully tested
        for(this.swingTimer = 0; 
            this.swingTimer < this.fightTimerMax && !this.checkCreatureDeath(); 
            this.swingTimer++){
                
            // console.log(this.swingTimer);
            if(this.creature1NextHit == this.swingTimer){
                this.fightResult.push(this.creatureAttack(this.creature1, this.creature2));
                this.creature1NextHit += this.creature1.attackSpeed;
            }
            
            if(this.creature2NextHit == this.swingTimer){
                this.fightResult.push(this.creatureAttack(this.creature2, this.creature1));
                this.creature2NextHit += this.creature2.attackSpeed;
            }
        }
        return this.fightResult;
    }
    
    checkCreatureDeath(){
        return (this.creature1.hitPoints <= 0 || this.creature2.hitPoints <= 0);
    }
    
    creatureAttack(attacker:Creature, defender:Creature):Hit{
        var damage:number;
        if(this.hitSucceed(attacker, defender)){
            damage = this.rollDice(this.strengthDice, attacker.strength);
            // update hp
            defender.hitPoints -= damage;
            
            return {attacker:attacker.name, 
                    defender: defender.name, 
                    hitConnected:true, 
                    damage:damage, 
                    remainingHp:defender.hitPoints };
        }else{
            return {attacker:attacker.name, 
                defender: defender.name, 
                hitConnected:false};
        }
    }
    
    updateHp(creature:Creature, damage:number){
        creature.hitPoints = Math.max(creature.hitPoints-damage, 0);
    }
    
    hitSucceed(attacker:Creature, defender:Creature):boolean{
        var attackRoll:number = this.rollDice(this.accuracyDice, attacker.dexterity);
        var defendRoll:number = this.rollDice(this.accuracyDice, defender.dexterity);
        // console.log('hitSucceed: ', attackRoll, ' against ', defendRoll);
        return (attackRoll > defendRoll);
    }
    
    rollDice(diceSides:number, modifier:number):number{
        return Math.floor((Math.random() * diceSides) + modifier);
    }
        
}