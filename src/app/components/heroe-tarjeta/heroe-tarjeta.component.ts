import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html'
})
export class HeroeTarjetaComponent implements OnInit {

  @Input() heroe: any  = {};
  @Input() indice: number;
  @Output() heroeSeleccionado: EventEmitter<number>;

  constructor( private router: Router ) {
    this.indice = -1;
    this.heroeSeleccionado = new EventEmitter();
  }

  ngOnInit() {
  }

  verHeroe() {
    this.router.navigate( [ '/heroe', this.indice ] );
    //this.router.navigate( [ '/heroe', this.heroe.idx ] );
    //this.heroeSeleccionado.emit( this.indice );
  }
}
