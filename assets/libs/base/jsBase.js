//--- Prototipos

/*Object.prototype.addEvt = function( eve, fun ) {
	if ( 'addEventListener' in window ) {
		this.addEventListener( eve, fun, false );
	} else {
		var thisEvent = 'on' + eve;
		if ( 'attachEvent' in window )
			this.attachEvent( thisEvent, fun );
		else
			this[ thisEvent ] = fun;
	}
}*/

HTMLElement.prototype.dis = function() {
	jsBase.abld( this, true );
	return this;
}

HTMLElement.prototype.ena = function() {
	jsBase.abld( this, false );

	return this;
}

HTMLElement.prototype.on = function( eve, fun ) {

	//eve.split( '[,; ]+' ).forEach( function( item ) {
	var expresionRegular = /[,;\s]+/;
	var evts = eve.split( expresionRegular );
	//console.log(evts);

	//if( evts.length >= 2 )
	//	console.log(evts,this);

	for( var i = 0; i < evts.length; i++ ) {

		var evt = evts[ i ].trim();

		if(evt.isEmpty()) continue;

	    if ( 'addEventListener' in window ) {

			this.addEventListener( evt, fun, false );
			//this.addEventListener( eve, fun, {passive: true} );

		} else {

			var thisEvent = 'on' + evt;

			if ( 'attachEvent' in window )
				this.attachEvent( thisEvent, fun );
			else
				this[ thisEvent ] = fun;
		}
	}
	//});
	
	// if ( 'addEventListener' in window )
	// 	this.addEventListener( eve, fun, false );
	// 	//this.addEventListener( eve, fun, {passive: true} );
	// else {
	// 	var thisEvent = 'on' + eve;
	// 	if ( 'attachEvent' in window )
	// 		this.attachEvent( thisEvent, fun );
	// 	else
	// 		this[ thisEvent ] = fun;
	// }
	return this;
}

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.setCharAt = function(index, chr) {
    var str = this;
    
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
};

String.prototype.bool = function() {
    return jsBase.strToBool(this);
};

String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

String.prototype.priLetMay = function(flg) {
	if( !this.isEmpty() ){
		if(null!=flg&&true==flg)
			return this.charAt(0).toUpperCase() + this.substr(1);
		else
			return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
	}
    return '';
};

String.prototype.priLetMayTod = function() {
    var pieces = this.split( ' ' );
    for ( var i = 0; i < pieces.length; i++ ) {
        var j = pieces[i].charAt(0).toUpperCase();
        pieces[i] = j + pieces[i].substr(1).toLowerCase();
    }
    return pieces.join( ' ' );
};

String.prototype.toStringDateFormatTIS = function( sepSplit, sepJoin ) {
	if( null == sepSplit ) sepSplit = '/';
	if( null == sepJoin ) sepJoin = '-';
	var str = this.split( sepSplit ).reverse().join( sepJoin );
	return str;
};

String.prototype.toStringDateTimeFormatTIS = function( sepSplit, sepJoin ) {
	var x = this.split( ' ' );
	var f = x[ 0 ];
	var t = x[ 1 ];

	var ftis = f.toStringDateFormatTIS( sepSplit, sepJoin );

	var d = new Date( ftis + 'T' + t );
	d.setMinutes( d.getMinutes() - d.getTimezoneOffset() );
	return d.toISOString().slice( 0, 16 );
};

/*Number.prototype.isNaN = Number.isNaN || function(value) {
	return typeof value === "number" && isNaN(value);
};

Number.isNaN = Number.isNaN || function(value) {
	return value !== value;
};*/

