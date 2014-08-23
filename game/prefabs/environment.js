'use strict';

var Cloud = require('./cloud');
var Group = require('../groups/group');
var Rnd = require('../services/random');
var Environment = function(game, x, y, w, h, back, mid, fore) {

  this.game = game;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.background = this.game.add.tileSprite(this.x, this.y, this.w, this.h, back);

  this.clouds = new Group(this.game);
  this.clouds.classType = Cloud;

  this.game.add.existing(this.clouds);
  this.foreground = this.game.add.tileSprite(this.x, this.y + this.h - 40, this.w, 40, fore);

  this.background.autoScroll(-35, 0);
  this.foreground.autoScroll(-90, 0);

  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);
  this.foreground.body.allowGravity = false;
  this.foreground.body.immovable = true;

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

Environment.prototype = {};

Environment.prototype.update = function() {

  if ((Math.random() * 100) << 0 == 42) {

    var cloud = this.clouds.spawn(this.w, Rnd.realInRange(this.y, this.y + this.h - 40));

    cloud.setType(Cloud.randomType());
    cloud.body.velocity = new Phaser.Point(Rnd.realInRange(-60, -65), 0);
    this.game.physics.arcade.collide(cloud, this.clouds, function(one, two) {
      if (one !== two) {
        one.kill();
      }
    });
  }
}

module.exports = Environment;
