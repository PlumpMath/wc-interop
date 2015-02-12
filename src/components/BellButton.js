var componentPrototype = Object.create(HTMLButtonElement.prototype);

componentPrototype.createdCallback = function() {
	this.innerHTML = 'ding!';
};

function register(name) {
	return document.registerElement(name, {
		prototype: componentPrototype,
		extends: 'button'
	});
}

module.exports = {
	register: register
};
