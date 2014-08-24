'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(960, 720, Phaser.AUTO, 'ludum-dare-30');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};