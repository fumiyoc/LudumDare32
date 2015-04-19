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

    this.golem = this.game.add.sprite(660, 350, 'golem');
    this.golem.smoothed = false;
    this.golem.scale.setTo(4,4);

    this.golem.animations.add('idle', [0,1,2,3], 4, true);
    this.golem.animations.add('fists', [4,5,6,5], 5, true);
    this.golem.animations.add('block', [8,9,10,9], 5, true);
    this.golem.animations.add('attack', [12,13,14,13], 5, true);

    this.golem.animations.add('all',
      [0,1,2,3,4,5,6,5,8,9,10,9,12,13,14,13],
      5, true);
    this.golem.animations.play('idle');

    this.tuna = this.game.add.sprite(460, 120, 'tuna');
    this.tuna.smoothed = false;
    this.tuna.scale.setTo(-5,5);
    
    var walkRange = [];
    for(i=0; i<12; i++) {
      walkRange.push(0+i*4);
    }
    this.tuna.animations.add('walk', walkRange, 8, true);
    this.tuna.animations.play('walk');

    this.tunaSit = this.game.add.sprite(860, 120, 'tuna');
    this.tunaSit.smoothed = false;
    this.tunaSit.scale.setTo(-5,5);
    
    var sitRange = []
    for(i=0; i<6; i++) {
      sitRange.push(1+i*4);
    }
    for(i=0; i<6; i++) {
      sitRange.push(1+(5-i)*4);
    }
    this.tunaSit.animations.add('sit', sitRange, 8, true);
    this.tunaSit.animations.play('sit');

    this.tuna = this.game.add.sprite(460, 420, 'tuna');
    this.tuna.smoothed = false;
    this.tuna.scale.setTo(-5,5);

    var trotRange = []
    for(i=0; i<12; i++) {
      trotRange.push(2+i*4);
    }
    this.tuna.animations.add('trot', trotRange, 8, true);
    this.tuna.animations.play('trot');

    this.tunaRun = this.game.add.sprite(860, 420, 'tuna');
    this.tunaRun.smoothed = false;
    this.tunaRun.scale.setTo(-5,5);

    var runRange = []
    for(i=0; i<13; i++) {
      runRange.push(3+i*4);
    }
    this.tunaRun.animations.add('run', runRange, 8, true);
    this.tunaRun.animations.play('run');

    // this.blockman = this.game.add.sprite(200, 350, 'blockman');
    // this.blockman.smoothed = false;
    // this.blockman.scale.setTo(8,8);

    // this.blockman.animations.add('walk', [23+15,23+16,23+15, 23+17], 4, true);
    // this.blockman.animations.play('walk');


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
    this.menu.commands.add(new Fight());
    this.menu.commands.add(new Item());
    this.menu.commands.add(new Special());

    for (var i = 0; i < 32; i++) {
      this.menu.items.add('carrot');
    }
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
