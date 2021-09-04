import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from '../../servicios/heroes.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroes'
  , templateUrl: './heroes.component.html'
})
export class HeroesComponent implements OnInit {

  heroes: Heroe[] = [];
  termino: string;

  constructor( private _heroesService: HeroesService
              , private router: Router
              , private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {

      this.activatedRoute.params.subscribe( params => {

        this.termino = params[ 'q' ];
        if( null == this.termino )
          this.heroes = this._heroesService.getHeroes();
        else
          this.heroes = this._heroesService.buscarHeroe( this.termino );
          
      });
  }

  verHeroe( idx:number ) {
    this.router.navigate( [ '/heroe', idx ] );
  }

}
