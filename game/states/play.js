'use strict';
var ParallaxStage = require('../prefabs/ParallaxStage');

'use strict';
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

    /* BS temp code follows */
    this.timer = new Phaser.Timer(this.game);
    this.timer.loop(3000, this.timerFired, this);
    this.timer.start();
  },

  update: function() {
    this.parallaxStage.update();
        
  },

  timerFired: function () {
    if (this.parallaxStage.paused) {
      this.parallaxStage.startScroll();
    } else {
      this.parallaxStage.stopScroll();
    };
  },

  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
