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
	// NOTWORKING Using the is= attribute after creating element instance w/jQuery constructor, the wrong prototype will be used
	var instanceC = $('<button>');
	instanceC.attr('is', 'bell-button');
	$('body').append(instanceC);
})();

// TODO: attributes
(function() {
	var div = $('<div></div>');
	$('body').append(div);
	
	// 1) attributes at creation time
	div.append($('<random-square width="200" height="50"></random-square>'));
	
	// 2) attributes are set after creation
	var square = $('<random-square></random-square>');
	square.attr('width', 25);
	square.attr('colour', '#f0f');
	div.append(square);

	// 'square' is actually an array of elements (jQuery wraps it like that)
	// and the 'real object' is the first element in the array
	var realSquare = square[0];

	// NOTWORKING setting properties of 'queried' objects. Need to access the real object.
	// The custom element has support for setting properties directly,
	// but square.width = 15 won't do anything - you have to use the 'real object'
	// Otherwise you're setting the `width` property of the Array/query
	realSquare.width = 15;

	// It's fine if you create the object with createElement, but that kinda defeats jQuery 'ease of use' I guess
	var anotherRealSquare = document.createElement('random-square');
	anotherRealSquare.width = 50;
	anotherRealSquare.colour = '#000';
	div.append(anotherRealSquare);

	// This convolutely works too - wrapping element in jQuery and using its attr helper to set an attribute value
	$(anotherRealSquare).attr('height', 25);

	// The attribute is also read back, as expected
	div.append('The height is ' + anotherRealSquare.height + ' confirm? ' + $(anotherRealSquare).attr('height'));

})();

// TODO: callbacks
// TODO: events, listeners
// TODO: calling methods on the instance
