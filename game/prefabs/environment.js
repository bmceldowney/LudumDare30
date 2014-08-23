'use strict';

var Environment = function(game, x, y, w, h, back, mid, fore) {

  this.game = game;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.background = this.game.add.tileSprite(this.x, this.y, this.w, this.h, back);
  this.midground = this.game.add.tileSprite(this.x, this.y, this.w, this.h, mid);
  this.foreground = this.game.add.tileSprite(this.x, this.y + this.h - 77, this.w, 77, fore);

  this.background.autoScroll(-35, 0);
  this.midground.autoScroll(-60, 0);
  this.foreground.autoScroll(-90, 0);

  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);
};

Environment.Type = {
  TOP: 'top',
  BOTTOM: 'bottom'
};

Environment.create = function(game, type) {
  switch (type) {
    case Environment.Type.TOP:
      return new Environment(game, 0, 0, 960, 360, 'orange_stripes', 'black_clouds', 'street');
      break;
    case Environment.Type.BOTTOM:
      return new Environment(game, 0, 360, 960, 360, 'pink_stripes', 'blue_clouds', 'field');
      break;
  }
}

module.exports = Environment;
