'use strict';

var KEY = 'ouchies';

var Ouchy = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, KEY, frame);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.body.allowGravity = false;
  this.setType();
};

Ouchy.prototype = Object.create(Phaser.Sprite.prototype);
Ouchy.prototype.constructor = Ouchy;

Ouchy.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Ouchy.PLANE = ['plane'];
Ouchy.BEE = ['bee'];

Ouchy.prototype.setType = function (value) {
  this.type = value || Ouchy.PLANE;
  this.animations.add('normal', this.type, 2, true);
  this.animations.play('normal');
}

Ouchy.prototype.getSpeed = function () {
  if (this.type === Ouchy.PLANE) return 400;
  
  return 250;
}

module.exports = Ouchy;
