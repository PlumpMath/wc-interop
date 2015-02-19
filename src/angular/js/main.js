require('angular');
// var angular = require('angular'); // why can't I make this work? :-/
var angular = window.angular;

var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');
console.log(angular);

RandomSquare.register('random-square');
BellButton.register('bell-button');


