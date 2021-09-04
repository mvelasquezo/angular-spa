var jsGen = function () { var zGbl_DOM_ChangeTimer; var fn = {};

fn.init = function() {
};

fn.initSlct = function( objPar ) {
	//slctL.init( 'uiSlctPza', '70px', true, true, jsEndodoncia.uifLdaPza );
	var objSlct = jsBase.$( objPar.id );

	if( objSlct ) {

		objSlct.on( 'focus', function() {
			this.setAttribute( 'ant', jsBase.optionSel( this, undefined, 'value' ) );
		});

		objSlct.on( 'change', function() {
			if( null != objPar.fn )
			eval( objPar.fn );
		});
	}
};

fn.swalResponsive = function() {
	//swal responsive
	$( '.swal-modal' ).addClass( 'swal-modal-js' );
	$( '.swal-footer' ).addClass( 'swal-footer-js' );
	$( '.swal-overlay' ).addClass( 'swal-overlay-js' );
	//fin swal responsive
};

//evt: onkeyup
fn.textAreaAdjustV0 = function( parObj ) {
	//console.log('textadjustV0: on');
	var ajustePx = 22;

	parObj.alt = (undefined===parObj.alt)?15:parObj.alt;

	parObj.o.style.height = "1px";
  	//o.style.height = ( 5 + o.scrollHeight ) + 'px';
  	parObj.o.style.setProperty( 'height', ( parObj.alt + parObj.o.scrollHeight - ajustePx ) + 'px', 'important' );
	//console.log('altura: '+parObj.o.style.height);
	if(undefined===parObj.flg||null===parObj.flg||false===parObj.flg)return;
	parObj.o.parentNode.style.height = ( parObj.altPadre + parObj.o.scrollHeight - ajustePx ) + 'px';
	//console.log('padre: on');
};

//evt: onkeydown
fn.textAreaAdjust = function( parObj ){
  var el = parObj.o;
  //console.log('textadjust: on');
  setTimeout(function(){
    el.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);

  if(undefined===parObj.flg||null===parObj.flg)return;
  setTimeout(function(){
    //el.parentNode.style.cssText = 'height:auto; padding:0';
    // for box-sizing other than "content-box" use:
    // el.style.cssText = '-moz-box-sizing:content-box';
    el.parentNode.style.cssText = 'height:' + el.scrollHeight + 'px';
  },0);
}

fn.initTel = function( par ) {
	var obj = (typeof par.strObj === 'string'
				|| par.strObj instanceof String)?jsBase.$(par.strObj):par.strObj;

	if(obj) {
		obj.onkeydown	= function( event ) {
			return jsBase.validaSoloNumeros_KeyDown(event);
		};

		obj.onpaste		= function( event ) {
			var er = /[^0-9+-]/g;
			return jsBase.validaNumTelV1_Paste(event,er);
		};

		obj.onkeyup		= function( event ) {
			var er = /[^0-9+()-]/g;
			this.value = this.value.replace( er, '' );
		};
	}

	$( obj ).intlTelInput({
		nationalMode: true,
		placeholderNumberType: 'MOBILE',
		initialCountry: 'auto',
		preferredCountries: [ 'gt', 'sv', 'hn', 'ni', 'cr', 'pa', 'mx', 'us' ],
		geoIpLookup: function(callback) {
			try {
				$.get( 'https://ipinfo.io', function() {}, 'jsonp' )
				.fail(function ( jqXHR, textStatus, errorThrown ) {
					callback( 'gt' );
				})
				.done(function(resp) {
					var countryCode = (resp && resp.country) ? resp.country : 'gt';
					//console.log( 'cc:' + countryCode );
					callback(countryCode);
				})
				.always(function() {
				});

				//$.get("http://ipinfo.io", function (resp) {
				//	console.log(resp);
				//	var countryCode = (resp && resp.country) ? resp.country : "";
				//	var countryCode = (resp && resp.country) ? resp.country : "";
				//  	callback(countryCode);
				//}, "jsonp");
			} catch(ex1){}
		  },
		utilsScript: 'intl-tel-input-master/js/utils.js?1549804213570',
	});

	if(true==par.flg)
		$( obj ).intlTelInput( 'setNumber', '+' + par.num );

	if(par.chnFn) {
		obj.addEventListener( 'countrychange', function() {
		  	//console.log('nvo c:' + this.value);
		  	par.chnFn(this);
		});
	}
};

fn.uifPrepTodosLocHrefAtr = function( strIdExp ) {
	jsGen.prepTodosLocHrefAtr({
		strData: 	'[data-anc="js-tra"]'
		, tipo:  	0
		, fn: 	 	jsGen.clickLocHref
		, strIdExp: strIdExp
	});
};

fn.prepTodosLocHrefAtr = function( objPar ) {

	var objs = document.querySelectorAll( objPar.strData );

	[].forEach.call( objs, ( e )=> {
		if( objPar.tipo == 0 ) {
			e.onclick = function(){ return objPar.fn( e, objPar.strIdExp ); }
		}
		else if( objPar.tipo == 1 ) {
			e.href = objPar.fn( e.href );
		}
		else
			console.log( 'tipo no encontrado > prepTodosLocHrefAtr' );
	});
};

fn.clickLocHref = function( anc, strIdExp ) {
	var url = anc.href;
	var obj = jsBase.$( strIdExp );

	if( !obj ) {
		console.log( 'jsGen: No existe ' + strIdExp );
		return false;
	}

	var idExp = obj.value;

	if( ( null != idExp || undefined != idExp ) && !idExp.isEmpty() ) {

		var tilde = anc.getAttribute( 'data-tilde' );
		var href = url + idExp;

		if( null != tilde && null != anc.title) {
			href += '?frm=' + anc.title.toLowerCase();
		}

		location.href = href;
		//window.location = url + idExp;
		return false;
	} else {

		swal( 'Formulario', 'Seleccione un expediente', 'warning' );
		jsGen.swalResponsive();

	}

	return false;
};

fn.ldaMiBarraSticky = function() {
	$(document).ready(function() {

		var u = jsBase.readCookie( 'u' ), p = jsBase.readCookie( 'p' );
		if( (undefined==u||null==u) && (undefined==p||null==p) ){}
		else {
			if(jsBase.$('miBarraSticky' ))
				jsBase.mosDiv( true, 'miBarraSticky' );
			else
				console.log('No existe miBarraSticky');
		}

		jsBase.mosDiv( true, 'miBarraSticky' );

		var stickyNavTop	= $( '.nav-sticky' ).offset().top;
		var stickyNav		= function(){
			var scrollTop = $(window).scrollTop();
			if ( scrollTop > stickyNavTop )
				$( '.nav-sticky' ).addClass( 'sticky' );
			else
				$( '.nav-sticky' ).removeClass( 'sticky' );
		};

		stickyNav();

		$(window).scroll( function() {
			stickyNav();
		});

		//_$( 'uiAncNuevo' ).onclick = uifNvoExp;
		//$( '#uiAncNuevo' ).click(function() { uifNvoExp(); });
		//$( '#search-button' ).click(function() { uifBusCorExp(); });
		//$( '#uiAncTra' ).click( function(){ moDivTratamiento(this); } );

		setTimeout( "jsBase.setFoc( 'search-text' )", '100' );
	});
};

fn.placeHolderInpSrc = function( x ) {
	var o = jsBase.$( 'search-text' );
	if(o) o.setAttribute( 'placeholder', ( (x < 875) ? 'Buscar' : '¿Qué producto buscas?' ) );
};

fn.getUiTxt = function( strTxt, strCookie, flag ) {
	var strU = jsBase.readCookie( strCookie );

	if( true == flag ) return strU;

	if( undefined == strU || null == strU || strU.isEmpty() )
		strU = encodeURIComponent( jsBase.getText( strTxt ) )

	return strU;
};

fn.setChangeListener = function( target, listener, tiempo ) {

	if( listener && target ) {
		if(tiempo===undefined||tiempo===null)
			var tiempo = 350;

		var observer = new MutationObserver( function( mutations ) {
			mutations.forEach( function( mutation ) {
				jsGen.HandleDOM_ChangeWithDelay( target, listener, tiempo );
		  	});
		});

		const config = {
		  attributes:			false,
		  attributeOldValue:	false,
		  characterData: 		true,
		  characterDataOldValue:true,
		  childList: 			true,
		  subtree: 				true
		};
		observer.observe( target, config );
		//jsBase.nvoEvt( target, 'input', function() { jsGen.HandleDOM_ChangeWithDelay( target, listener, tiempo ); } );
		target.on( 'input', function() {
			jsGen.HandleDOM_ChangeWithDelay( target, listener, tiempo );
		});
	} else console.log('errno');
};

fn.HandleDOM_ChangeWithDelay = function( objCont, listener, tiempo ) {
    if( typeof jsGen.zGbl_DOM_ChangeTimer == 'number' ) {
        clearTimeout (jsGen.zGbl_DOM_ChangeTimer);
        jsGen.zGbl_DOM_ChangeTimer = '';
    }
    jsGen.zGbl_DOM_ChangeTimer = setTimeout ( listener, tiempo, objCont );
};

fn.ergInpTypPss = function( strId, strIdLbl ) {
	var idioma = jsBase.optionSel( 'slctIdioma' );
	var strShow = '', strHide = '';
	switch( idioma ){
		case 'es-GT': strShow = 'Mostrar'; strHide = 'Ocultar'; break;
		case 'en-EU': strShow = 'Show'; strHide = 'Hide';  break;
		default: strShow = 'Mostrar'; strHide = 'Ocultar'; break;
	}
    var x = document.getElementById(strId);

    if(!x) { console.log( 'No existo(fn.ergInpTypPss): "' + strId + '"' ); return; }

    if( x.type === 'password' ) {
        x.type = 'text';
		$( '#' + strIdLbl ).text( strHide );
    } else {
        x.type = 'password';
		$( '#' + strIdLbl ).text( strShow );
    }
};

fn.initInpTypPss = function( strId, strIdLbl ) {
	var idioma = jsBase.optionSel( 'slctIdioma' );
	var strShow = '', strHide = '';

	switch( idioma ){
		case 'es-GT': strShow = 'Mostrar'; strHide = 'Ocultar'; break;
		case 'en-EU': strShow = 'Show'; strHide = 'Hide';  break;
		default: strShow = 'Mostrar'; strHide = 'Ocultar'; break;
	}
	var x = document.getElementById(strId);

    if(!x.value.toString().isEmpty())
    	$( '#' + strIdLbl ).text( strShow );
};

fn.uifActPar = function( obj ) {

	obj = jsBase.$( obj );

	var objJQ = $( obj );
	var attr1 = objJQ.attr( 'disabled' );
	var attr2 = objJQ.attr( 'readonly' );

	if ( ( typeof attr1 !== typeof undefined && attr1 !== false ) || ( typeof attr2 !== typeof undefined && attr2 !== false ) ) {
	} else {

		var pat = objJQ.attr( 'pattern' );

		if(undefined===pat||null===pat||pat.isEmpty())
			jsGen.actPar( objJQ );
		else {

			var regex 	= new RegExp( pat );
			var val 	= objJQ.val();

			if( regex.test( val ) )
				jsGen.actPar( objJQ );
			else {
				var re 	= new RegExp( '[^' + pat + ']' );
				var nval= val.replace( re, '' );

				objJQ.val( nval );
			}
		}
	}
};

fn.actPar = function( objJQ ) { try{
	jsBase.mosDiv( true, 'lblAjax' );
	jsBase.setTxt( 'lblAjax', 'Guardando' );

	var tipo 	= objJQ.attr( 'type' ).toLowerCase();
	var valor 	= objJQ.val();

	if( 'tel' == tipo )
		valor = (objJQ.intlTelInput( 'isValidNumber' )) ? '' + objJQ.intlTelInput( 'getNumber' ) : valor;
	else if( 'checkbox' == tipo )
		//if ( elem.checked )
		//if ( $( elem ).prop( "checked" ) )
		//if ( $( elem ).is( ":checked" ) )
		valor = objJQ.is( ':checked' );
	else if( 'date' == tipo ) {
		var str = '';
		if( !valor.isEmpty() ) {
			var parts = valor.split( '-' );
			var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
			str = mydate.yyyymmdd();
		}
		valor = str;
	}

	var arrPar		= {
    	tbl:		window.atob( objJQ.attr( 'data-tbl' ) )
		, cam:		window.atob( objJQ.attr( 'data-cam' ) )
		, val:		encodeURIComponent( valor )
		, td:		window.atob( objJQ.attr( 'data-td' ) )
		, llave:	window.atob( objJQ.attr( 'data-llave' ) )
		, id:		objJQ.attr( 'data-ihd' )
    	, nocache: 	Math.random()
	};
	//console.log(arrPar);
	//return;
	ajx.mkReq({
		url:	varGbl.pagina.controlador.expediente.act_enc
		, met:	'POST'
		, qs:	jsBase.param( arrPar )
	})
	.then( function( objAjax ) {
		jsGen.$actPar( objAjax, arrPar.cam, arrPar.val, objJQ.attr( 'data-ihd' ) );
	}, arrPar.cam, arrPar.val, objJQ.attr( 'data-ihd' ) )
	.catch( function( error ) {
		console.log( error );
	});

}catch( ex ){ alert( 'Error interno(jsGen)[actPar(parms)]: ' + ex.message ); }
};

fn.$actPar = function( objAjax, campo, val, id ) {
try {
	var objRes = null;
	jsBase.setText( 'lblAjax', '' );
	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ) {
			if( objRes.estado == 'ok' ) {
				jsBase.setText( 'lblAjax', 'Guardado' );
				setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 2000 );

				if( campo && campo.toLowerCase() == 'nombre' ) {

					if( null != id ) {
						var hd = jsBase.$( 'uiHdGuid' + id );

						if( null != hd ) {

							var guid = hd.value;
							var tab = jsBase.$( 'tab-' + guid );
							if( null != tab ) {
								val = decodeURIComponent(val);
								jsBase.setTxt( tab, ( ( val.isEmpty() ) ? guid : val ) );
							}

							var hdHC = jsBase.$( 'uiHdHayCambios' + id );
							if( null != hdHC )
								hdHC.value = '1';
						}
					}
				}
			}
		} else {
			console.log( ':(' + objAjax.responseText );
			jsBase.setText( 'lblAjax', ':( ' + objAjax.responseText + jsGen.getStrCerrar( 'lblAjax' ) );
		}
	}catch( ex1 ){ console.log( 'responseText: ' + objAjax.responseText ); console.log( 'ex: ' + ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$actPar(parms)]: ' + ex.message ); }
};

fn.getStrCerrar = function( strDiv ) {
return '<a href="javascript:jsBase.mostrarDiv( false, \'' + strDiv + '\' );" class="btnLT tooltipX" style="display: inline-block;">'
		+ '<span class="icon-cross" style=" color: #000; font-size: 13px;"></span>'
		+ '<span class="tooltipX negrilla" style="width: 75px; top: 25px; left: 50px;">Cerrar</span></a>';
};

fn.esAmbDesa = function() {
	var strAmb = jsBase.readCookie( 'amb' );
	if( null == strAmb || strAmb.isEmpty() )
		return false;
	else {
		if( strAmb.toLowerCase() == 'desa' )
			return true;
		return false;
	}
};

fn.ldaData = function( objPar ){
try {

	if( undefined !== objPar.divAjx ) {

		if( undefined !== objPar.actLoa && true === objPar.actLoa )
			jsBase.mosDiv( true, 'loader' );

		if( undefined !== objPar.divAjx )
			jsBase.mosDiv( true, objPar.divAjx );

		if( undefined !== objPar.divAjx2 )
			jsBase.setTxt( objPar.divAjx2, objPar.lblAjx );
	}

	ajx.mkReq({
		url:	objPar.url
		, met:	objPar.met
		, qs:	objPar.qs
	})
	.then( function( objAjax ) {
		jsGen.$ldaData( objAjax, objPar );
	}, objPar )
	.catch( function( error ) {
		console.log( error );
	});

}catch( ex ){ alert( 'Error interno(jsGen)[ldaData(objPar)]: ' + ex.message ); }
}

fn.$ldaData = function( objAjax, objPar ){
try {
	var objRes = null;

	if( undefined !== objPar.divAjx ) {

		if( undefined !== objPar.actLoa && true === objPar.actLoa )
			jsBase.mosDiv( false, 'loader' );

		if( undefined !== objPar.divAjx )
			jsBase.mosDiv( false, objPar.divAjx );

		if( undefined !== objPar.divAjx2 )
			jsBase.setTxt( objPar.divAjx2, '' );
	}

	try {
		objRes = JSON.parse( objAjax.responseText );

		if( undefined !== objPar.fn && typeof objPar.fn === 'function' )
			objPar.fn( objPar, objRes );

	} catch( ex1 ){
		console.log( objAjax.responseText );
		console.log( ex1.message );
		swal( 'Info', objAjax.responseText + '|' + ex1.message, 'info' );
	}

}catch( ex ){ alert( 'Error interno(jsGen)[$ldaData(parms)]: ' + ex.message ); }
};

fn.nvoTag = function( op, tbl, idCli, idEncExp, id, cam, masCampos, fun, item ){
try{
	jsBase.mosDiv( true, 'lblAjax' );
	jsBase.setTxt( 'lblAjax', 'Guardando' );

	var objPar = {
		tbl:		tbl
		, op:		op
		, guid: 	jsBase.uuidv4()
    	, idcli: 	idCli
		, idencexp:	idEncExp
		, id:		id
		, cam:		cam
		, masCampos: masCampos
    	, nocache: 	Math.random()
	};
	//console.log(objPar);
	ajx.mkReq({
		url:	varGbl.pagina.controlador.tabla.insRemTag
		, met:	'POST'
		, qs:	jsBase.param( objPar )
	})
	.then( function( objAjax ) {
		jsGen.$nvoTag( objAjax, tbl, idCli, idEncExp, id, cam, fun, item );
	}, tbl, idCli, idEncExp, id, cam, fun, item )
	.catch( function( error ) {
		console.log( error );
	});

}catch( ex ){ alert( 'Error interno(jsHome)[nvoTag(parms)]: ' + ex.message ); }
};

fn.$nvoTag = function( objAjax, tbl, idCli, idEncExp, id, cam, fun, item ){
try {
	var objRes = null;
	jsBase.mosDiv( false, 'loader' );
	jsBase.setTxt( 'lblAjax', '' );

	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ){
			if( objRes.estado == 'ok' ) {
				var uiHayCambios = jsBase.$( 'uiHdHayCambios' + id );

				if(uiHayCambios)
					jsBase.setTxt( uiHayCambios, '1' );

				jsBase.mosDiv( true, 'lblAjax' );
				jsBase.setTxt( 'lblAjax', 'Guardado' );
				setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 150 );

				//console.log(objAjax, tbl, idCli, idEncExp, id, cam, fun);
				if( null != fun )
					fun( objRes, item );

			} else
				swal( 'Error', 'No ha sido posible guardar el nuevo expediente. ' + objRes.error.descripcion, 'error' );
		} else
			swal( 'Aviso', 'No ha sido posible guardar el nuevo expediente. ' + objRes.error.descripcion + '|' + objAjax.responseText, 'warning' );
	}catch( ex1 ){
		console.log( objAjax.responseText );
		console.log( ex1.message );
		swal( 'Info', objAjax.responseText + '|' + ex1.message, 'info' );
	}
}catch( ex ){ alert( 'Error interno(jsHome)[$nvoTag(parms)]: ' + ex.message ); }
};

