var commands = require('../../resources/commands');
var colors = require('../../resources/colors');

function CommandOption(game, x, y, command) {

  this.command = command;
  this.bmd = new Phaser.BitmapData(game, this.key, 100, 100);
  this.bullet = new Phaser.BitmapText(game, 0, 4, '8bit-light', '0', 8);
  this.text = new Phaser.BitmapText(game, 15, 0, '8bit-light', this.command.text, 18);

  Phaser.Sprite.call(this, game, x, y, this.bmd);

  this.active(false);

  this.addChild(this.bullet);
  this.addChild(this.text);
}

CommandOption.prototype = Object.create(Phaser.Sprite.prototype);
CommandOption.constructor = CommandOption;

CommandOption.prototype.active = function(isActive) {

  if (isActive !== undefined) {
    this._active = Boolean(isActive);
    this.bullet.visible = this._active;
  }

  return this._active;
};

module.exports = CommandOption;
