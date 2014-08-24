'use strict';

var Actor = function(game, x, y, frame, type) {
  Phaser.Sprite.call(this, game, x, y, type, frame);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.animations.add('walk');
  this.body.collideWorldBounds = true;
  this.anchor.setTo(.5, 1);
};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.walkRight = function() {
    this.scale.x = 1;
    this.body.velocity.x += 220;
    this.animations.play('walk', 12, true);
}

Actor.prototype.walkLeft = function() {
    this.scale.x = -1;
    this.body.velocity.x -= 180;
    this.animations.play('walk', 12, true);
}

Actor.prototype.stopWalking = function() {
    this.animations.stop();
    this.frame = 2;
}

module.exports = Actor;
