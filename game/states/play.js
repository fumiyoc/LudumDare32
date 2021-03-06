'use strict';

var ParallaxStage = require('../prefabs/ParallaxStage');
var Menu = require('../prefabs/menu');
var Command = require('../commands/Command');
var EncounterManager = require('../prefabs/EncounterManager');

function Play() {}
Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var parallaxStageConfig = [
      { imageName: 'forestBack', speed: 0.5 },
      { imageName: 'forestLights', speed: 0.75 },
      { imageName: 'forestMiddle', speed: 1 },
      { imageName: 'forestFront', speed: 1.25 }
    ];

    this.parallaxStage = new ParallaxStage(this.game, parallaxStageConfig);

    this.menu = new Menu(this.game, 0, this.game.height - 200, this.game.width, 200);
    this.game.add.existing(this.menu);

    this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.menu.commands.chooseNext, this.menu.commands);
    this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.menu.commands.choosePrev, this.menu.commands);

    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function() {
      this.menu.commands.getActiveCommand().execute();
    }, this);

    this.menu.commands.add(new Command({name: 'claws'}));
    this.menu.commands.add(new Command({name: 'teeth'}));
    this.menu.commands.add(new Command({name: 'bork'}));
    this.menu.commands.commandExecuted.add(this.commandHandler, this);

    var player = null; //placeholder, replace with real player
    this.encounterManager = new EncounterManager(this.game, player, this.menu.commands);
    this.encounterManager.traveling.add(this.travelHandler, this);
    this.encounterManager.encountering.add(this.encounterHandler, this);
    this.encounterManager.start();
  },

  update: function() {
    this.parallaxStage.update();
  },

  render: function() {
    // this.game.debug.spriteBounds(fightCommand);
  },

  clickListener: function() {
    this.game.state.start('gameover');
  },

  travelHandler: function() {
    this.parallaxStage.startScroll();
  },

  commandHandler: function(e) {
    this.encounterManager.executeCommand(e);
  },

  encounterHandler: function() {
    this.parallaxStage.stopScroll();
  }
};

module.exports = Play;
