require('angular');
// var angular = require('angular'); // why can't I make this work? :-/
var angular = window.angular;

var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');

RandomSquare.register('random-square');
BellButton.register('bell-button');

angular.module('InteropApp', [])
	.controller('InteropController', ['$scope', function($scope) {
		
		$scope.squares = [
			{ width: 50, height: 50 },
			{ width: 200, height: 25 },
			{ width: 100, height: 100 },
		];

		$scope.bellbuttons = [
			'<button is="bell-button"/>'
		];

	}]);
