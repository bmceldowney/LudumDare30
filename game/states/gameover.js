'use strict';

var ScoreKeeper = require('../services/scorekeeper');
var music = require('../services/music');

function GameOver() {}

GameOver.prototype = {

  preload: function () {

  },

  create: function () {
    this.titleText = this.game.add.bitmapText(this.game.world.centerX, 225, 'pixelation', 'GAME OVER', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    this.totalText = this.game.add.bitmapText(this.game.world.centerX, 285, 'pixelation', 'Score: ' + (ScoreKeeper.kid + ScoreKeeper.robot), 32);
    this.totalText.updateTransform();
    this.totalText.x = this.game.width / 2 - this.totalText.textWidth / 2;

    var wendy = this.game.add.sprite(this.game.world.centerX - 80, 330, 'heads', 0);
    wendy.anchor.x = .5;
    this.wendyText = this.game.add.bitmapText(this.game.world.centerX - 80, 385, 'pixelation', String(ScoreKeeper.robot), 18);
    this.wendyText.align = 'center';
    this.wendyText.x = this.game.width / 2 - this.wendyText.textWidth / 2 - 80;
    this.wendyText.updateTransform();

    this.plusSign = this.game.add.bitmapText(this.game.world.centerX, 345, 'pixelation', '+', 38);
    this.plusSign.updateTransform();
    this.plusSign.x = this.game.width / 2 - this.plusSign.textWidth / 2;

    var stormy = this.game.add.sprite(this.game.world.centerX + 80, 330, 'heads', 1);
    stormy.anchor.x = .5;
    this.stormyText = this.game.add.bitmapText(this.game.world.centerX + 80, 385, 'pixelation', String(ScoreKeeper.kid), 18);
    this.stormyText.align = 'center';
    this.stormyText.x = this.game.width / 2 - this.stormyText.textWidth / 2 + 80;
    this.stormyText.updateTransform();
    music.playVictoryMusic();
  },

  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;
