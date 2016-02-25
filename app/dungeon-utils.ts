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
    
    spawnMonster: function(dungeon:Dungeon, monsters:Creature[]):Creature{
        var monsterWeights:IdValuePair<number>[] = [];
        var totalMonsterWeights:number = 0;
        for(let monster of dungeon.monsterArray){
            totalMonsterWeights += monster.value;
            monsterWeights.push({"id": monster.id, "value":totalMonsterWeights});
            // console.log('spawnMonster - monsterWeights', monster.id, ': ', totalMonsterWeights);
        }
        
        var pickMonster:number = GeneralUtils.randomNumber(totalMonsterWeights);
        // console.log('spawnMonster - pickMonster', pickMonster);
        var pickedMonsterId:number;
        for(let weight of monsterWeights){
            // console.log('spawnMonster - monsterWeights', weight.id, ': ', weight.value);
            if(pickMonster <= weight.value){
                pickedMonsterId = weight.id;
                break;
            }
        }
        // console.log('spawnMonster - pickedMonsterId', pickedMonsterId);
        return GeneralUtils.copyObject(CreatureUtils.getById(monsters, pickedMonsterId));
    },
    
    generateDungeonLength: function(dungeon:Dungeon):number{
        return (GeneralUtils.randomIntFromInterval(dungeon.minDungeonLength,dungeon.maxDungeonLength));
    },
    
    getMonsterList:function(dungeon:Dungeon, monsters:Creature[]):Creature[]{
        var monsterList:Creature[] = [];
        for(let monster of dungeon.monsterArray){
            
            monsterList.push(CreatureUtils.getById(monsters,monster.id));
            
        }
        return monsterList;
    },
    
    calculateMonsterGold:function(dungeon:Dungeon):number{
        return GeneralUtils.randomIntFromInterval(dungeon.creatureGoldMin,dungeon.creatureGoldMax);
    }
    
}

export default DungeonUtils;