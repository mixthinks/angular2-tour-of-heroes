import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/template/heroes.component.html',
    styleUrls:  ['app/css/heroes.component.css'],
    directives: [HeroDetailComponent]
})

export class HeroesComponent implements OnInit{
    title = 'Tour of Heroes';
    selectedHero: Hero;
    heroes: Hero[];
    addingHero = false;
    error: any;

    constructor(private router: Router,private heroService: HeroService){}

    onselect(hero:Hero) {
      this.selectedHero = hero;
      this.addingHero = false;
    }

    addHero() {
      this.addingHero = true;
      this.selectedHero = null;
    }

    close(savedHero: Hero) {
      this.addingHero = false;
      if (savedHero) { this.getHeroes(); }
    }

    deleteHero(hero: Hero, event: any) {
      event.stopPropagation();
      this.heroService
          .delete(hero)
          .then(res => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) { this.selectedHero = null; }
          })
          .catch(error => this.error = error);
    }

    getHeroes() {
      this.heroService.getHeroes().then(heroes => this.heroes = heroes).catch(error => this.error = error);
    }
    ngOnInit(){
      this.getHeroes();
    }
    gotoDetail() {
      let link = ['/detail', this.selectedHero.id];
      this.router.navigate(link);
    }
}
