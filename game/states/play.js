'use strict';

var ParallaxStage = require('../prefabs/ParallaxStage');
var Panel = require('../prefabs/menu/panel');
var CommandOption = require('../prefabs/menu/commandOption');
var Fight = require('../commands/fight');
var Item = require('../commands/item');

function Play() {}
Play.prototype = {

  create: function() {

    this.lastPressed = 0;
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

    this.panel = new Panel(this.game, 0, this.game.height - 200, this.game.width, 200);
    this.commands = [
      new CommandOption(this.game, 20, this.game.height - 180, new Fight()),
      new CommandOption(this.game, 20, this.game.height - 150, new Item())
    ];

    this.game.add.existing(this.panel);

    this.commands[0].active(true);
    this.commands.forEach(function(command) {
      this.game.add.existing(command);
    }.bind(this));
  },

  update: function() {

    this.parallaxStage.update();

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && Date.now() - this.lastPressed > 150) {
      this.cycleDownCommands();
      this.lastPressed = Date.now();
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && Date.now() - this.lastPressed > 150) {
      this.cycleUpCommands();
      this.lastPressed = Date.now();
    }
    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER) && Date.now() - this.lastPressed > 150) {
      this.triggerActiveCommand.call(this);
      this.lastPressed = Date.now();
    }
  },

  render: function() {
    // this.game.debug.spriteBounds(fightCommand);
  },

  clickListener: function() {
    this.game.state.start('gameover');
  },

  cycleDownCommands: function() {

    var idx = this.commands.reduce(function(value, command, i) {
      if (command.active()) {
        command.active(false);
        return i + 1;
      }
      else {
        command.active(false);
        return value;
      }
    }, 0);

    if (idx >= this.commands.length) {
      idx = 0;
    }

    this.commands[idx].active(true);
  },

  cycleUpCommands: function() {

    var idx = this.commands.reduce(function(value, command, i) {
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
      idx = this.commands.length - 1;
    }

    this.commands[idx].active(true);
  },

  triggerActiveCommand: function() {

    var idx = this.commands.reduce(function(value, command, i) {
      if (command.active()) {
        return i;
      }
      else {
        return value;
      }
    }, undefined);

    if (idx !== undefined) {
      this.game.events.onCommandTriggered.dispatch(this.commands[idx].command);
    }
  }
};

module.exports = Play;