fn.uifEliBtn = function(objPar) {

	if( null != objPar && objPar.amb == 'desa' )
		console.log(objPar);

	swal( {
		text: '\xBFDesea eliminar este elemento?',
		icon: 'warning',
		dangerMode: true,
		buttons: {
			cancel: {
				visible: true,
				text: 'No, gracias'
			},
			confirm: {
				visible: true,
				text: 'Sí, deseo eliminarlo!'
			}
		}
	} ).then( ( respuesta ) => {

		if( !respuesta ) return;

		jsBase.mosDiv( true, 'lblAjax' );
		jsBase.setTxt( 'lblAjax', 'Eliminando' );

		var param = jsBase.param({
						tbl:		objPar.tbl
						, llave:	objPar.llave || ''
						, val: 		objPar.par 	 || objPar.val
						, td: 		objPar.td 	 || ''
				    	, nocache: 	Math.random()
					})

		if( null != objPar && objPar.amb == 'desa' )
			console.log(param);

		ajx.mkReq({
			url:	objPar.url
			, met:	'POST'
			, qs:	param
		})
		.then( function( objAjax ) {

			jsBase.mosDiv( false, 'lblAjax' );
			jsBase.setTxt( 'lblAjax', '' );

			if( null != objPar.fun
				&& null != objPar.fun.des
				&& {}.toString.call( objPar.fun.des ) === '[object Function]' ) {

				objPar.fun.des( objAjax, objPar.obj );
			}

		}, objPar.obj )
		.catch( function( error ) {
			console.log( error );
		});

	});

	if( null != objPar && objPar.res == true )
		jsGen.swalResponsive();

};

