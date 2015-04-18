(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(960, 640, Phaser.AUTO, 'ludumdare32');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],2:[function(require,module,exports){
'use strict';
var InfiniteScroller = function(game, x, y, textureName, speed) {
	this.game = game;
  this.sprite = this.game.add.sprite(0, 0, textureName);
  this.altSprite = this.game.add.sprite(this.sprite.width + game.width, 0, textureName);
  this.currentSprite = this.sprite;
  this.stagedSprite = this.altSprite;

  this.sprite.smoothed = false;
  this.altSprite.smoothed = false;

  this.sprite.scale.setTo(4, 4);
  this.altSprite.scale.setTo(4, 4);

  this.scrollSpeed = speed;
  this.paused = false;
};

InfiniteScroller.prototype.constructor = InfiniteScroller;

InfiniteScroller.prototype.update = function() {
	if (!this.paused) {
		this.sprite.x -= this.scrollSpeed;
		this.altSprite.x -= this.scrollSpeed;

		checkForSwap.call(this, this.sprite, this.altSprite);
	};
};

InfiniteScroller.prototype.startScroll = function() {
	this.pause = false;
};

InfiniteScroller.prototype.stopScroll = function() {
	this.pause = true;
};

function checkForSwap(sprite, altSprite) {
	if ((this.currentSprite.width + this.currentSprite.x) < this.game.width) {
		var stagedSprite = this.stagedSprite;
		this.stagedSprite.x = this.game.width - 1;

		this.stagedSprite = this.currentSprite;
		this.currentSprite = stagedSprite;
	};  	  
}

module.exports = InfiniteScroller;

},{}],3:[function(require,module,exports){
'use strict';
var InfiniteScroller = require('../prefabs/InfiniteScroller');

var ParallaxStage = function(game, configArray) {
	this.game = game;
	this.layers = [];
	this.paused = false;

	configArray.forEach(function (item) {
		this.layers.push(new InfiniteScroller(this.game, 0, 0, item.imageName, item.speed));
	}.bind(this));
}

ParallaxStage.prototype.update = function () {
	this.layers.forEach(function (layer) {
		layer.update();
	});
}

ParallaxStage.prototype.startScroll = function () {
	this.paused = false;
	this.layers.forEach(function (layer) {
		layer.startScroll();
	});
}

ParallaxStage.prototype.stopScroll = function () {
	this.paused = true;
	this.layers.forEach(function (layer) {
		layer.stopScroll();
	});
}

module.exports = ParallaxStage;

},{"../prefabs/InfiniteScroller":2}],4:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],5:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],6:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],7:[function(require,module,exports){
'use strict';
var ParallaxStage = require('../prefabs/ParallaxStage');

'use strict';
function Play() {}
Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var parallaxStageConfig = [
      { imageName: 'forestBack', speed: 0.5 },
      { imageName: 'forestLights', speed: 0.75 },
      { imageName: 'forestMiddle', speed: 1 },
      { imageName: 'forestFront', speed: 1.25 }
    ];

    this.golem = this.game.add.sprite(460, 350, 'golem');
    this.golem.scale.setTo(4,4);

    this.golem.animations.add('walk', [0,1,2,3], 4, true);
    this.golem.animations.add('fists', [4,5,6,5], 5, true);
    this.golem.animations.add('block', [8,9,10,9], 5, true);
    this.golem.animations.add('attack', [12,13,14,13], 5, true);

    this.golem.animations.add('all',
      [0,1,2,3,4,5,6,5,8,9,10,9,12,13,14,13],
      5, true);
    this.golem.animations.play('all');

    this.parallaxStage = new ParallaxStage(this.game, parallaxStageConfig);

    /* BS temp code follows */
    this.timer = new Phaser.Timer(this.game);
    this.timer.loop(3000, this.timerFired, this);
    this.timer.start();
  },

  update: function() {
    this.parallaxStage.update();
        
  },

  timerFired: function () {
    if (this.parallaxStage.paused) {
      this.parallaxStage.startScroll();
    } else {
      this.parallaxStage.stopScroll();
    };
  },

  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;

},{"../prefabs/ParallaxStage":3}],8:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    /* load the assets here */
    this.load.image('forestBack', 'assets/placeholder/parallax-forest-back-trees.png');
    this.load.image('forestFront', 'assets/placeholder/parallax-forest-front-trees.png');
    this.load.image('forestLights', 'assets/placeholder/parallax-forest-lights.png');
    this.load.image('forestMiddle', 'assets/placeholder/parallax-forest-middle-trees.png');

    this.load.spritesheet('golem', 'assets/placeholder/Golem.png', 48, 56, 16);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])