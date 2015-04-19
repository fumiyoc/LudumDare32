'use strict';
var Encounter = function(game, tier, modifiers) {
	this.game = game;
	this.foes = [];
	this.globalModifiers = modifiers
};

Encounter.prototype.constructor = Encounter;

Encounter.prototype.start = function() {
	startWalking.call(this);
};

Encounter.prototype.resolveCommand = function(command) {
	// body...
}


function startWalking () {
	this.beginTravel.dispatch()
	this.game.time.events.loop(5000, stopWalking, this);
}

function stopWalking () {
	this.endTravel.dispatch();

	startCombat.call();
}

function startCombat () {
	// body...
}

module.exports = Encounter;
