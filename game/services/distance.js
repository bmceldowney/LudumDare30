var Distance = function () {
  this.startTime = null;

}

Distance.prototype.setStart = function (time) {
  this.distance = 0;
  this.startTime = time;
}

Distance.prototype.getDistance = function (time, speedFactor) {
  if (this.startTime === null) return;
  
  // assuming a base speed of 2 m/s
  this.distance = Math.round(((2 * speedFactor) * (time - this.startTime)) / 1000); // in meters
}

module.exports = new Distance();
