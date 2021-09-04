import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var jsBase: any;
declare var jsGen: any;


@Component({
  selector: 'app-navbar'
  , templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router ) {
    //jsBase.init();
    //jsGen.init();
  }

  ngOnInit() {
  }
  //evt:KeyboardEvent
  uifBuscarHeroe( evt:any, q:string ) {

    let _self = this;

    if( evt.keyCode == 13 )
      this.buscarHeroe(q);
    else {
      jsGen.HandleDOM_ChangeWithDelay( evt.target, function(){ _self.buscarHeroe( q ); }, 1000 );
    }
  }

  buscarHeroe( q:string ) {
    if( q.length == 0 )
      this.router.navigate( [ '/heroes' ] );
    else
      this.router.navigate( [ '/heroes', q ] );
  }
}
