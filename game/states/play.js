'use strict';

var ParallaxStage = require('../prefabs/ParallaxStage');
var Panel = require('../prefabs/menu/panel');
var CommandOption = require('../prefabs/menu/commandOption');
var Fight = require('../commands/fight');
var Item = require('../commands/item');

var panel;
var commands = [];
var lastPressed = 0;

function Play() {}
Play.prototype = {

  create: function() {

    panel = new Panel(this.game, 0, this.game.height - 200, this.game.width, 200);
    commands = [
      new CommandOption(this.game, 20, this.game.height - 180, new Fight()),
      new CommandOption(this.game, 20, this.game.height - 150, new Item())
    ];

    this.game.add.existing(panel);

    commands[0].active(true);
    commands.forEach(function(command) {
      this.game.add.existing(command);
    }.bind(this));

    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
    this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.ENTER);

    this.game.events = {};
    this.game.events.onCommandTriggered = new Phaser.Signal();

    this.game.events.onCommandTriggered.add(function(command) {
      command.execute();
    });

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var parallaxStageConfig = [
      { imageName: 'forestBack', speed: 0.5 },
      { imageName: 'forestLights', speed: 0.75 },
      { imageName: 'forestMiddle', speed: 1 },
      { imageName: 'forestFront', speed: 1.25 }
    ];

    this.golem = this.game.add.sprite(460, 350, 'golem');
    this.golem.scale.setTo(4,4);

    this.golem.animations.add('walk', [0,1,2,3], 4, true);
    this.golem.animations.add('fists', [4,5,6,5], 5, true);
    this.golem.animations.add('block', [8,9,10,9], 5, true);
    this.golem.animations.add('attack', [12,13,14,13], 5, true);

    this.golem.animations.add('all',
      [0,1,2,3,4,5,6,5,8,9,10,9,12,13,14,13],
      5, true);
    this.golem.animations.play('all');

    this.parallaxStage = new ParallaxStage(this.game, parallaxStageConfig);
  },

  update: function() {

    this.parallaxStage.update();

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && Date.now() - lastPressed > 150) {
      cycleDownCommands();
      lastPressed = Date.now();
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && Date.now() - lastPressed > 150) {
      cycleUpCommands();
      lastPressed = Date.now();
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && Date.now() - lastPressed > 150) {
      triggerActiveCommand.call(this);
      lastPressed = Date.now();
    }
  },

  render: function() {
    // this.game.debug.spriteBounds(fightCommand);
  },

  clickListener: function() {
    this.game.state.start('gameover');
  }
};

function cycleDownCommands() {

  var idx = commands.reduce(function(value, command, i) {
    if (command.active()) {
      command.active(false);
      return i + 1;
    }
    else {
      command.active(false);
      return value;
    }
  }, 0);

  if (idx >= commands.length) {
    idx = 0;
  }

  commands[idx].active(true);
}

function cycleUpCommands() {

  var idx = commands.reduce(function(value, command, i) {
    if (command.active()) {
      command.active(false);
      return i - 1;
    }
    else {
      command.active(false);
      return value;
    }
  }, 0);

  if (idx < 0) {
    idx = commands.length - 1;
  }

  commands[idx].active(true);
}

function triggerActiveCommand() {

  var idx = commands.reduce(function(value, command, i) {
    if (command.active()) {
      return i;
    }
    else {
      return value;
    }
  }, undefined);

  if (idx !== undefined) {
    this.game.events.onCommandTriggered.dispatch(commands[idx].command);
  }
}

module.exports = Play;
