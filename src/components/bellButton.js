var componentPrototype = Object.create(HTMLButtonElement.prototype);

componentPrototype.createdCallback = function() {
	this.innerHTML = 'ding dong?';
};

function register(name) {
	document.registerElement(name, {
		prototype: componentPrototype
	});
}

module.exports = {
	register: register
};
