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
  var initialVelocity = 2; // m/s2
  var finalVelocity = 2 * speedFactor; // m/s2
  var time = (time - this.startTime) / 1000; // s
  
  var distance = (initialVelocity + finalVelocity) time / 2; // m
  
  this.distance = Math.round(distance); // m
}

module.exports = new Distance();
