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

    this.menu = new Menu(this.game, 0, this.game.height - 200, this.game.width, 200);
    this.game.add.existing(this.menu);

    this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(this.menu.commands.chooseNext, this.menu.commands);
    this.game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(this.menu.commands.choosePrev, this.menu.commands);

    this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function() {
      this.menu.commands.getActiveCommand().execute();
    }, this);

    this.encounterManager = new EncounterManager(this.game);
    this.encounterManager.travel.add(this.travelHandler, this);
    this.encounterManager.encounter.add(this.encounterHandler, this);
    this.encounterManager.start();

    // TODO: Commands should probably come from the player prefab or something...
    [new Fight(), new Item(), new Special()].forEach(function(command) {
      this.menu.commands.add(command);
    }.bind(this));
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
