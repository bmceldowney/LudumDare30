'use strict';

var Rock = function(game, x, y, frame, type) {
    Phaser.Sprite.call(this, game, x, y, 'rock');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
};

Rock.prototype = Object.create(Phaser.Sprite.prototype);
Rock.prototype.constructor = Rock;

Rock.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Rock;
