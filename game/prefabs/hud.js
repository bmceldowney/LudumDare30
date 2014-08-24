"use strict";

var Hud = function(game, x, y) {
  this.game = game;
  this.score = 0;
  this.scoreText = this.game.add.bitmapText(x, y, 'pixelation', '0', 18);
  this.scoreText.align = 'left';
  this.scoreText.updateTransform();
}

Hud.prototype = {};

Hud.prototype.update = function() {
  this.scoreText.text = this.score;
  this.scoreText.updateTransform();
}

module.exports = Hud;