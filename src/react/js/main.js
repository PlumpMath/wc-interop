var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');
var React = require('react');

RandomSquare.register('random-square');
BellButton.register('bell-button'); // TODO use result of this <- to instance elment and mix with R.createElement?

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
 * This section is commented out because it crashes the build.
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

// Instancing the element directly without using the JSX syntax seems to work,
// but only for elements that inherit from the HTMLElement prototype
var RandomSquareReact = React.createClass({
	render: function() {
		return (
			React.createElement('div', null, [
				'should show two children: ',
				React.createElement('random-square'),
				React.createElement('bell-button') // <- NOTWORKING the actual instance doesn't seem to use the proper prototype
			])
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

// Attributes and properties

// NOTWORKING react doesn't pass the custom attribute `colour` but it does pass `width` and `height`
var SquareWithAttribute = React.createClass({
	render: function() {
		return (
			React.createElement('random-square', { width: 150, height: 25, colour: '#f0f' })
		);
	}
});

React.render(
	<SquareWithAttribute />,
	document.getElementById('squareWithAttribute')
);