fn.mainCerrarDivLogIn = function() {
	jsBase.$( 'uiTxtUsr' ).on( 'keyup', function(event){ jsGen.onkeyupLogin( event, true ); } );
	jsBase.$( 'uiTxtPss' ).on( 'keyup', function(event){ jsGen.onkeyupLogin( event ); } );
	jsBase.$( 'uiAncLogIn' ).on( 'click', function(){ /*login();*/ } );
	jsBase.$( 'uiAncSalir' ).on( 'click', function(){ jsGen.salir( true ); $( '#uiDivLogin' ).hide(); } );
	jsBase.$( 'uiAncInfoUsuario' ).on ( 'click', function(){ jsGen.salir( true ); } );

	$( '#uiAncMenuLogin' ).click( function(){ jsGen.cerrarDivLogIn(); } );
	$( '#uiCbVerPss' ).click( function(){ jsGen.ergInpTypPss( 'uiTxtPss', 'uiLblVerPss' ); } );

	$(document).keyup( function(event){
        if(event.which == 27)
            $( '#uiDivLogin' ).hide();
    });

	jsBase.setText( 'uiTxtUsr', 'mvelasquez' );
	jsBase.setText( 'uiTxtPss', 'admin4321' );
};

fn.cerrarDivLogIn = function() {

	//slideUp();
	//$( '#hHeader' ).css( 'padding', '0' );
	$( '#uiDivLogin' ).slideToggle( 'slow', function(){
		if($( '#uiDivLogin' ).is( ':visible' )) {
			//jsBase.setFocus( 'uiTxtUsr' );
			//jsBase.$( 'uiTxtUsr' ).focus();
		} else {
			//$( '#hHeader' ).css( 'padding', '' );
		}
	});
};

