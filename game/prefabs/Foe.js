'use strict';

var Foe = function(game, config) {
  Phaser.Sprite.call(this, game, 100, 100, config.sprite.key, 0);

  // initialize your prefab here
  config.sprite.animations.foreach(function (anim) {
		this.animations.add(anim.name, anim.frames, anim.frameRate, anim.loop);
  }.bind(this));

  this.intro = true;
};

Foe.prototype = Object.create(Phaser.Sprite.prototype);
Foe.prototype.constructor = Foe;

Foe.prototype.attack = function () {
	this.animations.play('attack');
}

Foe.prototype.update = function() {
  if (this.intro) {
  	this.x -= 1.25;
  };
  // write your prefab's specific update code here
  
};

module.exports = Foe;
