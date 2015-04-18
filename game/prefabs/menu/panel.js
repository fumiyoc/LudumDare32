var colors = require('../../resources/colors');

function Panel(game, x, y, w, h) {

  this.key = 'panel-' + Date.now();
  this.bmd = new Phaser.BitmapData(game, this.key, w, h);

  Phaser.Sprite.call(this, game, x, y, this.bmd);

  this.checkWorldBounds = false;
  this.width = w;
  this.height = h;
  this._fillWithColor(colors.blue, colors.dark_blue);
  this._drawBorder(colors.white);
}

Panel.prototype = Object.create(Phaser.Sprite.prototype);
Panel.constructor = Panel;

Panel.prototype._drawBorder = function(color) {

  this.bmd.ctx.lineWidth = 5;
  this.bmd.ctx.strokeStyle = "white";
  this.bmd.ctx.strokeRect(2.5, 2.5, this.width - 5, this.height - 5);
};

Panel.prototype._fillWithColor = function(from, to) {

  var y = -15;
  var step = 0;
  var steps = Math.ceil(this.height / 15);
  var color = null;

  while (steps >= step) {

    color = Phaser.Color.interpolateColor(from, to, steps, step);
    this.bmd.rect(0, y, this.width, y + (15 * step), Phaser.Color.getWebRGB(color));
    step++;
    y = y + 15;
  }
};

module.exports = Panel;
