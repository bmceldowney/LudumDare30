'use strict';

var Cloud = require('./cloud');
var SadHappy = require('./sadhappy');
var Group = require('../groups/group');
var Rnd = require('../services/random');
var BACKGROUND_SPEED = -35;
var MIDGROUND_SPEED = -65;
var FOREGROUND_SPEED = -90;
var Environment = function(game, x, y, w, h, back, mid, fore) {

  this.game = game;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.background = this.game.add.tileSprite(this.x, this.y, this.w, this.h, back);
  this.background.autoScroll(BACKGROUND_SPEED, 0);

  this.clouds = new Group(this.game);
  this.clouds.classType = Cloud;
  this.game.add.existing(this.clouds);

  this.foreground = this.game.add.tileSprite(this.x, this.y + this.h - 40, this.w, 40, fore);
  this.foreground.autoScroll(FOREGROUND_SPEED, 0);
  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);
  this.foreground.body.offset = new Phaser.Point(0, 10);
  this.foreground.body.allowGravity = false;
  this.foreground.body.immovable = true;

  this.sadhappies = new Group(this.game);
  this.sadhappies.classType = SadHappy;
  this.game.add.existing(this.sadhappies);

  this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, this.generateCloud, this);
  this.game.time.events.loop(Phaser.Timer.SECOND * 3, this.generateSadHappy, this);

  this.generateSadHappy();
};

Environment.Type = {
  TOP: 'top',
  BOTTOM: 'bottom'
};

Environment.create = function(game, type) {

  switch (type) {

    case Environment.Type.TOP:
      return new Environment(game, -30, 0, 1020, 360, 'orange_stripes', 'black_clouds', 'street');
      break;

    case Environment.Type.BOTTOM:
      return new Environment(game, -30, 360, 1020, 360, 'pink_stripes', 'blue_clouds', 'field');
      break;
  }
}

Environment.prototype = {};
Environment.prototype.update = function() {
    this.game.physics.arcade.collide(this.foreground, this.sadhappies);
}

Environment.prototype.generateCloud = function() {

  var cloud = this.clouds.spawn(this.w, Rnd.realInRange(this.y, this.y + this.h - 120));

  cloud.setType(Cloud.randomType());
  cloud.body.velocity = new Phaser.Point(MIDGROUND_SPEED, 0);
}

Environment.prototype.generateSadHappy = function() {

  var sadhappy = this.sadhappies.spawn(this.w - 45, Rnd.realInRange(this.y, this.y + this.h - 120));

  sadhappy.body.velocity = new Phaser.Point(FOREGROUND_SPEED, 0);
}

module.exports = Environment;
