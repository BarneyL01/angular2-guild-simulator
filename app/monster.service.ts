import {Creature} from './creature';
import {MONSTERS} from './mock-monsters';
import {Injectable} from 'angular2/core';

@Injectable()
export class MonsterService {
  getMonsters() {
    return Promise.resolve(MONSTERS);
  }
  
    getMonster(id: number) {
        return Promise.resolve(MONSTERS).then(
            monsters => monsters.filter(monster => monster.id === id)[0]
        );
    }

}
