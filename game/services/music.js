var Music = function () {
}

Music.prototype.init = function (game) {
  this.game = game;
  this.mainMusic = this.game.add.audio('theme', 1, true);
  this.altMusic = this.game.add.audio('altTheme', 1, true);
  this.victoryMusic = this.game.add.audio('victory', 1, false);
  this.introMusic = this.game.add.audio('intro', 1, true);
}

Music.prototype.stopAll = function () {
  this.mainMusic.stop();
  this.victoryMusic.stop();
  this.altMusic.stop();
  this.introMusic.stop();
}

Music.prototype.playMainMusic = function () {
  this.stopAll();
  var number = Math.floor(Math.random() * 2) + 1;
  if (number > 1) {
    this.mainMusic.play();
  } else {
    this.altMusic.play();
  }
}

Music.prototype.playVictoryMusic = function () {
  this.stopAll();
  this.victoryMusic.play();
}

Music.prototype.playIntroMusic = function () {
  this.stopAll();
  this.introMusic.play();
}

module.exports = new Music();