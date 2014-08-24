"use strict";

var ScoreKeeper = function() {
    this.kid = 0;
    this.robot = 0;
}

ScoreKeeper.prototype = {};

ScoreKeeper.prototype.reset = function() {
    this.kid = 0;
    this.robot = 0;
}

module.exports = new ScoreKeeper();