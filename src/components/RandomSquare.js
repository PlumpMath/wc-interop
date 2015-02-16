var componentPrototype = Object.create(HTMLElement.prototype);

componentPrototype.createdCallback = function() {
	var canvas = document.createElement('canvas');
	canvas.width = '100';
	canvas.height = '100';
	this._canvas = canvas;
	this.appendChild(canvas);
	this.randomise();
};

componentPrototype.randomise = function() {
	var canvas = this._canvas;
	var w = canvas.width;
	var h = canvas.height;
	var ctx = canvas.getContext('2d');
	var randomColour = Math.floor(0xFFFFFF * Math.random());
	var hexColour = '#' + randomColour.toString(16);
	this._colour = hexColour;
	ctx.fillStyle = hexColour;
	ctx.fillRect(0, 0, w, h);
};

function register(name) {
	return document.registerElement(name, {
		prototype: componentPrototype
	});
}

module.exports = {
	register: register
};

