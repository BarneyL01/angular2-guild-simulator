import {Hero} from './hero';
import {Guild} from './guild';
// import {ProtoGuild} from './proto-guild';
import HeroUtils from './hero-utils';
import {GUILD} from './mock-guild';
import {HEROES} from './mock-heroes';
import {Injectable} from 'angular2/core';

@Injectable()
export class GuildService {
    guild:Guild;
    
    
  
    getGuild():Promise<Guild>{
        return Promise.resolve(GUILD);
  }
  
  
  private failGuildPromise():Promise<Guild> {
    return new Promise<Guild>(thisAlwaysFails => Promise.reject('Stuff'));
  }
  
}
