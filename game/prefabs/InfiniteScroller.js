'use strict';

var InfiniteScroller = function(game, x, y, frame, textureName, speed) {
  this.sprite = this.game.add.sprite(0, 0, textureName);
  this.spriteAlt = this.game.add.sprite(sprite.width, 0, textureName);

  
  this.scrollSpeed = speed;
  
};

InfiniteScroller.prototype = Object.create(Phaser.Sprite.prototype);
InfiniteScroller.prototype.constructor = InfiniteScroller;

InfiniteScroller.prototype.update = function() {
	this.x -= this.scrollSpeed;

	if ((this.x + this.width) > game.width) {

	};  
};

module.exports = InfiniteScroller;
