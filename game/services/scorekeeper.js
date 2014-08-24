"use strict";

var ScoreKeeper = function() {
    this.reset();
}

ScoreKeeper.prototype = {};

ScoreKeeper.prototype.reset = function() {
    this.kid = 0;
    this.robot = 0;
    this.kidDead = false;
    this.robotDead = false;
}

module.exports = new ScoreKeeper();