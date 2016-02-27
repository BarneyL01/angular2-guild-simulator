/*import {Hero} from './hero';
import {Guild} from './guild';
import {ProtoGuild} from './proto-guild';
import HeroUtils from './hero-utils';
import {GUILD} from './mock-guild';
import {HEROES} from './mock-heroes';
import {Injectable} from 'angular2/core';

@Injectable()
export class GuildService {
    getGuild():Promise<Guild>{
        return new Promise<Hero[]>(function(resolve, reject) {
            Promise.all([getProtoGuild(), getHeroes()]).then((values) => {
                var protoguild = values[0];
                var heroes = values[1];
                resolve(this.buildGuild(heroes, protoguild));
            })
        });
    }
  
    private getProtoGuild():Promise<Guild>{
        return new Promise<Guild>(function(resolve, reject) {
            // assume it takes a long time to find the proto guild and is done asynchronously.
            resolve(GUILD);
        });
    }
  
    private getHeroes():Promise<Hero[]>{
        return new Promise<Hero[]>(function resolve, reject) {
            // assume it takes a long time to find the heroes and is done asynchronously.
           resolve(HEROES); 
        });
    }
  
    private buildGuild(heroes:Hero[], protoguild:ProtoGuild):Guild{
        var guild = Object.assign({}, protoguild); // clone the protoguild object
        
        for(let heroId of protoguild.heroes){
            guild.heroes.push(HeroUtils.getById(heroes,heroId));
        }
      
        return guild;
    }
}
  */