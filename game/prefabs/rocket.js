'use strict';

var Rocket = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'rocket', frame);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.allowGravity = false;
  this.kill();
  this.readyToFire = true;
  this.refireDelay = 1 * 1000;
};

Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.prototype.constructor = Rocket;

Rocket.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Rocket.prototype.fire = function (robot) {
  if (this.alive || !this.readyToFire) return;
  var x = robot.body.x + 30;
  var y = robot.body.y + 60;

  this.reset(x, y, 1);
  this.readyToFire = false;
  this.scale.x = robot.scale.x;
  this.body.velocity = new Phaser.Point(robot.scale.x * 300, 200);
  this.game.time.events.add(this.refireDelay, recycle, this);
}
  
function recycle () {
  this.readyToFire = true;
}
  
module.exports = Rocket;
