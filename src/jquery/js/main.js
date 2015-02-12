var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');
var $ = require('jquery');

RandomSquare.register('random-square');
BellButton.register('bell-button');

// Instancing totally custom element
(function() {
	// 1) with native document.createElement
	var instanceA = document.createElement('random-square');
	$('body').append(instanceA);

	// 2) with jQuery's instantiation magic - TODO: does it use innerHTML internally?
	var instanceB = $('<random-square>');
	$('body').append(instanceB);
})();

// Instancing custom element that extends an existing element: bell-button < button
(function() {
	// 1) with native document.createElement
	var instanceA = document.createElement('button', 'bell-button');
	$('body').append(instanceA);

	// 2) with jQuery's instantiation magic
	var instanceB = $('<button is="bell-button"></button>');
	$('body').append(instanceB);

	// 3) but this doesn't work. The proper prototype doesn't seem to be used, an "empty" button is rendered
	var instanceC = $('<button>');
	instanceC.attr('is', 'bell-button');
	$('body').append(instanceC);
})();

// TODO: attributes
(function() {
	
});

// TODO: callbacks
// TODO: events, listeners
// TODO: calling methods on the instance
