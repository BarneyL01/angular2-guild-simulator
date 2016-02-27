import {Hero} from './hero';
import {Guild} from './guild';
import {ProtoGuild} from './proto-guild';
import HeroUtils from './hero-utils';
import {GUILD} from './mock-guild';
import {HEROES} from './mock-heroes';
import {Injectable} from 'angular2/core';

@Injectable()
export class GuildService {
    guild:Guild;
  
    getGuild():Promise<Guild>{
        if(this.guild == null){
            return this.getProtoGuildSlowly().then(protoguild =>
                this.getHeroesSlowly().then(
                    heroes =>
                        this.buildGuild(heroes, protoguild)
                )
            );   
        }else{
            return Promise.resolve(this.guild);
        } 
  }
  
  private getProtoGuild():Promise<ProtoGuild>{
      return Promise.resolve(GUILD);
  }
  
  private getHeroes():Promise<Hero[]>{
      return Promise.resolve(HEROES);
  }
  
  // See the "Take it slow" appendix
  private getHeroesSlowly():Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }
  
  // See the "Take it slow" appendix
  private getProtoGuildSlowly():Promise<ProtoGuild> {
    return new Promise<ProtoGuild>(resolve =>
      setTimeout(()=>resolve(GUILD), 3000) // 2 seconds
    );
  }
  
  private buildGuild(heroes:Hero[], protoguild:ProtoGuild):Promise<Guild>{
      this.guild = {
          id:protoguild.id,
          name:protoguild.name,
          heroes:[],
          gold:protoguild.gold
      }
      for(let heroId of protoguild.heroes){
          this.guild.heroes.push(HeroUtils.getById(heroes,heroId));
      }
      
      return Promise.resolve(this.guild);
  }
  
}
