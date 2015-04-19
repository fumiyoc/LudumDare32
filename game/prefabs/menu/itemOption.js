var commands = require('../../resources/commands');
var colors = require('../../resources/colors');

function ItemOption(game, x, y) {

  this.bmd = new Phaser.BitmapData(game, this.key, 48, 32);
  this.bullet = new Phaser.BitmapText(game, 0, 4, '8bit-light', '0', 8);
  this.item = new Phaser.Sprite(game, 20, 0, 'food', 28);

  Phaser.Sprite.call(this, game, x, y, this.bmd);

  this.active(false);
  this.addChild(this.item);
}

ItemOption.prototype = Object.create(Phaser.Sprite.prototype);
ItemOption.constructor = ItemOption;

ItemOption.prototype.active = function(isActive) {

  if (isActive !== undefined) {
    this._active = Boolean(isActive);
    this.bullet.visible = this._active;
  }

  return this._active;
};

module.exports = ItemOption;
