var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');
var React = require('react');

RandomSquare.register('random-square');
BellButton.register('bell-button'); // TODO use result of this <- to instance elment and mix with R.createElement?

/* NOTWORKING - React won't render custom elements by name
 * It's probably more of a JSX limitation maybe?
 * This section is commented out because it crashes the build.
 * 
 * (Today it doesn't work with React 0.12 - but it should work on 0.13
 * https://github.com/facebook/react/pull/2830)
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
var BunchaElements = React.createClass({
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
	<BunchaElements />,
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

// NOTWORKING react doesn't pass the custom attribute `colour` but it does pass `width` and `height` (why???)
// this is why->https://github.com/facebook/react/issues/2746
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

/*
// TODO how do I access the created element? aghh
var RandomSquareReact = React.createClass({
	render: function() {
		return (
			React.createElement('random-square')
		);
	}
});

var tmpDiv = document.createElement('div');
document.body.appendChild(tmpDiv);
var res = React.render(
	<span ref="agh">
		<RandomSquareReact />
	</span>, tmpDiv);


*/

