'use strict';

var Environment = require('./environment');
var speed = require('../services/gameSpeed');

var Actor = function(game, x, y, frame, type) {
  Phaser.Sprite.call(this, game, x, y, type, frame);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.animations.add('walk', [0,1,2,3,4,5,6,7]);
  this.animations.add('ouch', [8,9]);

  this.body.collideWorldBounds = true;
  this.speed = 100;
  this.jumpForce = -1200;
  this.isOuched = false
  this.ouchDuration = .75 * 1000;
  this.health = 2;

  if (type == 'kid') {
    this.anchor.setTo(.3, 1);
    this.body.width = 32;
    this.body.offset.x = -8;
  }
  else if (type == 'robot') {
    this.anchor.setTo(.4, 1);
    this.body.width = 32;
    this.body.offset.x = -4;
    this.body.height = 120;
  }
};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.walkRight = function() {
  if (this.isOuched) return;

  this.scale.x = 1;
  this.body.facing = Phaser.RIGHT;
  this.body.velocity.x += this.speed + Math.abs(speed.getSpeed()) - Math.max(100, this.body.x - 100);
  this.animations.play('walk', 18, true);
}

Actor.prototype.walkLeft = function() {
  if (this.isOuched) return;

  this.scale.x = -1;
  this.body.facing = Phaser.LEFT;
  this.body.velocity.x -= this.speed + Math.abs(speed.getSpeed());
  this.animations.play('walk', 24, true);
}

Actor.prototype.stopWalking = function() {
  if (this.isOuched) return;

  this.scale.x = 1;
  this.body.facing = Phaser.RIGHT;
  this.animations.play('walk', 12, true);
}

Actor.prototype.update = function () {
  if (this.isOuched) return;

  if (this.game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.body.touching.down) {
    this.body.velocity.y = this.jumpForce;
    this.body.velocity.x = 0;
  }
  else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    this.walkRight();
  }
  else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.walkLeft();
  }
  else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) == false &&
      this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) == false) {
    this.stopWalking();
  }
}

Actor.prototype.ouch = function () {
  if (this.isOuched) return;
  this.isOuched = true;
  this.game.time.events.add(this.ouchDuration, unOuch, this);
  this.animations.play('ouch', 10, true);
  this.body.velocity.y = this.jumpForce * .5;
  this.body.velocity.x = -100 + speed.getSpeed();
  this.health--;
  
  function unOuch () {
    this.isOuched = false;
    this.animations.play('walk', 12, true);
  }
}

module.exports = Actor;
