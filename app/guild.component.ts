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
    templateUrl: 'app/templates/guild.component.html',
    styleUrls: ['app/styles/guild.component.css'],
    
    directives: [HeroDetailComponent],
    providers: []




})

export class GuildComponent implements OnInit {
  guild: Guild;
  heroes: Hero[];
  failedLoad:boolean = false;
  failReason:string;
  selectedHero: Hero;
  showDayMessage:boolean = false;
  showAPMessage:boolean = false;
  messageAnyway:string = "";
  @ViewChild(HeroDetailComponent) heroDetail:HeroDetailComponent;
  
  constructor(
    private _router: Router,
    private _guildService: GuildService,
    private _heroService: HeroService) { }
   
  ngOnInit() {
    this._guildService.getGuild()
        .then(
            guild => {
                // console.log('getGuild() succeeded');
                this.guild = guild;
                this._heroService.getAllHeroesById(this.guild.heroIds).then(
                    heroes => this.heroes = heroes
                );
            }, 
            reason => {
                // console.log('getGuild() failed');
                this.failedLoad = true;
                this.failReason = reason;
            })
         .catch(
             reason => {
                //  console.log('getGuild() failed, CATCH');
             }
         );
  }
  onSelect(hero: Hero) { 
      this.selectedHero = hero; 
      this.heroDetail.setHero(this.selectedHero);
      this.heroDetail.setShowBack(false);
      
      this.showDayMessage = false;
  }
  
  nextDay() {
      
      if (!this.showAPMessage) {
          //   Check hero action points still usable.
          if (this.checkAPs()) {

              this.showAPMessage = true;
              this.messageAnyway = "Anyway";
              return;
          } else {
              this.showAPMessage = false;
              this.messageAnyway = "";
          }
      } else {
          //   Player clicked the button anyway, go ahead and Next Day.
          this.showAPMessage = false;
          this.messageAnyway = "";
      }
      


      for (let hero of this.heroes) {
          hero.actionPoints = hero.maxActionPoints;
          hero.hitPoints = Math.min(hero.maxHitPoints, (hero.hitPoints + this.guild.hpRefreshAmount));
      }
      if (this.guild.day >= 7) {
          this.guild.week++;
          this.guild.day = 1;
      } else {
          this.guild.day++;
      }


      this.showDayMessage = true;
  }
  
  private checkAPs():boolean{
      
      for (let hero of this.heroes) {
          if(hero.actionPoints >0) return true;
      }
      return false;
  }
/*  gotoDetail() {
    // this._router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    this.heroDetail.setHero(this.selectedHero);
  }*/
}

