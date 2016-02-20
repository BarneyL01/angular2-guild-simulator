import { Hero } from './hero';

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
    }
}

export default HeroUtils;