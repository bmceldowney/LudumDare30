'use strict';

var Actor = function(game, x, y, frame, type) {
  Phaser.Sprite.call(this, game, x, y, type, frame);

  // initialize your prefab here
  
};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Actor;