fn.onkeyupLogin = function( evt, i ){
try{
	evt = evt || window.event;
	var tecla = evt.keyCode || evt.which;
	if( tecla == 13 ){
		if( jsBase.getText( 'uiTxtPss' ).length == 0 && i )
			jsBase.setFoc( 'uiTxtPss' );
		else {
			//uifLogin();
			console.log( 'ir a uifLogin' );
		}
	}
}catch( ex ){ alert( 'Error interno(jsGen)[onkeyupLogin(parms)]: ' + ex.message ); }
};

fn.salir = function( flag ) {
	if( true == flag ) {
	   	jsBase.mostrarDiv( true, 'lblAjax' );
		jsBase.setText( 'lblAjax', 'Saliendo' );
		//limTodo();
	}

	//jsGen.moConfIni( false, -1 );

	jsBase.eraseCookie( 'u' ); jsBase.eraseCookie( 'p' ); jsBase.eraseCookie( 'tok' );
	jsBase.mostrarDiv( false, 'uiDivInfUsr' );

	if( true == flag ) {
		setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 850 );
		//setContenidoEditable( false, actualizarParListener );
	}
	//$( '#hHeader' ).css( 'padding', '0' );
	jsBase.cambiarDisplay( jsBase.$( 'uiAncMenuLogin' ), 'inline-block' );
}

fn.moConfIni = function( flag, idCli ) {

	$( '#hHeader' ).css( 'padding', '' );

	//ini config mostrar
	jsBase.mostrarDiv( flag, 'divMenuDisAgl' );
	jsBase.mostrarDiv( flag, 'sMain' );
	jsBase.mostrarDiv( false, 'asdAside' );
	jsBase.mostrarDiv( flag, 'miBarraSticky' );
	//fin config mostrar
};

fn.cargarIdiomas = function() {
	slctL.init( 'slctIdioma', '130px', true, true );
	jsBase.$( 'slctIdioma' ).on( 'change',	function(){ jsGen.cambiarIdioma(); } );

	var cookie = jsBase.readCookie( 'style' );
	var idioma = cookie ? cookie : jsHojaIdioma.obtenerHojaIdiomaSeleccionada();

	if( idioma ) {
		jsBase.selOptionPorValue( 'slctIdioma', idioma );
		slctL.onChangeSlct( 'slctIdioma' );
	}

	jsGen.placeholderFrmLogIn( idioma );
};

fn.cambiarIdioma = function(){
	var idioma = jsBase.optionSel( 'slctIdioma' );
	jsHojaIdioma.colocarHojaActivaIdioma( idioma );
	jsBase.createCookie( 'style', idioma, 365 );

	jsGen.placeholderFrmLogIn( idioma );

	jsGen.cambiarIdiomaNoticias$();

	//if( esPagIni ) {
	//	placeholderFrmEnvMsj( idioma );
	//}
};

fn.placeholderFrmLogIn = function( idioma ){
	//\xf3 = ó
	var pUsr, pPass, pBtn, pBtnSal;
	var strShow = '', strHide = '';
	switch( idioma ){
		case 'es-GT': pUsr = 'Usuario'; pPass = 'Contrase\xf1a'; pBtn = 'Entrar'; strShow = 'Mostrar'; strHide = 'Ocultar'; pBtnSal = 'Salir'; break;
		case 'en-EU': pUsr = 'User'; pPass = 'Password';  pBtn = 'Go';  strShow = 'Show'; strHide = 'Hide'; pBtnSal = 'Exit'; break;
	}

	jsGen.setInfoToTxtFloatLabel( 'Usr', pUsr );
	jsGen.setInfoToTxtFloatLabel( 'Pss', pPass );
	$( '#uiAncLogIn' ).text( pBtn );
	$( '#uiAncSalir' ).text( pBtnSal );

	var x = jsBase.$( 'uiTxtPss' );
	if (x.type === "password") {
		$( '#uiLblVerPss' ).text( strShow );
    } else {
		$( '#uiLblVerPss' ).text( strHide );
    }
};

fn.setInfoToTxtFloatLabel = function( pStrId, pMsj ) {
	var strId = 'uiTxt' + pStrId;

	jsBase.colocarAtributo( strId, 'placeholder', pMsj );
	jsBase.colocarTitle( strId, pMsj );
	jsBase.setText( strId.replace( 'Txt', 'Lbl' ), pMsj );
};

fn.cambiarIdiomaNoticias = function( idioma ) {
	switch( idioma ){
		case 'es-GT': jsBase.mostrarDiv( false, 'divNoticiasEN' ); jsBase.mostrarDiv( true, 'divNoticiasES' ); break;
		case 'en-EU': jsBase.mostrarDiv( false, 'divNoticiasES' ); jsBase.mostrarDiv( true, 'divNoticiasEN' ); break;
	}
	jsBase.mostrarDiv( true, 'divNoticias' );
};

fn.cambiarIdiomaNoticias$ = function() {
	var idioma = jsBase.optionSel( 'slctIdioma' );
	jsGen.cambiarIdiomaNoticias( idioma );
};

return fn;

}();

