var Music = function () {
}

Music.prototype.init = function (game) {
  this.game = game;
  this.mainMusic = this.game.add.audio('theme', 1, true);
  this.victoryMusic = this.game.add.audio('victory', 1, false);
}

Music.prototype.stopAll = function () {
  this.mainMusic.stop();
}

Music.prototype.playMainMusic = function () {
  this.stopAll();
  this.mainMusic.play();
}

Music.prototype.playVictoryMusic = function () {
  this.stopAll();
  this.victoryMusic.play();
}

module.exports = new Music();