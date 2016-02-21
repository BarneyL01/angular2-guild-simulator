import { Dungeon } from './dungeon';
import { Creature } from './creature';
import GeneralUtils from './general-utils';
import CreatureUtils from './creature-utils';
import {IdValuePair} from './id-value-pair';

var DungeonUtils = {
    
    getById: function(dungeons:Dungeon[], id:number):Dungeon{
        
        for(let dungeon of dungeons){
            
            if(dungeon.id==id){
                return dungeon;
            }
        }
        return ;
    },
    
    getMonster: function(dungeon:Dungeon, monsters:Creature[]):Creature{
        var monsterWeights:IdValuePair<number>[] = [];
        var totalMonsterWeights:number = 0;
        for(let monster of dungeon.monsterArray){
            totalMonsterWeights += monster.value;
            monsterWeights.push({"id": monster.id, "value":totalMonsterWeights});
        }
        var pickMonster:number = GeneralUtils.randomNumber(totalMonsterWeights);
        
        var pickedMonsterId:number;
        for(let weight of monsterWeights){
            if(pickMonster < weight.value){
                pickedMonsterId = weight.id;
                break;
            }
        }
        return CreatureUtils.getById(monsters, pickedMonsterId);
    }
    
    
}

export default DungeonUtils;