var speed = require('../services/gameSpeed');

var Distance = function () {
  this.startTime = null;

}

Distance.prototype.init = function (game) {
  this.game = game;
}

Distance.prototype.setStart = function () {
  this.distance = 0;
  this.startTime = this.game.time.now;
}

Distance.prototype.getDistance = function () {
  if (this.startTime === null) return;
  
  // assuming a base speed of 2 m/s
  var initialVelocity = 2; // m/s
  var finalVelocity = 2 * speed.speedFactor; // m/s
  var time = (this.game.time.now - this.startTime) / 1000; // s
  
  var distance = (initialVelocity + finalVelocity) * time / 2; // m
  
  return Math.round(distance);
}

module.exports = new Distance();
