var componentPrototype = Object.create(HTMLButtonElement.prototype);

componentPrototype.createdCallback = function() {
	console.log('is this called?');
	this.appendChild(document.createTextNode('ding dong?'));
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
