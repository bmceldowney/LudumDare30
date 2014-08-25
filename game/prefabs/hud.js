"use strict";
var distance = require('../services/distance');

var Hud = function(game, x, y) {

  this.game = game;
  this.score = 0;
  this.lives = 2;

  this.scoreText = this.game.add.bitmapText(x + 40, y + 335, 'pixelation', '0', 18);
  this.scoreText.align = 'left';
  this.scoreText.updateTransform();

  this.head = this.game.add.sprite(x + 30, y + 10, 'heads', 0);

  this.livesText = this.game.add.bitmapText(x + 80, y + 20, 'pixelation', 'x2', 18);
  this.livesText.align = 'left';
  this.livesText.updateTransform();

  this.distanceText = this.game.add.bitmapText(x + 150, y + 335, 'pixelation', distance.getDistance() + "m", 18);
  this.distanceText.align = 'left';
  this.distanceText.updateTransform();
}

Hud.prototype = {};

Hud.prototype.update = function() {
  this.livesText.text = 'x' + this.lives;
  this.livesText.updateTransform();
  this.scoreText.text = this.score;
  this.scoreText.updateTransform();
  this.distanceText.text = distance.getDistance() + "m";
  this.distanceText.updateTransform();
}

module.exports = Hud;