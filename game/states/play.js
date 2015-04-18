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

    this.parallaxStage = new ParallaxStage(this.game, parallaxStageConfig);
  },

  update: function() {
    this.parallaxStage.update();
  },

  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;