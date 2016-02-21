import {Component, OnInit, ViewChild} from 'angular2/core';
import { Router } from 'angular2/router';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroService} from './hero.service';

/**
 * Just adding a comment
 */
@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    
    directives: [HeroDetailComponent],
    providers: []




})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  @ViewChild(HeroDetailComponent) heroDetail:HeroDetailComponent;
  
  constructor(
    private _router: Router,
    private _heroService: HeroService) { }
  getHeroes() {
    this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit() {
    this.getHeroes();
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

