'use strict';

var Environment = require('./environment');

var Actor = function(game, x, y, frame, type) {
  Phaser.Sprite.call(this, game, x, y, type, frame);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.animations.add('walk', [0,1,2,3,4,5,6,7]);
  this.animations.add('ouch', [8,9]);

  this.body.collideWorldBounds = true;
  this.anchor.setTo(.5, 1);
  this.speed = 200;
  this.jumpForce = -600;
  this.isOuched = false
  this.ouchDuration = .75 * 1000;
};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.walkRight = function() {
  if (this.isOuched) return;

  this.scale.x = 1;
  this.body.velocity.x += this.speed + Math.abs(Environment.FOREGROUND_SPEED);
  this.animations.play('walk', 12, true);
}

Actor.prototype.walkLeft = function() {
  if (this.isOuched) return;

  this.scale.x = -1;
  this.body.velocity.x -= (this.speed / 2) + Math.abs(Environment.FOREGROUND_SPEED);
  this.animations.play('walk', 12, true);
}

Actor.prototype.stopWalking = function() {
  if (this.isOuched) return;

  this.animations.stop();
  this.frame = 6;
}

Actor.prototype.update = function () {
  if (this.isOuched) return;

  this.body.velocity.x = Environment.FOREGROUND_SPEED;

  if (this.game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.body.touching.down) {
    this.body.velocity.y = this.jumpForce;
  }

  if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    this.walkRight();
  }

  if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.walkLeft();
  }
  
  if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) == false &&
      this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) == false) {
    this.stopWalking();
  }

}

Actor.prototype.ouch = function () {
  if (this.isOuched) return;
  this.isOuched = true;
  this.game.time.events.add(this.ouchDuration, unOuch, this);
  this.animations.play('ouch', 10, true);
  this.body.velocity.y += this.jumpForce;
  this.body.velocity.x = -100 + Environment.FOREGROUND_SPEED;
  
  function unOuch () {
    this.isOuched = false;
    this.animations.play('walk', 12, true);
  }
}

module.exports = Actor;
