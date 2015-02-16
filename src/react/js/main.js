var RandomSquare = require('../../components/RandomSquare');
var BellButton = require('../../components/BellButton');
var React = require('react');

var HelloMessage = React.createClass({
	render: function() {
		return <div>Hello {this.props.name}</div>;
	}
});

React.renderComponent(
	<HelloMessage name="Lalala" />,
	document.getElementById('container')
);

