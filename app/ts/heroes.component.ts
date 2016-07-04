import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/template/heroes.component.html',
    styleUrls:  ['app/css/heroes.component.css']
})

export class HeroesComponent implements OnInit{
    title = 'Tour of Heroes';
    selectedHero: Hero;
    heroes: Hero[];

    constructor(private router: Router,private heroService: HeroService){}

    onselect(hero:Hero) {
      this.selectedHero = hero;
    }
    getHeroes() {
      this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    ngOnInit(){
      this.getHeroes();
    }
    gotoDetail() {
      let link = ['/detail', this.selectedHero.id];
      this.router.navigate(link);
    }
}
