'use strict';

var Actor = function(game, x, y, frame, type) {
  Phaser.Sprite.call(this, game, x, y, type, frame);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.animations.add('walk', [1,2,3,4,5,6,7,8]);
  this.animations.add('ouch', [9,10]);

  this.body.collideWorldBounds = true;
  this.anchor.setTo(.5, 1);
  this.speed = 300;
  this.isOuched = false
  this.ouchDuration = 1 * 1000;
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

Actor.prototype.ouch = function () {
  this.isOuched = true;
  this.game.time.events.add(this.ouchDuration, unOuch, this);
  this.animations.play('ouch', 10, true);
  this.body.velocity.y += -100;
  this.body.velocity.x += -100;
  
  function unOuch () {
    this.isOuched = false;
    this.animations.play('walk', 12, true);
  }
}

module.exports = Actor;
