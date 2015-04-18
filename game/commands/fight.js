function Fight() {
  this.text = 'Fight';
}

Fight.prototype = Object.create(Object.prototype);
Fight.constructor = Fight;

Fight.prototype.execute = function() {
  console.log(this.text);
};

module.exports = Fight;

