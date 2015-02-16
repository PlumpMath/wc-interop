var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');
var React = require('react');

RandomSquare.register('random-square');

var HelloMessage = React.createClass({
	render: function() {
		return <div>Hello {this.props.name}</div>;
	}
});

React.render(
	<HelloMessage name="Lalala" />,
	document.getElementById('container')
);

/* NOTWORKING - React won't render custom elements by name
React.render(
	<RandomSquare />,
	document.getElementById('container')
);
*/
