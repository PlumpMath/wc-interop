var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');

RandomSquare.register('random-square');
BellButton.register('bell-button');

//

window.App = Ember.Application.create();

/*App.Router.map(function() {
	this.resource('wcinterop', { path: '/' });
});*/

App.ApplicationController = Ember.Controller.extend({
	randomSquare: '<random-square></random-square>',
	randomSquareWithAttributes: '<random-square width="50" height="25"></random-square>',
	squareWidth: 200
});

// Components
App.JustSquareComponent = Ember.Component.extend({
	tagName: 'random-square'
});

App.BellButtonComponent = Ember.Component.extend({
	tagName: 'span'
});
