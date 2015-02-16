var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');
var React = require('react');

RandomSquare.register('random-square');
BellButton.register('bell-button');

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
 * It's probably more of a JSX limitation maybe?
 * Commented out because it would crash the build.
var RandomSquareReact = React.createClass({
	render: function() {
		return <random-square></random-square>
	}
});

React.render(
	<RandomSquareReact />,
	document.getElementById('randomSquareReact')
);
*/

// But instancing the element directly without using the JSX syntax DOES work
var RandomSquareReact = React.createClass({
	render: function() {
		return (
			React.createElement('random-square')
		)
	}
});

React.render(
	<RandomSquareReact />,
	document.getElementById('randomSquareReact')
);

// NOTWORKING Instancing with an 'is' attribute. Wrong prototype seems to be used.
var ButtonWithAttribute = React.createClass({
	render: function() {
		return (
			React.createElement('button', { is: 'bell-button' })
		);
	}
});

React.render(
	<ButtonWithAttribute />,
	document.getElementById('buttonWithAttribute')
);

// NOTWORKING Using the 'is' attribute with JSX syntax
var ComponentWithBellButton = React.createClass({
	render: function() {
		return (
			<div>Look at that button <button is="bell-button"></button></div>
		);
	}
});

React.render(
	<ComponentWithBellButton />,
	document.getElementById('componentWithBellButton')
);


