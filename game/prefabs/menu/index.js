var Panel = require('./../panel');
var CommandList = require('./commandList');
var ItemList = require('./itemList');

function Menu(game, x, y, w, h) {

  this.bmd = new Phaser.BitmapData(game, this.key, w, h);

  Phaser.Sprite.call(this, game, x, y, this.bmd);

  this.panel = new Panel(game, 0, 0, w, h);
  this.commands = new CommandList(game, this);
  this.items = new ItemList(game, this);

  this.addChild(this.panel);
  this.addChild(this.commands);
  this.addChild(this.items);
}

Menu.prototype = Object.create(Phaser.Sprite.prototype);
Menu.constructor = Menu;

module.exports = Menu;
