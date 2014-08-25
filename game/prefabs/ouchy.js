'use strict';

var KEY = 'ouchies';

var Ouchy = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, KEY, frame);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.outOfBoundsKill = true;
  this.body.allowGravity = false;
  this.body.width = 24;
  this.setType();
  this.explosion = this.game.add.sprite(this.body.x, this.body.y, 'explosion');
};

Ouchy.prototype = Object.create(Phaser.Sprite.prototype);
Ouchy.prototype.constructor = Ouchy;

Ouchy.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Ouchy.PLANE = ['plane'];
Ouchy.BEE = ['bee01', 'bee02'];

Ouchy.prototype.setType = function (value) {
  this.type = value || Ouchy.PLANE;
  this.animations.add('normal', this.type, 12, true);
  this.animations.play('normal');
}

Ouchy.prototype.getSpeed = function () {
  if (this.type === Ouchy.PLANE) return 400;
  
  return 250;
}

Ouchy.prototype.kill = function () {
  if (this.type === Ouchy.PLANE) {
    var number = Math.floor(Math.random() * 3) + 1;
    this.game.sound.play('explosion' + number);  
    this.explosion.reset(this.body.x - (this.explosion.width / 2), this.body.y - (this.height / 2) - (this.explosion.height / 2), 'explosion');
    
    this.explosion.animations.add('initial', null, 256);
    this.explosion.animations.play('initial');
    this.game.time.events.add(Phaser.Timer.SECOND * .5, this.explosion.kill, this.explosion);

  } else {
    var number = Math.floor(Math.random() * 2) + 1;
    this.game.sound.play('girlHurt' + number, .75);  
  }
  
  Phaser.Sprite.prototype.kill.call(this);
}

module.exports = Ouchy;
