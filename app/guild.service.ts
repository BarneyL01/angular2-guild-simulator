import {Hero} from './hero';
import {Guild} from './guild';
import {ProtoGuild} from './proto-guild';
import HeroUtils from './hero-utils';
import {GUILD} from './mock-guild';
import {HEROES} from './mock-heroes';
import {Injectable} from 'angular2/core';

@Injectable()
export class GuildService {
/*  getGuild():Promise<Guild>{
      
      return new Promise<Hero[]>(function(resolve, reject) {
           resolve(GUILD).then(protoguild =>
           {
                resolve(HEROES).then(heroes =>
                {
                    
                        this.buildGuild(heroes,protoguild)
                    })
        });
      });
          
  }*/
  
  private buildGuild(heroes:Hero[], protoguild:ProtoGuild):Promise<Guild>{
      var guild:Guild = {
          heroes:[],
          gold:protoguild.gold
      }
      for(let heroId of protoguild.heroes){
          guild.heroes.push(HeroUtils.getById(heroes,heroId));
      }
      
      return Promise.resolve(guild);
  }
  
}
