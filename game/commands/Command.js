function Command(config) {
  this.text = config.name;
  this.executing = new Phaser.Signal();
}

Command.prototype = Object.create(Object.prototype);
Command.constructor = Command;

Command.prototype.execute = function() {
	this.executing.dispatch(this);
  console.log(this.text);
};

module.exports = Command;