Function.prototype.getName = function(){
  // Find zero or more non-paren chars after the function start
  return /function ([^(]*)/.exec( this + '' )[1];
};

Date.prototype.ddmmyyyy = function(separador) {
	var sep = (separador)?separador:'/';
	var yyyy = this.getFullYear().toString();                                    
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
	var dd  = this.getDate().toString();

	return (dd[1]?dd:"0"+dd[0]) + sep + (mm[1]?mm:"0"+mm[0]) + sep + yyyy;
};

Date.prototype.yyyymmdd = function( separador ) {
	var sep = (separador)?separador:'/';
	var yyyy = this.getFullYear().toString();                                    
	var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based         
	var dd  = this.getDate().toString();             

	return yyyy + sep + (mm[1]?mm:"0"+mm[0]) + sep + (dd[1]?dd:"0"+dd[0]);
};

Date.prototype.formatoEspanol = function( conHora, separador ) {
	var meses = [ 'vac', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ];
	var yyyy = this.getFullYear();
	var mm = (this.getMonth()+1); // getMonth() is zero-based         
	var dd  = this.getDate().toString();

	var hoy = new Date();
	var strYYYY = ( yyyy == hoy.getFullYear() )? '':' de ' + yyyy.toString();
	var sep = (undefined!==separador)?separador:' '; //' de '
	var strFec = (dd[1]?dd:"0"+dd[0]) + sep + meses[ mm ] + strYYYY;
	var strHora = ' a las ' + this.getHours().toString() + ':' + this.getMinutes().toString();

	return (true===conHora)?strFec + strHora:strFec;
};


if( !Array.prototype.getIds ) {
	Array.prototype.getIds = function() {
		
		var tmp = [];
		
		if( this.forEach ) {
			this.forEach( function(element) {
				
				if( null != element.id )
					tmp.push( element.id );

				if( null != element.input && null != element.input.id )
					tmp.push( element.input.id );
			});
		}

		return tmp;
	}
}

//---Globales
var strProcesando = '<label style="color: #FFF; background-color: #CC4444; font-family: Arial; font-size: 11px; padding: 1px 5px; margin: 5px;">Cargando</label>';
var ie = document.all?1:0;
var ieVersion=/*@cc_on function(){ switch(@_jscript_version){ case 1.0:return 3; case 3.0:return 4; case 5.0:return 5; case 5.1:return 5; case 5.5:return 5.5; case 5.6:return 6; case 5.7:return 7; case 5.8:return 8; }}()||@*/0;
if( /MSIE 6.0/i.test( navigator.userAgent ) ){ ieVersion = 6; }

//'/carritoCompra/v1.0/public'

var varGbl = {
	idPagina:			0,
	pagina:				{
							login:			{
												cod:	1,
												nom:	'login.php',
												url:	{
															base:			'/html/login/login.php',
															unPasoAtras:	'../login/login.php'
														}
											},
							inicio:			{
												cod:	2,
												nom:	'inicio.php',
												url:	{
															base:			'/html/inicio/inicio.php',
															unPasoAtras:	'../inicio/inicio.php'
														}
											},
							recuperar:		{
												cod:	3.1,
												nom:	'recuperar.php',
												url:	{
															base:			'/html/contrasena/recuperar.php',
															unPasoAtras:	'../contrasena/recuperar.php'
														}
											},
							contrasena:		{
												cod:	3.2,
												nom:	'contrasena.php',
												url:	{
															base:			'/html/contrasena/contrasena.php',
															unPasoAtras:	'../contrasena/contrasena.php'
														}
											},

							controlador:	{
												cod:	0.1,
												nom:	'Controllers',

												contactanos: {
															enviar_email:	 'contactanos/enviar-email'
														},

												cuenta:	{
															validar_email:	 'cuenta/validar-email'
															, guardar_tel:	 'cuenta/guardar-tel'
														},

												expediente:	{
															buscar:	 		'expediente/buscar'
															, cargar: 		'expediente/cargar'
															, ins_enc: 		'expediente/insertar-encabezado'
															, act_enc: 		'expediente/actualizar-encabezado'
															, eli_enc: 		'expediente/eliminar-encabezado'
														},

												tabla: {
															cargar: 			'tabla/cargar'
															, carga_personalizada:
																				'tabla/carga-personalizada'
															, insTag:  			'tabla/ins-tag'
															, insRemTag:  		'tabla/ins-rem-tag'
															, insRemTagLlave: 	'tabla/ins-rem-tag-llave'
															, eliminar: 		'tabla/eliminar'
															, eliminarJ: 		'tabla/eliminar-j'
														},

												plan_tratamiento: {
															ins:  		'plan-tratamiento/ins'
															, rem:  	'plan-tratamiento/rem'
														},

												formulario: {
															mostrar: 	'formulario/mostrar'
														},

												endodoncia: {
															index: 		'endodoncia/endodoncia/index'
															, nuevo: 	'endodoncia/endodoncia/nuevo'
															, mostrar: 	'endodoncia/endodoncia/mostrar'
														}
											},

							vistas:			{
												cod:	0.3,
												nom:	'Views',
												url:	{
															base:			'/App/Views/base/',
															unPasoAtras:	'../App/Views/base/'
														}
											}
						},
	urlExp:         	{
							grd:          	'../../php/guardar/psGuardarExp.php', 
							lee:    		'../../php/select/psExp.php'
						},
	urlSlct:         	{
							lee:    		'../../php/select/psTabla.php'
						},
	urlUsr:         	{
							lgn:    		'../../php/login/psValidarUsuario.php'
						}
};
	
var deviceAgent = navigator.userAgent.toLowerCase();

var isTouchDevice = ('ontouchstart' in document.documentElement) || 
(deviceAgent.match(/(iphone|ipod|ipad)/) ||
deviceAgent.match(/(android)/)  || 
deviceAgent.match(/(iemobile)/) || 
deviceAgent.match(/iphone/i) || 
deviceAgent.match(/ipad/i) || 
deviceAgent.match(/ipod/i) || 
deviceAgent.match(/blackberry/i) || 
deviceAgent.match(/bada/i));

var jsBase = function () {
	
	var fn = {};

	fn.init = function() {
	};

	//--- moviles
	fn.initScrollIrHaciaArriba = function( objPar ) {

		//window.onscroll = function(){ jsBase.scrollIrHaciaArriba( objPar ) };

		jsBase.nvoEvt( window, 'scroll', function(){
			jsBase.scrollIrHaciaArriba( objPar );			
		});

		var objBtnTop = jsBase.$( objPar.id );

		if( objBtnTop ) {

		    objBtnTop.on( 'click', function(evt) {

		        var e = evt || window.event;
		        
		        if( !e.defaultPrevented ) {
		            // Para Safari
		            document.body.scrollTop = 0;

		            // Para Chrome, Firefox, IE y Opera
		            document.documentElement.scrollTop = 0; 
		        }
		    });
		    
		}
	};

	fn.initScrollIrHaciaAbajo = function( objPar ) {

		//window.onscroll = function(){ jsBase.scrollIrHaciaAbajo( objPar ) };

		jsBase.nvoEvt( window, 'scroll', function(){
			jsBase.scrollIrHaciaAbajo( objPar );
		});

		var objBtnTop = jsBase.$( objPar.id );

		if( objBtnTop ) {

		    objBtnTop.on( 'click', function(evt) {

		        var e = evt || window.event;
		        
		        if( !e.defaultPrevented ) {
		            // Para Safari
		            window.scrollTo( 0, document.body.scrollHeight );

		            // Para Chrome, Firefox, IE y Opera
		            window.scrollTo( 0, document.documentElement.scrollHeight );
		        }
		    });
		    
		}
	};

	//--- web
	fn.param = function( object ) {
	    var encodedString = '';
	    for( var prop in object ) {
	        if( object.hasOwnProperty( prop ) ) {
	            if( encodedString.length > 0 ) {
	                encodedString += '&';
	            }
	            encodedString += encodeURI(prop + '=' + object[prop]);
	        }
	    }
	    return encodedString;
	};

	fn.fixedEncodeURIComponent = function( str ) {
	  	return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
	    	return '%' + c.charCodeAt(0).toString(16);
	  	});
	}

	//--- Elementales

	fn.$ = function( strObj ) {

		if( (typeof strObj === 'string' || strObj instanceof String) )
			return document.getElementById(strObj);

		return strObj;
	}
	
	fn.getParameterByName = function( url, name, flg ) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, '\\$&');
		
		var strIni = null, strIniTmp = '[?&]';
		
		if(undefined==flg||null==flg) {
			strIni = strIniTmp;
		} else {
			if(true==flg) {
				strIni = '';
				url = url.replace(/\"/g,'');
			} else if(false==flg)
				strIni = strIniTmp;
		}
		
		var regex = new RegExp( strIni + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' ').trim());
	}

	fn.noExisto = function( str$obj ) {
		//var obj = (typeof str$obj === 'string' || str$obj instanceof String) ? this.$( str$obj ) : str$obj;
		alert( "Componente no existe: '" + str$obj + "'" );
	}

	fn.prevenirEvtClic = function( e ) {
		e.preventDefault(); // Cancel the native event
		e.stopPropagation();
	}

	fn.disabl = function( uiHtml, flag ) {
		this.disabled( uiHtml, flag );
	}

	fn.abld = function( uiHtml, flag ) {
		var obj = (typeof uiHtml === 'string' || uiHtml instanceof String) ? this.$( uiHtml ) : uiHtml;
		
		if( !obj ) return null;

		if( obj.tagName.toLowerCase() == 'a' ) {
			if( flag ) {
				if( obj.onclick )
					obj.setAttribute( 'onclick-tmp', obj.onclick.getName() );

				obj.setAttribute( 'href-tmp', obj.getAttribute( 'href' ) );
				obj.setAttribute( 'onclick', 'return false;' );
				obj.setAttribute( 'href', 'javascript: void(0);' );

				//nuevoEvento( campos[ i ], 'click', prevenirEvtClic );
			} else {
				//this[ campos[ i ].getAttribute( 'onclick-tmp' ) ]();
				//removerEvento( campos[ i ], 'click', prevenirEvtClic );

				obj.onclick = eval( obj.getAttribute( 'onclick-tmp' ) );
				if(null==obj.getAttribute( 'href-tmp' )||undefined==obj.getAttribute( 'href-tmp' ))
					obj.setAttribute( 'href', 'javascript:;' );
				else
					obj.setAttribute( 'href', obj.getAttribute( 'href-tmp' ) );

				obj.removeAttribute( 'onclick-tmp' );
				obj.removeAttribute( 'href-tmp' );
			}
		}
			
		if( flag ) {
			obj.setAttribute( 'disabled', flag );
			obj.setAttribute( 'readonly', flag );
		} else {
			obj.removeAttribute( 'disabled' );
			obj.removeAttribute( 'readonly' );
		}

		return obj;
	}

	fn.disabled = function( uiHtml, flag ) {
		var obj = (typeof uiHtml === 'string' || uiHtml instanceof String) ? this.$( uiHtml ) : uiHtml;
		var strId = '';
		if( !obj ) return strId;

		var campos = obj.getElementsByTagName( '*' );

		for(var i = 0; i < campos.length; i++) {
			if( campos[ i ].tagName.toLowerCase() == 'a' ) {
				if( flag ) {
					if( campos[ i ].onclick )
						campos[ i ].setAttribute( 'onclick-tmp', campos[ i ].onclick.getName() );

					campos[ i ].setAttribute( 'href-tmp', campos[ i ].getAttribute( 'href' ) );
					campos[ i ].setAttribute( 'onclick', 'return false;' );
					campos[ i ].setAttribute( 'href', 'javascript: void(0);' );

					//nuevoEvento( campos[ i ], 'click', prevenirEvtClic );
				} else {
					//this[ campos[ i ].getAttribute( 'onclick-tmp' ) ]();
					//removerEvento( campos[ i ], 'click', prevenirEvtClic );

					campos[ i ].onclick = eval( campos[ i ].getAttribute( 'onclick-tmp' ) );
					if(null==campos[ i ].getAttribute( 'href-tmp' )||undefined==campos[ i ].getAttribute( 'href-tmp' ))
						campos[ i ].setAttribute( 'href', 'javascript:;' );
					else
						campos[ i ].setAttribute( 'href', campos[ i ].getAttribute( 'href-tmp' ) );
					campos[ i ].removeAttribute( 'onclick-tmp' );
					campos[ i ].removeAttribute( 'href-tmp' );
				}
			}

			//if( campos[ i ].hasAttribute( 'disabled' ) )
			//    campos[ i ].disabled = flag;
			//else
			if( flag )
				campos[ i ].setAttribute( 'disabled', flag );
			else
				campos[ i ].removeAttribute( 'disabled' );

			//if( campos[ i ].hasAttribute( 'readonly' ) )
			//    campos[ i ].readOnly = flag;
			//else
			if( flag )
				campos[ i ].setAttribute( 'readonly', flag );
			else
				campos[ i ].removeAttribute( 'readonly' );

			strId += ';' + ( null == campos[ i ] || undefined == campos[ i ].id ) ? '{empty}' : campos[ i ].id ; 
		}
		return strId;
	}

	fn.limpia = function( uiHtml, strAttr ) {
		var obj = (typeof uiHtml === 'string' || uiHtml instanceof String) ? this.$( uiHtml ) : uiHtml;
		var strId = '';
		if( !obj ) return strId;

		var campos = obj.getElementsByTagName( '*' );

		for(var i = 0; i < campos.length; i++) {
			switch( campos[ i ].tagName.toLowerCase() ) {

				case 'input':

					switch( campos[ i ].type.toLowerCase() ) {
						case 'date':
							campos[ i ].valueAsDate = null;
							break;
						case 'button': break;
						default:
							campos[ i ].value = ''; break;	
					};
					break;

				case 'textarea':
					campos[ i ].value = '';
					break;

				case 'div' : case 'span': case 'label':

					if( strAttr ) {
						if( campos[ i ].hasAttribute( strAttr ) )
							campos[ i ].innerHTML = '';
					}
					else
						campos[ i ].innerHTML = '';

					break;
				default:
					break;
			};

			strId += ';' + ( null == campos[ i ] || undefined == campos[ i ].id ) ? '{empty}' : campos[ i ].id ; 
		}
		return strId;
	}

	fn.foc = function( id ) {
	    var inputField = this.$( id );
	    if (inputField != null && inputField.value.length != 0){
	        if (inputField.createTextRange){
	            var FieldRange = inputField.createTextRange();
	            FieldRange.moveStart('character',inputField.value.length);
	            FieldRange.collapse();
	            FieldRange.select();
	        }else if (inputField.selectionStart || inputField.selectionStart == '0') {
	            var elemLen = inputField.value.length;
	            inputField.selectionStart = elemLen;
	            inputField.selectionEnd = elemLen;
	            inputField.focus();
	        }
	    }else{
	        inputField.focus();
	    }
	}

	fn.setFoc = function( strObj, flagCursorAlFinal ) {
		this.setFocus( strObj, flagCursorAlFinal );
	}

	fn.setFocus = function( strObj, flagCursorAlFinal ) {
		var obj = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;
		if(!obj) return;
		try
		{
			obj.focus();

			if(flagCursorAlFinal) {
				var strVal = obj.value; //store the value of the element
				obj.value = ''; //clear the value of the element
				obj.value = strVal;
			}
		}catch( ex0 ){ alert( "Error interno(jsBase)[setFocus( " + strObj + " )]: " + ex0.message ); }
	}

	fn.colocarTitle = function( strObj, strTexto ){
	try{
		var obj = this.$( strObj );
		if( obj )
			obj.title = strTexto;
		else
			alert( 'Error interno(jsBase)[colocarTitle(parms)]: No existe el objeto "' + strObj + '"' );
	}catch( ex ){ alert( 'Error interno(jsBase)[colocarTitle(parms)]: ' + ex.message ); }
	}

	fn.colocarClass = function( strObj, clase ) {
	try{
		var obj = this.$( strObj );
		if( obj ) 
			obj.className = clase;
		else
			alert( 'Error interno(jsBase)[colocarClass(parms)]: No existe el objeto "' + strObj + '"' );
	}catch( ex ){ alert( 'Error interno(jsBase)[colocarClass(parms)]: ' + ex.message ); }
	}

	fn.colocarAtributo = function( strObj, atributo, valor ) {
	try{
		var obj = this.$( strObj );
		if( obj )
			obj.setAttribute( atributo, valor );
		else
			alert( 'Error interno(jsBase)[colocarAtributo(parms)]: No existe el objeto "' + strObj + '"' );
	}catch( ex ){ alert( 'Error interno(jsBase)[colocarAtributo(parms)]: ' + ex.message ); }
	}

	//--- Funciones is
	fn.isBlank = function( str ) {
		return (!str || /^\s*$/.test(str));
	}

	fn.isEmpty = function( str ) {
		return (!str || 0 === str.length);
	}
	
	fn.isJQuery = function( obj ){
		// Each jquery object has a "jquery" attribute that contains the version of the lib.
		return typeof obj === 'object' && obj && obj[ 'jquery' ];
	}
	
	fn.esNumTel = function( evt ){
		var e = evt || window.event;
		var key = e.keyCode || e.which;
		var ch = String.fromCharCode(e.which);

		if(!(/^\+?(\d|[\#]|[\*])*$/.test(ch))){
			if (e.cancelable) {
				e.preventDefault();
				//console.log( 'e.preventDefault: cancelable' );
				return false;
			}
			return false;
		}
		return true;
	}

	fn.esMovil = function() {
	    const toMatch = [
	        /Android/i,
	        /webOS/i,
	        /iPhone/i,
	        /iPad/i,
	        /iPod/i,
	        /BlackBerry/i,
	        /Windows Phone/i
	    ];

	    return toMatch.some( (toMatchItem) => {
	        return navigator.userAgent.match( toMatchItem );
	    });
	};

	//--- Validaciones
	//ejemplo de uso
	//obj.onkeypress = function(){ return jsBase.validaSoloNumeros2(event); };

	fn.validaSoloNumeros = function( cadena ){
		var patron = /^\d*$/;
		if(!cadena.search(patron))
		  return true;
		return false;
	};

	fn.validaSoloNumeros2 = function( evt ) {

		var e = evt || window.event;
		var key = e.keyCode || e.which;

		//console.log(e);
		console.log( 'key: "' + key + '"' );
		if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
		// numbers   
		key >= 48 && key <= 57 ||
		// Numeric keypad
		key >= 96 && key <= 105 ||
		// Backspace and Tab and Enter
		key == 8 || key == 9 || key == 13 ||
		// Home and End
		key == 35 || key == 36 ||
		// left and right arrows
		key == 37 || key == 39 ||
		// Del and Ins
		key == 46 || key == 45) {
			//console.log('Pad numerico (tel): input es valido');
			return true;
		}
		else {
			// input is INVALID
			console.log('Pad numerico (tel): input es incorrecto');
			e.returnValue = false;
			if (e.cancelable) e.preventDefault();
			return false;
		}
		return false;
	};

	fn.validaSoloNumeros_KeyDown = function( evt ) {

		var e = evt || window.event;
		var key = e.keyCode || e.which;

		var arrowsKeyCodes = [37, 38, 39, 40];
	    var numPadNumberKeyCodes = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
	    var dots = [110, 190];
	    var tabBackDel = [8, 9, 46];
	    var acv = [65, 67, 86];

	    //console.log( 'key: "' + key + '"' );

	    // Allow only one dot.
	    if (e.target.value.indexOf('.') !== -1 && dots.indexOf(e.keyCode) !== -1) {
	        e.returnValue = false;
			if (e.cancelable) e.preventDefault();
			return false;
	    }

	    // allow only [0-9] number, numpad number, arrow,  BackSpace, Tab, Del
	    // Ctrl + C, Ctrl + V, Ctrl + A
	    if (
	        (e.keyCode < 48 &&
	            arrowsKeyCodes.indexOf(e.keyCode) === -1 || e.keyCode > 57 &&
	            numPadNumberKeyCodes.indexOf(e.keyCode) === -1 &&
	            dots.indexOf(e.keyCode) === -1
	        ) &&
	        tabBackDel.indexOf(e.keyCode) === -1 &&
	        (e.ctrlKey === false || e.ctrlKey === true && acv.indexOf(e.keyCode) === -1)
	    ) {
	        e.returnValue = false;
			if (e.cancelable) e.preventDefault();
			return false;
	    }

	    return true;
	};

	fn.validaNumTelV1_Paste = function( evt, er ) {

		var e = evt || window.event;
		var key = e.keyCode || e.which;
		var val = e.clipboardData.getData( 'text/plain' ); //e.target.value;

		er = (er)?er:/[^0-9+-]/g;
		
		var erTel	= /^[\+]?\d{2,}?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im;

  		var digits	= val.replace( er, '' );
  		var flg 	= erTel.test(digits);
  		
		if( flg )
			return true;
		else {
			e.returnValue = false;
			if (e.cancelable) e.preventDefault();
			return false;
		}
	};

	fn.validaSoloTexto = function( cadena ) {
		var patron = /^[a-zA-Z]*$/;
		// En caso de querer validar cadenas con espacios usar: /^[a-zA-Z\s]*$/
		if(!cadena.search(patron))
			return true;
		return false;
	};

	fn.validaEmailV0 = function( mail ) { 
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    		return true;
    	//console.log('email no valido');
    	return false;
	};
	
	//--- Texto
	fn.strToBool = function( s ) {
		// will match one and only one of the string 'true','1', or 'on' rerardless
		// of capitalization and regardless off surrounding white-space.
		regex=/^\s*(true|1|on)\s*$/i

		return regex.test(s);
	}

	fn.numToStr = function( num ) {
		
		if(undefined==num||null==num) return '';
		
		var strNum = num.toString();
		
		if(strNum.isEmpty())
			return '';
		
		var x = parseFloat(num);
		
		if(typeof x === "number" && !isNaN(x))
			return x.toString();

		return '';
	}
	
	fn.setTxt = function( strObj, strMsj ) {
		this.setText( strObj, strMsj );
	}

	fn.setText = function( strObj, strMsj ) {
		var tagName = 'ui-desconocido';
		var flg = false;
		var obj = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;
		
		if( !obj ){ console.log( 'No puedo hacer setText sobre "' + strObj + '"' ); return false; }
		
		if(obj.tagName)
			tagName = obj.tagName.toLowerCase();

		if( !obj ) return false;

		if( tagName === 'div' || tagName === 'span' || tagName === 'label' ) {
			obj.innerHTML = strMsj; flg = true;
		} else if( tagName === 'input' || tagName === 'textarea' ) {
			obj.value = strMsj; flg = true;
		} else {
			flg = false;
			console.log( 'Aviso interno(jsBase)[setText(parms: { strObj: "' + strObj + '", strMsj: "' + strMsj + '" } ) ]: tagName "' + tagName + '" no reconocido.' );
		}

		return flg;
	}

	fn.getTxt = function( strObj ) {
		return this.getText(strObj);
	}

	fn.getText = function( strObj ) {
		var strMsj = '';
		var obj = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;

		if( null == obj ) { 
			if( typeof strObj === 'string' )
				console.log( 'Error en getTxt/getTxt: ' + strObj ); 
			
			return undefined; 
		}

		var tagName = obj.tagName.toLowerCase();

		if( tagName === 'div' || tagName === 'span' || tagName === 'label' )
			strMsj = obj.innerHTML;
		else if( tagName === 'input' )
			strMsj = obj.value;
		else
			strMsj = obj.value;

		return strMsj;
	}

	//--- Mostrar/Ocultar
	//fn.mosDiv = function( strNombre, strDisplay ) {
	fn.mosDiv = function( flg, strNombre ) {
		//alert( 'Revisar fn mosDiv' );
		//console.log( 'Revisar fn mosDiv' );
		this.mostrarDiv( flg, strNombre );
	}

	fn.moPanel = function( strNombre, strDisplay, flg ){
		var obj = this.$( strNombre );
		if( !obj ) return;
		
		var strTmpDis = ( obj.style.display.indexOf( 'none' ) >= 0 ) ? strDisplay : 'none';
		//console.log('className[' + obj.id + ']:'+obj.className);
		
		if(undefined==flg||null==flg){
			obj.style.display = strTmpDis;
			return strTmpDis;
		}
		else if(true==flg||false==flg) {
			if(true==flg&&obj.style.display.isEmpty()) strTmpDis = strDisplay;
			obj.style.setProperty( 'display', strTmpDis, 'important' );
			return strTmpDis;
		}
	}

	fn.cambiarDisplay = function( strObj, strDisplay ) {
		var obj = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;
		if(!obj) return;

		obj.style.display = strDisplay;
	}

	fn.cambiarVisibility = function( strObj, strVisibility ) {
		var obj = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;
		if(!obj) return;

		obj.style.visibility = strVisibility;
	}

	fn.mostrarDiv = function(flag, strDiv, strCss ) {
		var obj = this.$( strDiv );

		if( typeof this.addCss === 'function' && strCss !== undefined ) {
			if( obj ) {
				if( flag )
					this.addCss( obj, strCss );
				else
					this.remCss( obj, strCss );
					//addCss( obj, strCss );
			}
		} else {
			if( obj )
				obj.style.display = ( flag ) ? 'block' : 'none';
		}
	}

	//--- Eventos
	fn.nvoEvt = function( elemento, evento, funcion ) {
	try{
		if ( elemento.addEventListener )
			elemento.addEventListener( evento, funcion, false );
		else if( elemento.attachEvent )
			elemento.attachEvent( 'on' + evento, funcion );
	}catch( ex ){ alert( 'Error interno(jsBase)[nuevoEvento(parms)]: ' + ex.message ); }
	}

	fn.removerEvento = function( elemento, evento, funcion ) {
	try{
		if ( elemento.removeEventListener )
			elemento.removeEventListener( evento, funcion, false );
		else if( elemento.detachEvent )
			elemento.detachEvent( 'on' + evento, funcion );
	}catch( ex ){ alert( 'Error interno(jsBase)[removerEvento(parms)]: ' + ex.message ); }
	}

	fn.agregarEvento = function( elemento, evento, funcion ){
		try{
			if ( elemento.addEventListener )
				elemento.addEventListener( evento, funcion, false );
			else
				elemento.attachEvent( 'on' + evento, funcion );
		}catch( ex ){ alert( 'Error interno(js)[agregarEvento(parms)]: ' + ex.message ); }
	}

	//--- Select
	/*fn.optionSel = function( strSelect, flagText ){
	try{
		var objSelect = document.getElementById( strSelect );
		if( objSelect )
		{
			if( undefined == flagText || false == flagText )
				return objSelect.options[ objSelect.options.selectedIndex ].value;
			else
				return objSelect.options[ objSelect.options.selectedIndex ].text;
		}
		else return null;
	}catch( ex ){ alert( 'Error interno(jsBase)[optionSel(parms)]: ' + ex.message ); }
	}*/

	fn.optionSel = function( strSelect, flagText, atributo ){
	try{
		//var objSelect = document.getElementById( strSelect );
		var objSelect = (typeof strSelect === 'string' || strSelect instanceof String) ? this.$(strSelect) : strSelect;
		if( objSelect ) {
			if( undefined == atributo ) {
				if( undefined == flagText || false == flagText )
					return objSelect.options[ objSelect.options.selectedIndex ].value;
				else
					return objSelect.options[ objSelect.options.selectedIndex ].text;
			} else {
				return objSelect.options[ objSelect.options.selectedIndex ].getAttribute( atributo );
			}
		}
		else return null;
	}catch( ex ){ alert( 'Error interno(jsBase)[optionSel(parms)]: ' + ex.message ); }
	}

	fn.selOption = function( strSelect, indice, disabled ){
	try{
		//var objSelect = document.getElementById( strSelect );
		var objSelect = (typeof strSelect === 'string' || strSelect instanceof String) ? this.$(strSelect) : strSelect;
		if( objSelect ){
			try{
				objSelect.options[ indice ].selected = true;
				if( disabled != undefined )
					objSelect.disabled = disabled;
				return true;
			}catch( ex1 ){ return false; }
		}
		return false;
	}catch( ex ){ alert( 'Error interno(jsBase)[selOption(parms)]: ' + ex.message ); }
	}

	fn.selOptionPorValue = function( strSelect, value, disabled ){
	try{
		//var objSelect = document.getElementById( strSelect )
		var flag = false;
		var objSelect = (typeof strSelect === 'string' || strSelect instanceof String) ? this.$(strSelect) : strSelect;
		if( objSelect ){
			try{
				var tam = objSelect.length;
				for( var i = 0; i < tam; i++ ){
					if( objSelect.options[ i ].value == value ){
						objSelect.options[ i ].selected = flag = true;
						break;
					}
				}

				if( disabled != undefined )
					objSelect.disabled = disabled;
				return flag;
			}catch( ex1 ){ return false; }
		}
		return false;
	}catch( ex ){ alert( 'Error interno(jsBase)[selOptionPorValue(parms)]: ' + ex.message ); }
	}

	fn.addItem = function( strSlct, Text, Value, flag ) {
		var opt = document.createElement( 'option' );
		document.getElementById( strSlct ).options.add(opt);
		opt.text = Text;
		opt.value = Value;
		if( flag ) opt.selected = true;
	}

	//--- Cookies        
	fn.createCookie = function( name, value, days ) {
		var expires = null;

		if( days ) {
			var date = new Date();
			date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
			expires = "; expires=" + date.toGMTString();
		} else 
			expires = "";

		document.cookie = name + "=" + value + expires + "; path=/";
	}

	fn.readCookie = function( name ){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	fn.eraseCookie = function( name ) {
		this.createCookie (name, "", -1 );
	}

	//--- Css

	fn.hasClass = function (strObj, className) {
		var element = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;
    	return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
	}

	fn.setCss = function(strObj, strClass) {
		var obj = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;
		obj.className = strClass;
	}

	fn.addCss = function( strObj, classToAdd ) {
		var element = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;
		var currentClassValue = element.className;

		if( currentClassValue.indexOf( classToAdd ) == -1 ) {

			if( ( currentClassValue == null ) || ( currentClassValue === '' ) )
				element.className = classToAdd;
			else
				element.className += ' ' + classToAdd;
		}
	}

	fn.remCss = function( strObj, classToRemove ) {
		var element = (typeof strObj === 'string' || strObj instanceof String) ? this.$(strObj) : strObj;

		var currentClassValue = element.className;

		if( currentClassValue == classToRemove ) {
			element.className = '';
			return;
		}

		var classValues = currentClassValue.split( ' ' );
		var filteredList = [];

		for( var i = 0 ; i < classValues.length; i++ )
			if( classToRemove != classValues[ i ] )
				filteredList.push( classValues[ i ] );

		element.className = filteredList.join( ' ' );
	}

	//--- Animación
	var TimeToSlide = 250.0;
	var ContentHeight = 200;

	fn.cortina = function( strBtn, strDiv, alto, strImg, srcExpandir, srcContraer, fn ) {
	try{
		var div = this.$( strDiv ), btn = this.$( strBtn );
		if( !div ){
			alert( 'Lo lamentamos, no es posible desplegar la animaci\xf3n' );
			return;
		}
		var idAbierto = '', idCerrado = strDiv, flag = ( div.style.display == 'block' || div.style.display == 'inline' ) ? false : true;
		if( flag ){
			idAbierto	= idCerrado;
			idCerrado	= '';
		}
		if( btn ){
			if( flag )
				btn.className += ' divBotonToogleL';
			else
				btn.className = btn.className.replace( 'divBotonToogleL', '' );
		}
		setTimeout( "animate(" + new Date().getTime() + "," + TimeToSlide + ",'" + idCerrado + "', '" + idAbierto + "', " + alto + " )", 33 );

		if( !btn ) return;

		if( srcExpandir == undefined || srcContraer == undefined );
			//return;
		var src = ( flag )?srcContraer:srcExpandir;

		if( !cambiarImg( strImg, src ) ){
			//var flarr = ie ? '&nbsp;<font style="font-size: 8px" face=webdings>6</font>' : '&nbsp;&#x25BE;';
			//var flabj = ie ? '&nbsp;<font style="font-size: 8px" face=webdings>5</font>' : '&nbsp;&#x25B4;';
			//var flarr	= ie ? '&nbsp;<font style="font-size: 8px" face=webdings>6</font>':'&nbsp;<font style="font-size: 8px" face="webdings">6</font>';
			//var flabj	= ie ? '&nbsp;<font style="font-size: 8px" face=webdings>5</font>':'&nbsp;<font style="font-size: 8px" face="webdings">5</font>';
			var flarr	= ie ? '&nbsp;<font style="font-size: 8px" face=webdings>6</font>':'&#x25be;';
			var flabj	= ie ? '&nbsp;<font style="font-size: 8px" face=webdings>5</font>':'&#x25b4;';
			var ii		= btn.innerHTML;

			if( flag ){
				if( btn.innerHTML.toLowerCase().indexOf( flarr ) >= 0 )
					btn.innerHTML = ii.charAt( 0 ) + btn.innerHTML.toLowerCase().replace( flarr, flabj ).substring( 1 );
				else{
					if( ie )
						btn.innerHTML = ii + flabj;
					else
						btn.innerHTML = ii.substring( 0, ii.length - 1 ) + flabj;

				}
			}
			else{
				if( btn.innerHTML.toLowerCase().indexOf( flabj ) >= 0 )
					btn.innerHTML = ii.charAt( 0 ) + btn.innerHTML.toLowerCase().replace( flabj, flarr ).substring( 1 );
				else{
					if( ie )
						btn.innerHTML = ii + flarr;
					else
						btn.innerHTML = ii.substring( 0, ii.length - 1 ) + flarr;
				}
			}
		}
		if( fn ){
			if( flag )
				fn();
		}
	}catch( ex ){ alert( 'Error interno(jsBase)[cortina(parms)]: ' + ex.message ); }
	}

	fn.animate = function( lastTick, timeLeft, closingId, openingId, alto ){
	try{
		var alto = (alto)?alto:ContentHeight;
		var curTick = new Date().getTime();
		var elapsedTicks = curTick - lastTick;
		var opening = (openingId == '') ? null : document.getElementById( openingId );
		var closing = (closingId == '') ? null : document.getElementById( closingId );

		if(timeLeft <= elapsedTicks){
			if(opening != null)
			{
				opening.style.height = alto + 'px';

				if( alto >= 1500 )
					opening.style.height = 'auto';
			}

			if(closing != null){
				closing.style.display = 'none';
				closing.style.height = '0px';
			}
			return;
		}

		timeLeft -= elapsedTicks;
		var newClosedHeight = Math.round((timeLeft/TimeToSlide) * alto);

		if( opening != null ){
			if(opening.style.display != 'block')
				opening.style.display = 'block';
			opening.style.height = (alto - newClosedHeight) + 'px';
			//cambiarColor( opening, '#CC6600' );
		}

		if( closing != null ){
			closing.style.height = newClosedHeight + 'px';
			//cambiarColor( closing, '#1B2C85' );
		}

		setTimeout("animate(" + curTick + "," + timeLeft + ",'" + closingId + "','" + openingId + "', " + alto + ")", 33 );
	}catch( ex ){ alert( 'Error interno(jsBase)[animate(parms)]: ' + ex.message ); }
	}

	//--- Cambio de src (imagenes)
	fn.cambiarImg = function( strImg, src ){
	try{
		var obj = document.getElementById( strImg );
		if( !obj ) return false;
		obj.src = src;
		return true;
	}catch( ex ){ alert( 'Error interno(jsBase)[cambiarImg(parms)]: ' + ex.message ); }
	}

	//--- Table
	fn.ordTbl = function(str) {	
		var table = $( '#' + str );
		$( 'th.js-sortable' ).off( 'click' );
		$( 'th.js-sortable' ).click( function(){
			
			var table = $(this).parents('table').eq(0);
			var ths = table.find('tr:gt(0)').toArray().sort(jsBase.compare($(this).index()));
			this.asc = !this.asc;
			if (!this.asc)
			   ths = ths.reverse();
			for (var i = 0; i < ths.length; i++)
			   table.append(ths[i]);
		});
	}

	fn.compare = function(idx) {
		return function(a, b) {
		   var A = jsBase.tableCell(a, idx), B = jsBase.tableCell(b, idx)
		   return $.isNumeric(A) && $.isNumeric(B) ? 
			  A - B : A.toString().localeCompare(B)
		}
	}

	fn.tableCell = function(tr, index){ 
		return $(tr).children( 'td' ).eq(index).text() 
	}

	fn.convertDate = function(d) {
	  	var p = d.split( '/' );
	  	return +(p[2]+p[1]+p[0]);
	}

	fn.ordTblFecha = function(str) {

		$( 'th.js-sortable-fecha' ).off( 'click' );
		$( 'th.js-sortable-fecha' ).click( function(){

			var tbody = document.querySelector( '#' + str + ' tbody' );
			// get trs as array for ease of use
			var rows = [].slice.call( tbody.querySelectorAll( 'tr' ) );

			rows.sort(function(a,b) {
				//return jsBase.convertDate(a.cells[0].innerHTML) 
				//		- jsBase.convertDate(b.cells[0].innerHTML);
				return jsBase.convertDate(a.cells[0].querySelector( 'input' ).value) 
						- jsBase.convertDate(b.cells[0].querySelector( 'input' ).value);
			});
			
			this.asc = (null==this.asc)?true:this.asc;
			this.asc = !this.asc;
			
			if (!this.asc)
				rows.reverse();

			rows.forEach(function(v) {
				tbody.appendChild(v); // note that .appendChild() *moves* elements
			});
		});
	}
	
	fn.haySelVisEnTbl = function(str$objTbl) {
		var objTbl = (typeof str$objTbl === 'string' || str$objTbl instanceof String) ? this.$(str$objTbl) : str$objTbl;
		if( !objTbl) return -100;

		var a = objTbl.getElementsByTagName( 'INPUT' );
		if( !a ) return -1;

		var cont = 0;
		for( var i = 0; i < a.length; i++ ) {
			var padre = '';
			try
			{
				padre = a[ i ].parentNode.parentNode.parentNode.tagName.toLowerCase();
				//alert( 'Mensaje (jsBase): ' + padre );
			}
			catch(ex0){ alert( 'Aviso interno(jsBase)[haySelVisEnTbl(parms: { str$objTbl: "' + str$objTbl + '" } ) ]: Hijo "' + a[ i ] + '" no tiene padre reconocido en parentNode(3)' ); padre = 'unk'; }

			//no tomar en cuenta encabezados
			if( a[ i ].type === 'checkbox' && a[ i ].checked && padre != 'th' )
					cont++;
		}
		//alert( 'cont(haySelVisEnTbl): ' + cont );
		return cont;
	}

	//--- Presentación (prePostBack)
	fn.moPrePostBack = function( flag, strDivActivar, strMsj )
	{
		var objMainDiv = this.$( varGbl.uiDivPrePostBack.strId ); objMainDiv.style.display = 'none';
		var childNodes = objMainDiv.childNodes, i = childNodes.length;

		while(i--) {
			if( childNodes[i] )
				if( childNodes[i].tagName )
					if( childNodes[i].tagName.toLowerCase() == 'div' 
						|| childNodes[i].tagName.toLowerCase() == 'span' )
						childNodes[i].style.display = 'none';
		}
		objMainDiv.style.display = (flag) ? 'block' : 'none';
		this.mostrarDiv( flag, strDivActivar );

		if( strMsj )
			this.setText( strDivActivar, strMsj );
	}

	//--- Json
	fn.json2table = function( json, classes ) {
	  var cols = Object.keys(json[0]);

	  var headerRow = '';
	  var bodyRows = '';

	  classes = classes || '';

	  cols.map(function(col) {
		headerRow += '<th>' + this.capitalizeFirstLetter(col) + '</th>';
	  });

	  json.map(function(row) {
		bodyRows += '<tr>';

		cols.map(function(colName) {
		  bodyRows += '<td>' + row[colName] + '</td>';
		})

		bodyRows += '</tr>';
	  });

	  return '<table class="' +
			 classes +
			 '"><thead><tr>' +
			 headerRow +
			 '</tr></thead><tbody>' +
			 bodyRows +
			 '</tbody></table>';
	}

	fn.buildHtmlTable = function( selector, myList, confEncTbl, strFunc ) {
	  var columns = this.addAllColumnHeaders( myList, selector, confEncTbl );
		//$(selector).append(row$);
	  $(selector).append($('<tbody/>'));
	  
	  for (var i = 0; i < myList.length; i++) {
		var row$ = $('<tr/>');
		for (var colIndex = 0; colIndex < columns.length; colIndex++) {
		  var cellValue = myList[i][columns[colIndex]];
		  if (cellValue == null) cellValue = "";

		  var strRow	= '';
		  var strStyle	= ''; try { strStyle = confEncTbl[ colIndex ][ 'style' ] ? ' ' + confEncTbl[ colIndex ][ 'style' ] : ''; } catch( ex1 ){}
		  var strClass	= ''; try { strClass = confEncTbl[ colIndex ][ 'class' ] ? ' ' + confEncTbl[ colIndex ][ 'class' ] : ''; } catch( ex1 ){}
		  var indAnc	= -1; try { indAnc = confEncTbl[ colIndex ][ 'anc' ] ? confEncTbl[ colIndex ][ 'anc' ] : -1; } catch( ex2 ){}
		  var telAnc	= -1; try { telAnc = confEncTbl[ colIndex ][ 'tel' ] ? confEncTbl[ colIndex ][ 'tel' ] : -1; } catch( ex2 ){}

		  if( indAnc > -1 ) {
			var idEncExp = myList[ i ][ columns[ indAnc ] ];
			//#uiDivPan		
			strRow = '<td' + strStyle + '><span class="underlined-example-wrapper">'
						+ '<a class="normal normalGrisEspecialX" href="javascript:;"'
						+ ' onclick="' + strFunc + '(' + idEncExp + ');">' 
						+ ((null!=cellValue&&!cellValue.isEmpty())?cellValue: idEncExp)
						+ '</a></span></td>';
		  }
		  else if( indAnc == -1 ) {
			if( telAnc == '1' ) {
				if( cellValue.isEmpty() ) {
					strRow = '<td' + strClass + ' ' + strStyle + '>' + cellValue + '</td>';
					//console.log( 'strClass:"' + strClass );
				}
				else {
					var numTel = cellValue.trim(), numTelTmp='tel://+' + numTel, ind_ap = -1;
					if(numTelTmp.indexOf( '+' )>=0) {
						ind_ap = numTel.indexOf(' ') + 1;
						numTelTmp=(ind_ap>=0)?numTel.substring(ind_ap):'(1)'-numTel;
					}
					strRow = '<td' + strClass + ' ' + strStyle + '><a href="tel://+' + numTel +'" rel="nofollow">' + numTelTmp + '</a></td>';
				}
			}
			else
				strRow = '<td' + strClass + ' ' + strStyle + '>' + cellValue + '</td>';
		  }

		   row$.append( strRow );
		   row$.attr('id', 'tr-' + idEncExp );
		   //row$.append($('<td/>').html(cellValue));
		}
		$(selector).append(row$);
	  }
	}

	// Adds a header row to the table and returns the set of columns.
	// Need to do union of keys from all records as some records may not contain
	// all records.
	fn.addAllColumnHeaders = function( myList, selector, confEncTbl ) {
	  var columnSet = [];
	  var headerTr$ = $('<tr/>');
	  var thead$ = $('<thead/>');

	  for (var i = 0; i < myList.length; i++) {
		var rowHash = myList[i]; var cont = -1;
		for (var key in rowHash) {

		  if ($.inArray(key, columnSet) == -1) {
			cont++;
			columnSet.push(key);
			//headerTr$.append($('<th/>').html(key));

			var str = ''; try { str = confEncTbl[ cont ][ 'val' ] ? ' ' + confEncTbl[ cont ][ 'val' ] : ''; } catch( ex ){}
			var strStyle = ''; try { strStyle = confEncTbl[ cont ][ 'style' ] ? ' ' + confEncTbl[ cont ][ 'style' ] : ''; } catch( ex1 ){}
			headerTr$.append( '<th' + str + strStyle + '>' + key + '</th>' );
		  }
		}
	  }
	  //$(selector).append(headerTr$);

		thead$.append(headerTr$);
		$(selector).append(thead$);

	  return columnSet;
	}

	//--- Miscelánea
	fn.capitalizeFirstLetter = function( string ) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	fn.scrollIrHaciaArriba = function( objPar ) {
		//id, css, top
		var topMax 	= (undefined!==objPar.top)?objPar.top:500;
		var top 	= document.body.scrollTop || document.documentElement.scrollTop;

		if( true === objPar.deb ){
			console.log( top );
		}

		if( top > topMax ) {
		    jsBase.addCss( objPar.id, objPar.css );
		} else {
		    jsBase.remCss( objPar.id, objPar.css );
		}
	};

	fn.scrollIrHaciaAbajo = function( objPar ) {
		//id, css, top
		var topMin	= (undefined!==objPar.top)?objPar.top:500;
		var top 	= document.body.scrollTop||document.documentElement.scrollTop;

		if( true === objPar.deb ){
			console.log( top );
		}
		
		if( top <= topMin ) {
		    jsBase.addCss( objPar.id, objPar.css );
		} else {
		    jsBase.remCss( objPar.id, objPar.css );
		}
	};

	fn.include = function( arr, obj ) {
    	return (arr.indexOf(obj) != -1);
	};

	fn.dimPantalla = function(){
		const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;

		return { "ancho": width, "largo": height };
	};	

	fn.uuidv4 = function() {
	  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	  )
	}

	fn.callFuncsJsFromCodeBehind = function( strIdHiddenFunJs, strIdHiddenParms ) {
	try{
		var strClear = "this.$( '" + strIdHiddenFunJs + "' ).value = ''; this.$( '" + strIdHiddenParms + "' ).value = '';";
		var objFunJs = this.$( strIdHiddenFunJs );
		var objParms = this.$( strIdHiddenParms );
		var myFunc = null, clearFunc = null;

		if(!objFunJs) return;

		if(!objFunJs.value.isEmpty())
		{
			//setTimeout( function(){ alert( "Hello" ); } );
			if(objParms.value.isEmpty())
				myFunc = setTimeout( objFunJs.value + "();" );
			else
				myFunc = setTimeout( objFunJs.value + "( " + objParms.value + " );" );
			//clearTimeout(myFunc);
			clearFunc = setTimeout( strClear, 500 );
			//clearTimeout(clearFunc);
		}
	}catch( ex0 ){ alert( "Error interno(jsBase)[callFuncsJsFromCodeBehind( " + strIdHiddenFunJs + ", " + strIdHiddenParms + " )]: " + ex0.message ); }
	}

	fn.copyText = function( text ) {
	  function selectElementText(element) {
		if (document.selection) {
		  var range = document.body.createTextRange();
		  range.moveToElementText(element);
		  range.select();
		} else if (window.getSelection) {
		  var range = document.createRange();
		  range.selectNode(element);
		  window.getSelection().removeAllRanges();
		  window.getSelection().addRange(range);
		}
	  }
	  var element = document.createElement('DIV');
	  element.textContent = text;
	  document.body.appendChild(element);
	  selectElementText(element);
	  document.execCommand('copy');
	  element.remove();
	}

	fn.getRandomInt = function( min, max ) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

	//--- Arreglo/Array
	fn.toArray = function( a ) {
	  var result = [];
	  var i = a.length;
	  while (i--)
		result[ i ] = a[ i ];

	  return result;
	}

	fn.assign = function( target, source ) {

		if( source == null ) return source;
		
		Object.keys( source ).forEach( sourcekey => {
			//console.log(target);
	    	if( Object.keys( source ).find( targetkey => targetkey === sourcekey ) !== undefined && typeof source[sourcekey] === "object" ) {
	      		target[ sourcekey ] = jsBase.assign( target[ sourcekey ], source[ sourcekey ] );
	    	} else {
	      		target[ sourcekey ] = source[ sourcekey ];
	    	}

  		});

  		return target;
	};

	return fn;
}();