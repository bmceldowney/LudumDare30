'use strict';

var Rocket = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'rocket', frame);

  // initialize your prefab here
  
};

Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.prototype.constructor = Rocket;

Rocket.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Rocket;