/*var zGbl_DOM_ChangeTimer = null;

function ldaMiBarraSticky() {

	$(document).ready(function() {

		var u = jsBase.readCookie( 'u' ), p = jsBase.readCookie( 'p' );
		if( (undefined==u||null==u) && (undefined==p||null==p) ){}
		else {
			if(jsBase.$('miBarraSticky' ))
				jsBase.mosDiv( true, 'miBarraSticky' );
			else
				console.log('No existe miBarraSticky');
		}

		var stickyNavTop	= $( '.nav-sticky' ).offset().top;
		var stickyNav		= function(){
			var scrollTop = $(window).scrollTop();
			if ( scrollTop > stickyNavTop )
				$( '.nav-sticky' ).addClass( 'sticky' );
			else
				$( '.nav-sticky' ).removeClass( 'sticky' );
		};

		stickyNav();

		$(window).scroll( function() {
			stickyNav();
		});

		//_$( 'uiAncNuevo' ).onclick = uifNvoExp;
		$( '#uiAncNuevo' ).click(function() { uifNvoExp(); });
		$( '#search-button' ).click(function() { uifBusCorExp(); });
		$( '#uiAncTra' ).click( function(){ moDivTratamiento(this); } );

		setTimeout( "jsBase.setFoc( 'search-text' )", '100' );
	});
}

function getStrCerrar( strDiv ) {
	return '<a href="javascript:mostrarDiv( false, \'' + strDiv + '\' );" class="btnLT tooltipX" style="display: inline-block;">'
			+ '<span class="icon-cross" style=" color: #000; font-size: 13px;"></span>'
			+ '<span class="tooltipX negrilla" style="width: 75px; top: 25px; left: 50px;">Cerrar</span></a>';
}

function esAmbDesa() {
	var strAmb = jsBase.readCookie( 'amb' );
	if( null == strAmb || strAmb.isEmpty() )
		return false;
	else {
		if( strAmb.toLowerCase() == 'desa' )
			return true;
		return false;
	}
}

function placeHolderInpSrc(x) {
	var o = jsBase.$( 'search-text' );
	if(o) o.setAttribute( 'placeholder', ( (x < 875) ? 'Nombre' : 'Ingrese un nombre' ) );
}

function mainCerrarDivLogIn(){
	placeHolderInpSrc( $(window).width() );

	jsBase.nvoEvt( window, 							'resize', 		function(){ placeHolderInpSrc( $(window).width() ); } );
	jsBase.nvoEvt( jsBase.$( 'uiTxtUsr' ), 			'keyup', 		function(event){ onkeyupLogin( event, true ); } );
	jsBase.nvoEvt( jsBase.$( 'uiTxtPss' ), 			'keyup', 		function(event){ onkeyupLogin( event ); } );
	jsBase.nvoEvt( jsBase.$( 'uiAncLogIn' ),		'click', 		function(){ uifLogin(); } );
	//jsBase.nvoEvt( jsBase.$( 'uiAncSalir' ),		'click', 		function(){ salir( true ); $( '#uiDivLogin' ).hide(); } );
	jsBase.nvoEvt( jsBase.$( 'uiAncSalir' ),		'click', 		function(){ cerrarDivLogIn(); } );
	jsBase.nvoEvt( jsBase.$( 'uiAncInfoUsuario' ),	'click',	function(){ salir( true ); } );

	var o = jsBase.$( 'uiBtnHaOlvidadoSuContrasena' );
	if(o)
		jsBase.nvoEvt( o,	'click',	function(){ location.href = '../contrasena/recuperar.php'; } );

	$( '#uiAncMenuLogin' ).click( function(){ cerrarDivLogIn(); } );
	//$( '#uiAncTra' ).click( function(){ moDivTratamiento(this); } );
	$( '#uiCbVerPss' ).click( function(){ ergInpTypPss( 'uiTxtPss', 'uiLblVerPss' ); } );

	$(document).keyup( function(event){
        if(event.which == 27)
            $( '#uiDivLogin' ).hide();
    });

	//swal( ''+ esAmbDesa() );
	//if( esAmbDesa() ) {
	//	jsBase.setText( 'uiTxtUsr', 'mvelasquez' );
	//	jsBase.setText( 'uiTxtPss', 'admin4321' );
	//}
}

function moDivTratamiento(obj) {
	var strIdAct = jsBase.getTxt( 'uiHdIdExpAct' );

	if(strIdAct.isEmpty()) return;
	jsBase.moPanel( 'uiDivPlanDeTratamiento' + strIdAct, 'block' );

	var objJQ = $(obj);
	if(!objJQ) return;
	if(objJQ.hasClass('uiAncTraAct'))
		objJQ.removeClass('uiAncTraAct');
	else
		objJQ.addClass('uiAncTraAct');

}




function getUiTxt( strTxt, strCookie, flag ) {
	var strU = jsBase.readCookie( strCookie );

	if( true == flag ) return strU;

	if( undefined == strU || null == strU || strU.isEmpty() )
		strU = encodeURIComponent( jsBase.getText( strTxt ) )

	return strU;
}

function uifLogin() {
	if(varGbl.idPagina==varGbl.pagina.inicio.cod) {
		//console.log('inicio!');
		var u = jsBase.readCookie( 'u' ), p = jsBase.readCookie( 'p' );
		if( (undefined==u||null==u) && (undefined==p||null==p) )
			login();
		else
			login(true);
	}
	else if(varGbl.idPagina==varGbl.pagina.recuperar.cod ||
		   varGbl.idPagina==varGbl.pagina.contrasena.cod) {

		var MD5 = new Hashes.MD5;
		var SHA1 = new Hashes.SHA1;

		var usr = getUiTxt( 'uiTxtUsr', 'u', false );
		var pss = getUiTxt( 'uiTxtPss', 'p', false );
		var pssCif = SHA1.hex( MD5.hex(pss) );

		location.href = varGbl.pagina.inicio.url.unPasoAtras
			+ '?idPagina=' + Math.trunc(varGbl.pagina.recuperar.cod) + '&usr=' + usr + '&pss=' + pssCif +'&nocache=' + Math.random() ;
	} else
		location.href = varGbl.pagina.inicio.url.unPasoAtras;
}

function login( flag ) {
try{
	jsBase.mostrarDiv( true, 'loader' );
	var usr = '', pss = '';

	usr = getUiTxt( 'uiTxtUsr', 'u', flag );
	pss = getUiTxt( 'uiTxtPss', 'p', flag );

	if( usr.isEmpty() || pss.isEmpty() ) {
		jsBase.mostrarDiv( true, 'lblAjax' );
		jsBase.mostrarDiv( false, 'loader' );

		jsBase.setText( 'lblAjax', 'Ingrese sus credenciales' );
		setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 5000 );
		jsBase.setFocus( 'uiTxtUsr' );

		return;
	}

	var MD5 = new Hashes.MD5;
	var SHA1 = new Hashes.SHA1;

	var pssCif = (true==flag)?pss:SHA1.hex( MD5.hex(pss) );

	var objAjax		= jsAjax.iniXhr(), objCb = jsBase.$( 'uiCbCs' );
	var checked		= ( null == objCb ) ? true : objCb.checked;
	var parametros 	= 'u=' + usr + '&p=' + pssCif + '&rec=' + checked + '&nocache=' + Math.random();
	//console.log(parametros);

	jsAjax.lda({ 	obj:	objAjax,
				 	url:	varGbl.urlUsr.lgn,
				 	met:	'POST',
				 	qs:		parametros,
				 	est:	null,
				 	fn:		function() {
								jsAjax.jx( objAjax, function() { $login( objAjax, flag ); } )
							}
				});
}catch( ex ){ alert( 'Error interno(jsGen)[login(parms)]: ' + ex.message ); }
}

function $login( objAjax, flag ){
try{
	var objRes = null;
	jsBase.mostrarDiv( false, 'loader' );
	jsBase.setText( 'lblAjax', '' );

	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ) {
			if( objRes.estado == 'ok' ){

				var objTxtUsr = jsBase.$( 'uiTxtUsr' ), uiTxtPss = jsBase.$( 'uiTxtPss' );
				if(objTxtUsr)
					jsBase.setText( objTxtUsr, '' );

				if(uiTxtPss)
					jsBase.setText( uiTxtPss, '' );

				$( '#uiDivLogin' ).hide();
				jsBase.mostrarDiv( true, 'lblAjax' );

				var strBn = 'Bienvenido';

				if( !objRes.resultado.rec ){
					jsBase.eraseCookie( 'u' );
					jsBase.eraseCookie( 'p' );
				} else {
					if( undefined == flag )
						strBn += '. Credenciales guardadas';
					else if ( true == flag )
						strBn += '. Sesi\xf3n recuperada';
					//strBn += ( false == flag ) ? '. Credenciales guardadas' : '. Sesi\xf3n recuperada';

					jsBase.mostrarDiv( true, 'uiDivInfUsr' );
					jsBase.setText( 'uiSpanInfoUsuario', objRes.resultado.u );

					jsBase.createCookie( 'u', objRes.resultado.u, 20 );
					jsBase.createCookie( 'p', objRes.resultado.p, 20 );

					jsBase.cambiarDisplay( jsBase.$( 'uiAncMenuLogin' ), 'none' );
				}
				jsBase.createCookie( 'tok', objRes.resultado.tok, 20 );

				moConfIni( true, objRes.resultado.idcli, objRes.resultado.cli );

				jsBase.setTxt( 'lblAjax', strBn );
				setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 1000 );

				var ind = jsBase.getRandomInt( 0, 4 );
				var colPer = [ 'btnAzulNavy', 'btnGrisTierra', 'btnRosado', 'btnLila', 'btnGrisClaro' ];
				jsBase.addCss( jsBase.$( 'uiAncInfoUsuario' ), colPer[ ind ] );
			}
		} else {
			var strRes = 'errno[' + objRes.error.errno + ']: ' + objRes.error.descripcion + '<br/>q: ' + objRes.error.q;
			strRes = 'Usuario y/o contrase\u00F1a no son correctas';

			jsBase.eraseCookie( 'u' );
			jsBase.eraseCookie( 'p' );
			jsBase.eraseCookie( 'tok' );

			//showDialog( 'Aviso', strRes, 'warning' );

			swal( {
				title: "Credenciales incorrectas",
				text: strRes,
				icon: "error",
				buttons: true,
				buttons: {
					ok: {
						visible: true,
						text:	"Aceptar"
					}
				}
			} );

			jsBase.mostrarDiv( false, 'uiDivInfUsr' );
		}
	}catch( ex1 ){ console.log( 'responseText: ' + objAjax.responseText + '; message:' + ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$login(parms)]: ' + ex.message ); }
}



function moConfIni( flag, idCli, strCli ) {

	$( '#hHeader' ).css( 'padding', '' );

	//ini config mostrar
	jsBase.mostrarDiv( flag, 'divMenuDisAgl' );
	jsBase.mostrarDiv( flag, 'sMain' );
	jsBase.mostrarDiv( false, 'asdAside' );
	jsBase.mostrarDiv( flag, 'miBarraSticky' );

	var objLblCli = jsBase.$( 'uiLblClinica' );
	if( objLblCli )
		jsBase.setText( objLblCli , strCli );

	var objHdIdCli = jsBase.$( 'uiHdIdClinica' );
	if( objHdIdCli )
		jsBase.setText( objHdIdCli , idCli );

	document.title = (flag) ? 'Clinica ' + strCli + '::GT' : 'Clinica::GT';
	//fin config mostrar
}

function setContenidoEditable( flag, listener ){
	$( '.js-contenido-editable' ).each(
		function(){
			var objJQ = $(this);

			if( objJQ.attr( 'tipEleCon' ) ) {
				if( flag ) {
					if( objJQ.attr( 'tipEleCon' ) == 'checkbox' ) {
						//objJQ.removeClass( 'dn' );
						//objJQ.addClass( 'dib' );
						objJQ.show();
					}
				} else {
					if( objJQ.attr( 'tipEleCon' ) == 'checkbox' ) {
						//objJQ.removeClass( 'dib' );
						//objJQ.addClass( 'dn' );
						objJQ.hide();
					}
				}
			} else {
				objJQ.attr( 'contenteditable', flag );
				if( true == flag )
					//setChangeListener( this, function(){ actualizarParListener( this ); } );
					//setChangeListener( this, actualizarParListener );
					setChangeListener( this, listener );
			}
	});
}

function setChangeListener( target, listener ){
	if( listener && target ) {
		var tiempo = 350;
		//jQuery( target ).bind( 'DOMCharacterDataModified', function() { HandleDOM_ChangeWithDelay( target, listener, tiempo ); } );

		//.nvoEvt( target, 'DOMSubtreeModified',	function() { HandleDOM_ChangeWithDelay( target, listener, tiempo ); } );
		//$( target ).on( 'DOMSubtreeModified', function() { HandleDOM_ChangeWithDelay( target, listener, tiempo ); } );

		var observer = new MutationObserver( function( mutations ) {
			mutations.forEach( function( mutation ) {
				HandleDOM_ChangeWithDelay( target, listener, tiempo );
				//mutations[0].target.className
		  	});
		});

		const config = {
		  attributes:			false,
		  attributeOldValue:	false,
		  characterData: 		true,
		  characterDataOldValue:true,
		  childList: 			true,
		  subtree: 				true
		};

		observer.observe( target, config );
		jsBase.nvoEvt( target, 'input', function() { HandleDOM_ChangeWithDelay( target, listener, tiempo ); } );
	}
	//if( !objCont.onpaste ) {
	//	if( listener && objCont )
	//		//jQuery( objCont ).bind( 'DOMSubtreeModified', function(){ HandleDOM_ChangeWithDelay( objCont, function(){ listener( objCont ); } ); } );
	//		//jQuery( objCont ).bind( 'DOMSubtreeModified', function(){ setTimeout( listener, tiempo, objCont ); } );
	//		jQuery( objCont ).bind( 'DOMSubtreeModified', function() { HandleDOM_ChangeWithDelay( objCont, listener, tiempo ); } );
	//}

	//if( !objCont.onpaste ) {
	//	if( listener && objCont ) {
	//		objCont.onpaste = function() { HandleDOM_ChangeWithDelay( objCont, listener, 10 ); }
	//	}
	//}

	//if( !objCont.oncopy ) {
	//	if( listener && objCont )
	//		objCont.oncopy = function() { HandleDOM_ChangeWithDelay( objCont, listener, 10 ); }
	//}

	//if( !objCont.oncut ) {
	//	if( listener && objCont )
	//		objCont.oncut = function() { HandleDOM_ChangeWithDelay( objCont, listener, 10 ); }
	//}

	//if( !objCont.ondelete ) {
	//	if( listener && objCont )
	//		objCont.ondelete = function() { HandleDOM_ChangeWithDelay( objCont, listener, 10 ); }
	//}
}

function HandleDOM_ChangeWithDelay( objCont, listener, tiempo ) {
    if( typeof zGbl_DOM_ChangeTimer == 'number' ) {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer = setTimeout ( listener, tiempo, objCont );
}

//function setChangeListener( objCont, listener, evt ) {
	//.nvoEvt( objCont, 'blur', listener );
	//.nvoEvt( objCont, 'keyup', listener );
	//.nvoEvt( objCont, 'paste', listener );
	//.nvoEvt( objCont, 'copy', listener );
	//.nvoEvt( objCont, 'cut', listener );
	//.nvoEvt( objCont, 'delete', listener );

	//jQuery( objCont ).bind( 'DOMSubtreeModified', listener );
//}

function uifActPar( obj ){
	var objJQ = $( obj );
	var attr1 = objJQ.attr( 'disabled' );
	var attr2 = objJQ.attr( 'readonly' );

	if ( ( typeof attr1 !== typeof undefined && attr1 !== false ) || ( typeof attr2 !== typeof undefined && attr2 !== false ) ) {
	} else
		actPar( objJQ );
}

function actPar( objJQ ){
try{
	jsBase.mosDiv( true, 'lblAjax' );
	jsBase.setTxt( 'lblAjax', 'Guardando' );

	var valor = objJQ.val();

	if( objJQ.attr( 'type' ).toLowerCase() == 'tel' )
		valor = (objJQ.intlTelInput( 'isValidNumber' )) ? '' + objJQ.intlTelInput( 'getNumber' ) : valor;

	var objAjax		= jsAjax.iniXhr();
	var arrPar		= {
    	comn:		'act-enc',
    	tbl:		window.atob( objJQ.attr( 'data-tbl' ) ),
		cam:		window.atob( objJQ.attr( 'data-cam' ) ),
		val:		valor,
		td:			window.atob( objJQ.attr( 'data-td' ) ),
		llave:		window.atob( objJQ.attr( 'data-llave' ) ),
		id:			objJQ.attr( 'data-ihd' ),
    	nocache: 	Math.random()
	};
	//console.log($.param( arrPar ));
	jsAjax.lda({ 	obj:	objAjax,
				 	url:	varGbl.urlExp.grd,
				 	met:	'POST',
				 	qs:		$.param( arrPar ),
				 	est:	null,
				 	fn:		function() {
								jsAjax.jx( objAjax, function() { $actPar( objAjax, arrPar.cam, arrPar.val, objJQ.attr( 'data-ihd' ) ); } )
							}
				});
}catch( ex ){ alert( 'Error interno(jsGen)[actPar(parms)]: ' + ex.message ); }
}

function $actPar( objAjax, campo, val, id ) {
try {
	var objRes = null;
	jsBase.setText( 'lblAjax', '' );
	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ) {
			if( objRes.estado == 'ok' ) {
				jsBase.setText( 'lblAjax', 'Guardado' );
				setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 2000 );

				if( campo && campo.toLowerCase() == 'nombre' ) {
					if( id ) {
						var guid = jsBase.$( 'uiHdGuid' + id ).value;
						jsBase.setTxt( 'tab-' + guid, ( ( val.isEmpty() ) ? guid : val ) );
						jsBase.$( 'uiHdHayCambios' + id ).value = '1';
					}
				}
			}
		} else {
			console.log( ':(' + objAjax.responseText );
			jsBase.setText( 'lblAjax', ':( ' + objAjax.responseText + getStrCerrar( 'lblAjax' ) );
		}
	}catch( ex1 ){ console.log( 'responseText: ' + objAjax.responseText ); console.log( 'ex: ' + ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$actPar(parms)]: ' + ex.message ); }
}

function uifActParTelAgr( obj ){
	uifActParTel( obj, 'ins' );
}

function uifActParTelRem( obj ){
	var objJQ = $(obj);
	if( !objJQ.attr( 'guardado' ) ) {
		objJQ.parent().parent().remove();
		return;
	}

	var attrDis = objJQ.attr( 'disabled' );
	var attrRon = objJQ.attr( 'readonly' );

	if ( ( typeof attrDis !== typeof undefined && attrDis !== false ) || ( typeof attrRon !== typeof undefined && attrRon !== false ) ) {
		return;
	} else {
		swal( {
			text: '\xBFDesea eliminar este tel\xE9fono?',
			icon: 'warning',
			dangerMode: true,
			buttons: {
				cancel: {
					visible: true,
					text: 'No, gracias'
				},
				confirm: {
					visible: true,
					text: 'Sí, deseo eliminarlo!'
				}
			}
		} ).then( ( respuesta ) => {
			if( !respuesta ) return;
			try{
				uifActParTel( obj, 'rem' );
			}catch( ex ){ alert( 'Error interno(jsGen)[uifActParTelRem(parms)]: ' + ex.message ); }
		});
	}
}

function uifActParTel( obj, opr ){
	var objJQ = $( obj );
	var attrDis = objJQ.attr( 'disabled' );
	var attrRon = objJQ.attr( 'readonly' );

	if ( ( typeof attrDis !== typeof undefined && attrDis !== false ) || ( typeof attrRon !== typeof undefined && attrRon !== false ) ) {
		return;
	} else
		actParTel( objJQ, opr );
}

function actParTel( objJQ, opr ){
try{
	jsBase.mosDiv( true, 'lblAjax' );
	jsBase.setTxt( 'lblAjax', 'Guardando' );

	var valor = objJQ.val();

	if( objJQ.attr( 'type' ).toLowerCase() == 'tel' )
		valor = (objJQ.intlTelInput( 'isValidNumber' )) ? '' + objJQ.intlTelInput( 'getNumber' ) : valor;

	var id 		 = objJQ.attr( 'data-ihd' );
	var idencexp = id.substring( 0, id.indexOf( '-' ) );
	var guid	 = id.substring( id.indexOf( '-' ) + 1 );

	var objAjax		= jsAjax.iniXhr();
	var arrPar		= {
    	comn:		 'ins-rem-tag-llave',
		opr:		 opr,
    	tbl:		 window.atob( objJQ.attr( 'data-tbl' ) ),
		idcli:		 _$( 'uiHdIdClinica' ).value,
		idencexp:	 idencexp,

		psellaveenc: window.atob( objJQ.attr( 'data-pse-llave-enc' ) ),
		psellaveval: guid,
		psellavetd:	 window.atob( objJQ.attr( 'data-pse-llave-td' ) ),

		valorenc:	 window.atob( objJQ.attr( 'data-valor-enc' ) ),
		valorval:	 valor,
		valortd:	 window.atob( objJQ.attr( 'data-valor-td' ) ),

    	nocache: 	 Math.random()
	};

	jsAjax.lda({	obj:	objAjax,
					url:	varGbl.urlExp.grd,
					met:	'POST',
					qs:		$.param( arrPar ),
					est:	null,
					fn:		function() {
								jsAjax.jx( objAjax, function() {
									$actParTel( objAjax, arrPar.cam, arrPar.val, objJQ.attr( 'data-ihd' ), opr, objJQ );
								})
							}
				});
}catch( ex ){ alert( 'Error interno(jsGen)[actParTel(parms)]: ' + ex.message ); }
}

function $actParTel( objAjax, campo, val, id, opr, objJQ ) {
try {
	var objRes = null;
	jsBase.setText( 'lblAjax', '' );
	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ) {
			if( objRes.estado == 'ok' ) {
				jsBase.setText( 'lblAjax', 'Guardado' );
				setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 2000 );

				objJQ.attr( 'guardado', 'si' );

				if( opr == 'rem' )
					objJQ.parent().parent().remove();
			}
		} else {
			console.log( ':(' + objAjax.responseText );
			jsBase.setText( 'lblAjax', ':( ' + objAjax.responseText + getStrCerrar( 'lblAjax' ) );
		}
	}catch( ex1 ){ console.log( 'responseText: ' + objAjax.responseText ); console.log( 'ex: ' + ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$actParTel(parms)]: ' + ex.message ); }
}

function uifActParPlanDeTratamiento( obj, setLblAjax ){
	var objJQ = $( obj );
	var attr1 = objJQ.attr( 'disabled' );
	var attr2 = objJQ.attr( 'readonly' );

	if ( ( typeof attr1 !== typeof undefined && attr1 !== false ) || ( typeof attr2 !== typeof undefined && attr2 !== false ) ) {
	} else actParPlanDeTratamiento( objJQ, setLblAjax );
}

function actParPlanDeTratamiento( objJQ, setLblAjax ){
try{
	jsBase.mosDiv( true, 'lblAjax' );
	jsBase.setTxt( 'lblAjax', 'Guardando' );

	if(false==setLblAjax) jsBase.mosDiv( false, 'lblAjax' );

	var td = window.atob( objJQ.attr( 'data-td' ) );
	var val = objJQ.val().toUpperCase();

	if('boolean'==td) val = (objJQ.is(':checked'))?'1':'0';
	else if('date'==td) {
		var str = '';
		if( !val.isEmpty() ) {
			var parts = val.split( '/' );
			var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
			str = mydate.yyyymmdd();
		}
		val = str;
	}

	var objAjax		= jsAjax.iniXhr();
	var arrPar		= {
    	comn:		'act-pln-tr',
		opr:		'ins',
		guid:		objJQ.attr( 'guid' ),
    	tbl:		window.atob( objJQ.attr( 'data-tbl' ) ),
		cam:		window.atob( objJQ.attr( 'data-cam' ) ),
		val:		val,
		td:			td,
		llave:		window.atob( objJQ.attr( 'data-llave' ) ),
		id:			objJQ.attr( 'data-ihd' ),
		pza:		objJQ.attr( 'data-pza' ),
		idusr:		readCookie( 'u' ),
    	nocache: 	Math.random()
	};
	//console.log($.param( arrPar ));
	jsAjax.lda({	obj:	objAjax,
					url:	varGbl.urlExp.grd,
					met:	'POST',
					qs:		$.param( arrPar ),
					est:	null,
					fn:		function() {
								jsAjax.jx( objAjax, function() {
									$actParPlanDeTratamiento( objAjax, arrPar.cam, arrPar.val, objJQ.attr( 'data-ihd' ) );
								})
							}
				});
}catch( ex ){ alert( 'Error interno(jsGen)[actParPlanDeTratamiento(parms)]: ' + ex.message ); }
}

function $actParPlanDeTratamiento( objAjax, campo, val, id ) {
try {
	var objRes = null;
	jsBase.setTxt( 'lblAjax', '' );
	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ) {
			if( objRes.estado == 'ok' ) {
				jsBase.setTxt( 'lblAjax', 'Guardado' );
				setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 2000 );

				if( campo && campo.toLowerCase() == 'nombre' ) {
					if( id ) {
						var guid = jsBase.$( 'uiHdGuid' + id ).value;
						jsBase.setTxt( 'tab-' + guid, ( ( val.isEmpty() ) ? guid : val ) );
						jsBase.$( 'uiHdHayCambios' + id ).value = '1';
					}
				}
			}
		} else {
			console.log( ':(' + objAjax.responseText );
			jsBase.setText( 'lblAjax', ':( ' + objAjax.responseText + getStrCerrar( 'lblAjax' ) );
		}
	}catch( ex1 ){ console.log( 'responseText: ' + objAjax.responseText ); console.log( 'ex: ' + objAjax.responseText ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$actParPlanDeTratamiento(parms)]: ' + ex.message ); }
}

function uifEliFilOdo( obj ){
	var objJQ = $( obj );
	var attr1 = objJQ.attr( 'disabled' );
	var attr2 = objJQ.attr( 'readonly' );

	if ( ( typeof attr1 !== typeof undefined && attr1 !== false ) || ( typeof attr2 !== typeof undefined && attr2 !== false ) ) {
	} else eliFilOdo( objJQ );
}

function eliFilOdo( objJQ ) {
	swal( {
		text: '\xBFDesea eliminar esta pieza?',
		icon: 'warning',
		dangerMode: true,
		buttons: {
			cancel: {
				visible: true,
				text: 'No, gracias'
			},
			confirm: {
				visible: true,
				text: 'Sí, deseo eliminarla!'
			}
		}
	} ).then( ( respuesta ) => {

		if( !respuesta ) return;
		try{
			jsBase.mosDiv( true, 'lblAjax' );
			jsBase.setTxt( 'lblAjax', 'Guardando' );

			var objAjax		= jsAjax.iniXhr();
			var arrPar		= {
				comn:		'act-pln-tr',
				opr:		'rem',
				guid:		objJQ.attr( 'guid' ),
				tbl:		window.atob( objJQ.attr( 'data-tbl' ) ),
				cam:		window.atob( objJQ.attr( 'data-cam' ) ),
				val:		'',
				td:			window.atob( objJQ.attr( 'data-td' ) ),
				llave:		window.atob( objJQ.attr( 'data-llave' ) ),
				id:			objJQ.attr( 'data-ihd' ),
				pza:		objJQ.attr( 'data-pza' ),
				nocache: 	Math.random()
			};
			//console.log($.param( arrPar ));
			jsAjax.lda({	obj:	objAjax,
							url:	varGbl.urlExp.grd,
							met:	'POST',
							qs:		$.param( arrPar ),
							est:	null,
							fn:		function() {
										jsAjax.jx( objAjax, function() {
											$eliFilOdo( objAjax, objJQ );
										})
									}
						});
		}catch( ex ){ alert( 'Error interno(jsGen)[eliFilOdo(parms)]: ' + ex.message ); }
	});
}

function $eliFilOdo( objAjax, objJQ ){
try {
	var objRes = null;
	jsBase.setTxt( 'lblAjax', '' );
	try {
		objRes = JSON.parse( objAjax.responseText );
		if( objRes.error.errno == 0 ) {
			if( objRes.estado == 'ok' ) {

				jsBase.setTxt( 'lblAjax', 'Guardado' );
				setTimeout( "jsBase.mosDiv( false, 'lblAjax' );", 2000 );

				var id = objJQ.attr( 'data-ihd' ) + '-' + objJQ.attr( 'data-pza' ) + '-' + objJQ.attr( 'guid' );
				var strTrId = 'tr' + id;

				$( '#' + strTrId ).remove();
				objJQ.parent().parent().remove();
			}
		} else {
			console.log( ':(' + objAjax.responseText );
			jsBase.setText( 'lblAjax', ':( ' + objAjax.responseText + getStrCerrar( 'lblAjax' ) );
		}
	}catch( ex1 ){ console.log( 'responseText: ' + objAjax.responseText ); console.log( 'ex: ' + ex1.message ); }
}catch( ex ){ alert( 'Error interno(jsGen)[$eliFilOdo(parms)]: ' + ex.message ); }
}


//$(window).load(function(){
//		$(document).ready(function() {
//			var timeoutID;
//			$( '[contenteditable]' ).bind( 'DOMCharacterDataModified', function() {
//				clearTimeout(timeoutID);
//				$that = $(this);
//				timeoutID = setTimeout(function() {
//					$that.trigger('change')
//				}, 50)
//			});
//
//			$('[contentEditable]').bind( 'change', function() {
//				console.log($(this).text());
//				//var obj = $(this);
//				//console.log(obj.text());
//				//console.log( 'idPagina: ' + obj.attr( 'idPagina' ) + '; llave: ' + obj.attr( 'llave' ) + '; valor: ' + obj.text() );
//			})
//		})
//	});
//

function onkeyupLogin( evt, i ){
try{
	evt = evt || window.event;
	var tecla = evt.keyCode || evt.which;
	if( tecla == 13 ){
		if( jsBase.getText( 'uiTxtPss' ).length == 0 && i )
			jsBase.setFoc( 'uiTxtPss' );
		else {
			//login();
			uifLogin();
		}
	}
}catch( ex ){ alert( 'Error interno(jsGen)[onkeyupLogin(parms)]: ' + ex.message ); }
}
*/
