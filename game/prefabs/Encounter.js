'use strict';
var foes = require('../resources/foes');
var Foe = require('./Foe');

var Encounter = function(game, tier, modifiers) {
	this.game = game;
	this.globalModifiers = modifiers

	this.foes = getFoes(game);
};

Encounter.prototype.constructor = Encounter;

Encounter.prototype.start = function() {

};

Encounter.prototype.resolveCommand = function(command) {
	// body...
}

function getFoes(game) {
	var retval = [];
	var foeIndex = Math.floor(Math.random() * foes.length);

	// there will be more than one maybe
	retval.push(new Foe(game, foes[foeIndex]));

	return retval;
}

module.exports = Encounter;
