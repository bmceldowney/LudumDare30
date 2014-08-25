'use strict';

var ScoreKeeper = require('../services/scorekeeper');
var music = require('../services/music');
var distance = require('../services/distance');

function GameOver() {}

GameOver.prototype = {

  preload: function () {

  },

  create: function () {
    this.titleText = this.game.add.bitmapText(this.game.world.centerX, 225, 'pixelation', 'GAME OVER', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    this.totalText = this.game.add.bitmapText(this.game.world.centerX, 385, 'pixelation', 'Score: ' + (ScoreKeeper.kid + ScoreKeeper.robot), 32);
    this.totalText.updateTransform();
    this.totalText.x = this.game.width / 2 - this.totalText.textWidth / 2;

    this.distanceText = this.game.add.bitmapText(this.game.world.centerX, 425, 'pixelation', 'Distance: ' + distance.getDistance() + ' meters', 32);
    this.distanceText.updateTransform();
    this.distanceText.x = this.game.width / 2 - this.distanceText.textWidth / 2;

    var wendy = this.game.add.sprite(this.game.world.centerX - 80, 290, 'heads', 0);
    wendy.anchor.x = .5;
    wendy.frame = (ScoreKeeper.robotDead) ? 2 : 0;
    this.wendyText = this.game.add.bitmapText(this.game.world.centerX - 80, 345, 'pixelation', String(ScoreKeeper.robot), 18);
    this.wendyText.align = 'center';
    this.wendyText.x = this.game.width / 2 - this.wendyText.textWidth / 2 - 80;
    this.wendyText.updateTransform();

    this.plusSign = this.game.add.bitmapText(this.game.world.centerX, 305, 'pixelation', '+', 38);
    this.plusSign.updateTransform();
    this.plusSign.x = this.game.width / 2 - this.plusSign.textWidth / 2;

    var stormy = this.game.add.sprite(this.game.world.centerX + 80, 290, 'heads', 1);
    stormy.anchor.x = .5;
    stormy.frame = (ScoreKeeper.kidDead) ? 3 : 1;
    this.stormyText = this.game.add.bitmapText(this.game.world.centerX + 80, 345, 'pixelation', String(ScoreKeeper.kid), 18);
    this.stormyText.align = 'center';
    this.stormyText.x = this.game.width / 2 - this.stormyText.textWidth / 2 + 80;
    this.stormyText.updateTransform();

    music.playVictoryMusic();

    this.pressSpacebar = this.game.add.bitmapText(this.game.width * .5, this.game.height * .67, 'pixelation', 'PRESS SPACEBAR TO RESTART', 22);
    this.pressSpacebar.updateTransform();
    this.pressSpacebar.x = this.game.width / 2 - this.pressSpacebar.textWidth / 2;

    this.game.time.events.loop(400, function() {
      if (!!this.pressSpacebar) {
        this.pressSpacebar.destroy();
        this.pressSpacebar = null;
      }
      else {
        this.pressSpacebar = this.game.add.bitmapText(this.game.width * .5, this.game.height * .67, 'pixelation', 'PRESS SPACEBAR TO RESTART', 22);
        this.pressSpacebar.updateTransform();
        this.pressSpacebar.x = this.game.width / 2 - this.pressSpacebar.textWidth / 2;
      }
    }, this);
  },

  update: function () {
    if(this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;
