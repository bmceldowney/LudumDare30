var GameSpeed = function () {
  this.baseSpeed = -90;
  this.speedFactor = 1;
}

GameSpeed.prototype.tick = function () {
  this.speedFactor += .01;
}

GameSpeed.prototype.getSpeed = function () {
  return this.baseSpeed * this.speedFactor;
}

GameSpeed.prototype.getBackgroundSpeed = function () {
  return (this.baseSpeed * this.speedFactor) * .35;
}

GameSpeed.prototype.getMidgroundSpeed = function () {
  return (this.baseSpeed * this.speedFactor) * .7;
}

module.exports = new GameSpeed();