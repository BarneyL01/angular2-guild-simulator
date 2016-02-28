import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

import {MongoConnection} from './mongo-connection';

@Component({
  selector: 'my-dashboard',
  templateUrl : 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    mongoConnection:MongoConnection = new MongoConnection();
    constructor(
        private _router: Router,
        private _heroService: HeroService) {
    }

    ngOnInit() {
        this._heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1,5));
       
    //    this.mongoConnection.runMongoClient();
    }
    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this._router.navigate(link);
    }

}
