import {Creature} from './creature';
import {DUNGEONS} from './mock-dungeons';
import {Injectable} from 'angular2/core';

@Injectable()
export class DungeonService {
  getDungeons() {
    return Promise.resolve(DUNGEONS);
  }
  
    getDungeon(id: number) {
        return Promise.resolve(DUNGEONS).then(
            dungeons => dungeons.filter(dungeon => dungeon.id === id)[0]
        );
    }

}
