
  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.forestBack = this.game.add.sprite(0, 0, 'forestBack');
      this.forestLights = this.game.add.sprite(0, 0, 'forestLights');
      this.forestMiddle = this.game.add.sprite(0, 0, 'forestMiddle');
      this.forestFront = this.game.add.sprite(0, 0, 'forestFront');
      this.forestBack2 = this.game.add.sprite(this.forestFront., 0, 'forestBack');
      this.forestLights2 = this.game.add.sprite(0, 0, 'forestLights');
      this.forestMiddle2 = this.game.add.sprite(0, 0, 'forestMiddle');
      this.forestFront2 = this.game.add.sprite(0, 0, 'forestFront');
      
      this.forestBack.scale.setTo(4, 4);
      this.forestLights.scale.setTo(4, 4);
      this.forestMiddle.scale.setTo(4, 4);
      this.forestFront.scale.setTo(4, 4);

      this.forestBack.smoothed = false;
      this.forestLights.smoothed = false;
      this.forestMiddle.smoothed = false;
      this.forestFront.smoothed = false;


    },
    update: function() {
      this.forestBack.x -= 0.5;
      this.forestLights.x -= 0.75;
      this.forestMiddle.x -= 1;
      this.forestFront.x -= 1.25;
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;