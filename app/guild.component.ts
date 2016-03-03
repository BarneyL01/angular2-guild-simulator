import {Component, OnInit, ViewChild} from 'angular2/core';
import { Router } from 'angular2/router';
import {Hero} from './hero';
import {Guild} from './guild';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';
import { GuildService } from './guild.service';

/**
 * Just adding a comment
 */
@Component({
    selector: 'guild-component',
    templateUrl: 'templates/guild.component.html',
    styleUrls: ['styles/guild.component.css'],
    
    directives: [HeroDetailComponent],
    providers: []




})

export class GuildComponent implements OnInit {
  guild: Guild;
  heroes: Hero[];
  failedLoad:boolean = false;
  failReason:string;
  selectedHero: Hero;
  @ViewChild(HeroDetailComponent) heroDetail:HeroDetailComponent;
  
  constructor(
    private _router: Router,
    private _guildService: GuildService,
    private _heroService: HeroService) { }
   
  ngOnInit() {
    this._guildService.getGuild()
        .then(
            guild => {
                console.log('getGuild() succeeded');
                this.guild = guild;
                this._heroService.getAllHeroesById(this.guild.heroIds).then(
                    heroes => this.heroes = heroes
                );
            }, 
            reason => {
                console.log('getGuild() failed');
                this.failedLoad = true;
                this.failReason = reason;
            })
         .catch(
             reason => {
                 console.log('getGuild() failed, CATCH');
             }
         );
  }
  onSelect(hero: Hero) { 
      this.selectedHero = hero; 
      this.heroDetail.setHero(this.selectedHero);
      this.heroDetail.setShowBack(false);
  }
/*  gotoDetail() {
    // this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    this.heroDetail.setHero(this.selectedHero);
  }*/
}

