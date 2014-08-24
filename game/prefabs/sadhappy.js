'use strict';

var SadHappy = function(game, x, y, frame, type) {
  Phaser.Sprite.call(this, game, x, y, 'sadhappy');
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

SadHappy.prototype = Object.create(Phaser.Sprite.prototype);
SadHappy.prototype.constructor = SadHappy;

SadHappy.prototype.reset = function(x, y, health) {
  Phaser.Sprite.prototype.reset.call(this, x, y, health);
  this.frame = 0;
}

SadHappy.prototype.makeSuperCool = function() {
  this.frame = 1;
}

module.exports = SadHappy;
