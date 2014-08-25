var Music = function () {
}

Music.prototype.init = function (game) {
  this.game = game;
  this.mainMusic = this.game.add.audio('theme', 1, true);
  this.altMusic = this.game.add.audio('altTheme', 1, true);
  this.victoryMusic = this.game.add.audio('victory', 1, false);
}

Music.prototype.stopAll = function () {
  this.mainMusic.stop();
  this.victoryMusic.stop();
  this.altMusic.stop();
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

module.exports = new Music();