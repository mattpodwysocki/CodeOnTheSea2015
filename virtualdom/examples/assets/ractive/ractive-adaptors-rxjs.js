/*

	ractive-adaptors-rxjs
	======================

	Version 0.1.0.

	RxJS adaptor for Ractive

	==========================

	Troubleshooting: If you're using a module system in your app (AMD or
	something more nodey) then you may need to change the paths below,
	where it says `require( 'ractive' )` or `define([ 'ractive' ]...)`.

	==========================

	Usage: Include this file on your page below Ractive, e.g:

	    <script src='lib/ractive.js'></script>
	    <script src='lib/rxjs.js'></script>
	    <script src='lib/ractive-adaptors-rxjs.js'></script>

	Or, if you're using a module loader, require this module:

	    // requiring the plugin will 'activate' it - no need to use
	    // the return value
	    require( 'ractive-adaptors-rxjs' );

	Then, tell Ractive to use the `RxJS` adaptor:

		ractive = new Ractive({
			el: 'body',
			template: myTemplate,
			adapt: 'RxJS',
			data: {
				foo: someReactiveProperty
			}
		});

*/

(function ( global, factory ) {

	'use strict';

	// Common JS (i.e. browserify) environment
	if ( typeof module !== 'undefined' && module.exports && typeof require === 'function' ) {
		factory( require( 'ractive', 'rx' ) );
	}

	// AMD?
	else if ( typeof define === 'function' && define.amd ) {
		define([ 'ractive', 'rx' ], factory );
	}

	// browser global
	else if ( global.Ractive && global.Rx ) {
		factory( global.Ractive, global.Rx );
	}

	else {
		throw new Error( 'Could not find Ractive and RxJS! They must be loaded before the ractive-adaptors-rxjs plugin' );
	}

}( typeof window !== 'undefined' ? window : this, function ( Ractive, Rx ) {

	'use strict';

	var RxWrapper = function ( ractive, observable, keypath ) {
		var self = this;

		this.ractive = ractive;
		this.value = observable;
		this.keypath = keypath;

		this.dispose = observable.subscribe( function ( value ) {
			if ( self.updating ) {
				return;
			}

			self._value = value;

			self.updating = true;
			ractive.set( keypath, value );
			self.updating = false;
		});
	};

	RxWrapper.prototype = {
		get: function () {
			return this._value;
		},
		teardown: function () {
			this.dispose();
		},
		reset: function ( value ) {
			if ( this.updating ) {
				return;
			}

			if ( value instanceof Rx.Observable ) {
				return false;
			}

			this.updating = true;
			// TODO how do you set the value of a Rx.Observable?!
			this.updating = false;
		}
	};

	Ractive.adaptors.RxJS = {
		filter: function ( object ) {
			return object instanceof Rx.Observable;
		},
		wrap: function ( ractive, observable, keypath ) {
			return new RxWrapper( ractive, observable, keypath );
		}
	};

}));
