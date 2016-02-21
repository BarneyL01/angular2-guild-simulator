import { Component }       from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import { HeroService } from './hero.service';
import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DuelComponent } from './duel.component';
import { DungeonComponent } from './dungeon.component';
import { MonsterService } from './monster.service';
import { DungeonService } from './dungeon.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <nav>
            <a [routerLink]="['Dashboard']">Dashboard</a>
            <a [routerLink]="['Heroes']">The Guild</a>
            <a [routerLink]="['Duel']">Duel</a>
            <a [routerLink]="['Dungeon']">Dungeon</a>
        </nav>
        <router-outlet></router-outlet>
        `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HeroService,
        MonsterService,
        DungeonService
    ]

})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    },
    {
        path: '/duel',
        name: 'Duel',
        component: DuelComponent
    },
    {
        path: '/dungeon',
        name: 'Dungeon',
        component: DungeonComponent
    }


])

export class AppComponent {
    title = 'Guild Simulator';
}
