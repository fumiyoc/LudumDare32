var CommandOption = require('./commandOption');
var optionOffsetLeft = 20;
var optionHeight = 30;

function CommandList(game, parent) {
  Phaser.Group.call(this, game, parent, 'CommandList');
}

CommandList.prototype = Object.create(Phaser.Group.prototype);
CommandList.constructor = CommandList;

CommandList.prototype.add = function(command) {

  var commandOption = new CommandOption(this.game, optionOffsetLeft, this.length * optionHeight + optionHeight, command);

  Phaser.Group.prototype.add.call(this, commandOption);

  if (this.length === 1) {
    this.cursor.active(true);
  }
};

CommandList.prototype.chooseNext = function() {
  this.cursor.active(false);
  this.next().active(true);
};

CommandList.prototype.choosePrev = function() {
  this.cursor.active(false);
  this.previous().active(true);
};

CommandList.prototype.getActiveCommand = function() {
  return this.cursor.command;
};

module.exports = CommandList;
