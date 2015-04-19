'use strict';
var foes = require('../resources/foes');
var Foe = require('./Foe');

var EncounterManager = function(game, player, commands) {
	this.game = game;
	this.currentTier = 0;
	this.player = player;
	this.commands = commands;

	this.travel = new Phaser.Signal();
	this.encounter = new Phaser.Signal();
};

EncounterManager.prototype.constructor = EncounterManager;

EncounterManager.prototype.start = function() {
	startWalking.call(this);
};

function startWalking () {
	this.travel.dispatch();
	this.game.time.events.add(5000, stopWalking, this);
}

function stopWalking () {
	this.encounter.dispatch();

	startCombat.call(this);
}

function startCombat () {
	// combat simulation!
	var foes = getFoes(game);

	this.game.time.events.add(5000, startWalking, this);
	// startWalking.call(this);
}

function getFoes(game) {
	var foes = [];
	var foeIndex = Math.floor(Math.random() * foes.length);

	// there will be more than one maybe
	foes.push(new Foe(game, foes[foeIndex]));

	return foes;
}

module.exports = EncounterManager;
