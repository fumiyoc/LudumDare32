var ItemOption = require('./itemOption');
var optionOffsetLeft = 220;
var optionOffsetTop = -32;
var optionWidth = 90;
var optionHeight = 45;

function ItemList(game, parent) {
  Phaser.Group.call(this, game, parent, 'ItemList');
}

ItemList.MAX = 32;

ItemList.prototype = Object.create(Phaser.Group.prototype);
ItemList.constructor = ItemList;

ItemList.prototype.add = function() {

  if (this.length >= ItemList.MAX) {
    throw new Error('Can\'t add more commands to the list. Max length exceeded.');
  }

  Phaser.Group.prototype.add.call(this, new ItemOption(this.game, 0, 0));

  if (this.length === 1) {
    this.setActive(this.getAt(0));
  }

  this._reposition();
};

ItemList.prototype.setActive = function(command) {
  this.cursor && this.cursor.active(false);
  this.cursor = command;
  this.cursor.active(true);
};

ItemList.prototype.chooseNext = function() {
  this.cursor && this.cursor.active(false);
  this.next().active(true);
};

ItemList.prototype.choosePrev = function() {
  this.cursor && this.cursor.active(false);
  this.previous().active(true);
};

ItemList.prototype.getActiveCommand = function() {
  return this.cursor.command;
};

ItemList.prototype._reposition = function() {

  var x = optionOffsetLeft;
  var y = optionOffsetTop;

  this.forEach(function(child) {

    y += optionHeight;

    if (y + child.height > this.parent.height) {
      x += optionWidth;
      y = optionHeight + optionOffsetTop;
    }

    child.x = x;
    child.y = y;

  }.bind(this));
};

module.exports = ItemList;
