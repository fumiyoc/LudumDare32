'use strict';

var ParallaxStage = require('../prefabs/ParallaxStage');
var Menu = require('../prefabs/menu');
var Fight = require('../commands/fight');
var Item = require('../commands/item');
var Special = require('../commands/special');
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

    this.menu.commands.add(new Fight());
    this.menu.commands.add(new Item());
    this.menu.commands.add(new Special());

    for (var i = 0; i < 32; i++) {
      this.menu.items.add('carrot');
    }

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

  encounterHandler: function() {
    this.parallaxStage.stopScroll();
  }
};

module.exports = Play;
