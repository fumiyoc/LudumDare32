function Item() {
  this.text = 'Use Item';
}

Item.prototype = Object.create(Object.prototype);
Item.constructor = Item;

Item.prototype.execute = function() {
  console.log(this.text);
};

module.exports = Item;

