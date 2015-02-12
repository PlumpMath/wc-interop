var bellButton = require('../../components/bellButton');
var $ = require('jquery');


bellButton.register('bell-button');

// Create instance of custom element using tag name
$('body').append('<bell-button></bell-button>');
