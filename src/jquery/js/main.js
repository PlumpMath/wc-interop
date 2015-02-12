var bellButton = require('../../components/bellButton');
var $ = require('jquery');


bellButton.register('bell-button');

// Instancing custom element that extends an existing element: bell-button < button

// 1) with native document.createElement
var instanceA = document.createElement('button', 'bell-button');
$('body').append(instanceA);

// 2) with jQuery's instantiation magic - TODO: does it use innerHTML internally?
var instanceB = $('<button is="bell-button"></button>');
$('body').append(instanceB);

// 3) but this doesn't work
var instanceC = $('<button>');
instanceC.attr('is', 'bell-button');
$('body').append(instanceC);
