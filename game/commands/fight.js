function Fight() {
  this.text = 'Fight';
  this.executing = new Phaser.Signal();
}

Fight.prototype = Object.create(Object.prototype);
Fight.constructor = Fight;

Fight.prototype.execute = function() {
	this.executing.dispatch();
  console.log(this.text);
};

module.exports = Fight;

