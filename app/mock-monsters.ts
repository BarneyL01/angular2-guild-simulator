import {Creature} from './creature';

export var MONSTERS: Creature[] = [
    {"id": 101, 
        "name": "Green Slime",  
        "type": "Monster",
        "strength": 1,
        "dexterity": 1,
        "hitPoints":3,
        "maxHitPoints":3,
        "attackSpeed": 4,
        "level":1,
        "experienceIfKilled":1
    },
    {"id": 102, 
        "name": "Blue Slime",
        "type": "Monster",
        "strength": 2,
        "dexterity": 1,
        "hitPoints":4,
        "maxHitPoints":4,
        "attackSpeed": 5,
        "level":2,
        "experienceIfKilled":2
    },
    {"id": 103, 
        "name": "Rat",
        "type": "Monster",
        "strength": 1,
        "dexterity": 1,
        "hitPoints":4,
        "maxHitPoints":4,
        "attackSpeed": 2,
        "level":2,
        "experienceIfKilled":2
    }

];
