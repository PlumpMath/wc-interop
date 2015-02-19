var componentPrototype = Object.create(HTMLElement.prototype);

function makeGetter(obj, prop) {
	return function() {
		return obj._properties[prop];
	};
}

function makeSetter(obj, prop) {
	return function(v) {
		console.log('set', obj, prop, v);
		obj.setAttribute(prop, v);
		obj._properties[prop] = v;
	};
}

var squareCount = 0;

componentPrototype.createdCallback = function() {
//debugger;
	// NOTWORKING don't use id properties in elements, Ember will overwrite it if they're views
	// Using _ because Ember seems to be setting both the attribute and the property on the object,
	// so that taints the value we set here
	console.info('CREATEDCALLBACK');
	this._id = squareCount++;

	this.setAttribute('myid', this._id);

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

	// The weirdest. If we run this, neither Ember or Angular will create the duplicated canvas thing.
	// this.innerHTML = '';
	
	var canvas = document.createElement('canvas');
	this._canvas = canvas;
	this.appendChild(canvas);

	console.log('read1');
	this._readAttributes();
	
	// And trigger the initial render
	this._render();

};

componentPrototype.attributeChangedCallback = function(name, oldValue, newValue, nameSpace) {
	console.log('attribute changed', name, oldValue, newValue);
	this._readAttributes();
	this._render();
};

componentPrototype._readAttributes = function() {
	console.log('read attributes', this);
	var props = this._properties;
	var keys = Object.keys(props);
	var self = this;
	keys.forEach(function(k) {
		var value = self.getAttribute(k);
		console.log(k, value);
		if(value !== null) {
			props[k] = value;
		}
	});
};

componentPrototype._render = function() {
	var prop = this._properties;
	var w = Number(prop.width);
	var h = Number(prop.height);
	var id = this._id + "";
	var fillStyle = prop.colour;
	console.log('render', id, this.querySelectorAll('canvas').length);
	var canvas = this._canvas;

	if(isNaN(w) || isNaN(h)) {
		console.log('not numbers', prop.width, prop.height);
		return;
	}

	canvas.width = w;
	canvas.height = h;

	var ctx = canvas.getContext('2d');
	ctx.fillStyle = fillStyle;
	ctx.fillRect(0, 0, w, h);

	var tm = ctx.measureText(id);
	var px = (w ) / 2 - tm.width;
	var py = (h ) / 2;
	ctx.font = '28px monospace';
	ctx.fillStyle = '#000';
	ctx.fillText(id, px, py);
	ctx.fillStyle = '#fff';
	ctx.fillText(id, px - 1, py - 1);
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

