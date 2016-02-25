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
    templateUrl: 'app/guild.component.html',
    styleUrls: ['app/guild.component.css'],
    
    directives: [HeroDetailComponent],
    providers: []




})

export class GuildComponent implements OnInit {
  guild: Guild;
  selectedHero: Hero;
  @ViewChild(HeroDetailComponent) heroDetail:HeroDetailComponent;
  
  constructor(
    private _router: Router,
    private _guildService: GuildService) { }
   
  ngOnInit() {
    this._guildService.getGuild().then(guild => this.guild = guild);
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

