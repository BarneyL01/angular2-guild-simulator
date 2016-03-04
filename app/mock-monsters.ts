import {Creature} from './creature';

export var MONSTERS: Creature[] = [
    {"id": "101", 
        "name": "Basic Goblin",  
        "type": "Monster",
        "armourClass": 12,
        "hitPoints":10,
        "maxHitPoints":10,
        "strength": 10,
        "dexterity": 16,
        "reflex": 10,
        "attackSpeed": 4,
        "weaponAttackAccuracy": 2,
        "damageRoll": 6,
        "damageModifier": 1,
        "level":1,
        "experienceIfKilled":1
    }
    ,{"id": "102", 
        "name": "Greener Goblin",  
        "type": "Monster",
        "armourClass": 13,
        "hitPoints":12,
        "maxHitPoints":12,
        "strength": 10,
        "dexterity": 16,
        "reflex": 10,
        "attackSpeed": 4,
        "weaponAttackAccuracy": 2,
        "damageRoll": 6,
        "damageModifier": 1,
        "level":1,
        "experienceIfKilled":1
    }
    ,{"id": "103", 
        "name": "Green Slime",  
        "type": "Monster",
        "armourClass": 7,
        "hitPoints":30,
        "maxHitPoints":30,
        "strength": 10,
        "dexterity": 13,
        "reflex": 10,
        "attackSpeed": 5,
        "weaponAttackAccuracy": 1,
        "damageRoll": 8,
        "damageModifier": 0,
        "level":1,
        "experienceIfKilled":1
    }

];
