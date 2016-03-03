import { Hero } from './hero';
import { HeroRule } from './hero-rule';
import { Creature } from './creature';

/*
    Revealing Module Pattern, for singleton function processor
    https://www.christianheilmann.com/2007/08/22/again-with-the-module-pattern-reveal-something-to-the-world/
    
    Attempted to do the above, slight variation to below:
    
    http://www.sitepoint.com/understanding-es6-modules/
*/
var HeroUtils = {
    
    getById: function(heroes:Hero[], id:number):Hero{
        
        for(let hero of heroes){
            
            if(hero.id==id){
                return hero;
            }
        }
        return ;
    },
    
    isSameHero: function(hero1:Hero, hero2:Hero){
        if(hero1 == null || hero2 == null) return false;
        
        return (hero1.id == hero2.id);
    },
    
    updateDuel: function(heroes:Hero[], id:number, isWin:boolean){
        var hero:Hero = this.getById(heroes, id);
        if(hero.duelLosses == null) hero.duelLosses = 0;
        if(hero.duelWins == null) hero.duelWins = 0;  
                
        if(isWin){
            hero.duelWins++;  
        }else{
            hero.duelLosses++;
        }
        return;
    },
    
    updateRank: function(heroes:Hero[]):void{
        
        var heroRank:Hero[] = this.heroListByRank(heroes);
        
        var rank:number = 1;
        for(let hero of heroRank){
            hero.rank = rank;
            rank++;
        }
        
        // Free space, make sure heroRank array is empty 
        heroRank = [];
        return;
    },
    
    heroListByRank: function(heroes:Hero[]):Hero[]{
        // Create new array to not disturb existing array order.
        var heroRank:Hero[] = [];
        for(let hero of heroes){
            heroRank.push(hero);
        }
        
        heroRank.sort(this.duelSortFunction);
        
        return heroRank;
    },
    
    duelSortFunction: function(hero1:Hero, hero2:Hero):number{
        if((hero1.duelLosses == null || hero1.duelWins == null) &&
            (hero2.duelLosses == null || hero2.duelWins == null))
            {
                return 0;
            }else{
                // Assumes one is not null:
                if(hero1.duelLosses == null || hero1.duelWins == null) return 1;
                if(hero2.duelLosses == null || hero2.duelWins == null) return -1;
                
                if(hero1.duelWins > hero2.duelWins) return -1;
                
                if(hero1.duelWins < hero2.duelWins) return 1;
                
                if(hero1.duelWins == hero2.duelWins){
                    if(hero1.duelLosses > hero2.duelLosses) return 1;
                
                    if(hero1.duelLosses < hero2.duelLosses) return -1;
                }
            }
            
            return 0;
    },
    
    resetAllHp: function(heroes:Hero[]):void{
        for(let hero of heroes){
            hero.hitPoints = hero.maxHitPoints;
        }
        return;
    },
    
    isHero: function (creature:Creature):boolean{
        return (creature.type == "Hero");
    },
    
    updateExperience: function(hero:Hero, experienceGained:number):void{
        hero.experience += experienceGained;
    },
    
    isHeroOk: function (hero:Hero):boolean{
        // Eventually need to update for fear & hp rules.
        // Currently just checking if hero is above 10% hp.
        return (hero.hitPoints >= (hero.maxHitPoints/10));
    },
    
    checkFlee: function (rule:HeroRule, hero:Hero, monster:Creature):boolean{
        // console.log('checkFlee - rule:', rule.type);
        var check:boolean = false;
        switch(rule.type)
        {
            case 'HP':
                if(rule.thresholdTypePercentage){
                    check = (hero.hitPoints <= (hero.maxHitPoints/100*rule.threshold));
                }else{
                    check = (hero.hitPoints <= rule.threshold);
                }
                 break;
                
            case 'Fear':
                // Not implemented
                break;
            case 'Phobia':
                if(rule.monsterTypeMatch == null || monster.subtype == null){
                    check = false;
                }else{
                    check = (rule.monsterTypeMatch == monster.subtype);
                }
                break;
            
        }
        return check;
    }
}

export default HeroUtils;