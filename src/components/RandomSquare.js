var componentPrototype = Object.create(HTMLElement.prototype);

function makeGetter(obj, prop) {
	return function() {
		return obj._properties[prop];
	};
}

function makeSetter(obj, prop) {
	return function(v) {
		console.log(obj, prop, v);
		obj.setAttribute(prop, v);
	};
}

// properties
// - default values
// - exposed as attributes so propertySetter -> attribute update
// - attribute update -> propertySet
componentPrototype.createdCallback = function() {

	var properties = {
		width: 100,
		height: 100,
		colour: '#f0f'
	};
	this._properties = properties;

	var self = this;
	Object.keys(properties).forEach(function defProp(k) {
		Object.defineProperty(self, k, {
			get: makeGetter(self, k),
			set: makeSetter(self, k)
		});
	});

	this._randomise();

	// Set up the DOM
	var canvas = document.createElement('canvas');
	this._canvas = canvas;
	this.appendChild(canvas);

	// And trigger the initial render
	this._render();

};

componentPrototype.attributeChangedCallback = function(name, oldValue, newValue, nameSpace) {
	this._readAttributes();
	this._render();
};

componentPrototype._readAttributes = function() {
	var props = this._properties;
	var keys = Object.keys(props);
	var self = this;
	keys.forEach(function(k) {
		var value = self.getAttribute(k);
		if(value !== null) {
			props[k] = value;
		}
	});
};

componentPrototype._render = function() {
	var prop = this._properties;
	var w = prop.width;
	var h = prop.height;
	var fillStyle = prop.colour;
	
	var canvas = this._canvas;
	canvas.width = w;
	canvas.height = h;

	var ctx = canvas.getContext('2d');
	ctx.fillStyle = fillStyle;
	ctx.fillRect(0, 0, w, h);
};

componentPrototype._randomise = function() {
	var randomColour = Math.floor(0xFFFFFF * Math.random());
	var hexColour = '#' + randomColour.toString(16);
	this.colour = hexColour;
};

function register(name) {
	return document.registerElement(name, {
		prototype: componentPrototype
	});
}

module.exports = {
	register: register
};

