'use strict';

var SadHappy = function(game, x, y, frame, type) {
  Phaser.Sprite.call(this, game, x, y, 'sadhappy');
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.allowGravity = false;
  this.body.immovable = true;
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.anchor.x = .5;
  this.anchor.y = .5;
  this.scale.x = .5;
  this.scale.y = .5;
  this.body.width *= .5;
  this.body.height *= .5;
};

SadHappy.prototype = Object.create(Phaser.Sprite.prototype);
SadHappy.prototype.constructor = SadHappy;

SadHappy.prototype.makeSuperCool = function() {
  this.kill();
}

module.exports = SadHappy;
