function Special() {
  this.text = 'Special';
}

Special.prototype = Object.create(Object.prototype);
Special.constructor = Special;

Special.prototype.execute = function() {
  console.log(this.text);
};

module.exports = Special;

