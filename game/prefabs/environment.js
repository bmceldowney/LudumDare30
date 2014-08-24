'use strict';

var Cloud = require('./cloud');
var SadHappy = require('./sadhappy');
var Ouchy = require('./ouchy');
var Rock = require('./rock');
var Hud = require('./hud');
var Group = require('../groups/group');
var Rnd = require('../services/random');
var BACKGROUND_SPEED = -35;
var MIDGROUND_SPEED = -65;
var FOREGROUND_SPEED = -90;
var OUCHY_SPEED = -300;

var Environment = function(game, x, y, w, h, back, mid, fore, type) {

  this.game = game;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.type = type;

  this.background = this.game.add.tileSprite(this.x, this.y, this.w, this.h, back);
  this.background.autoScroll(BACKGROUND_SPEED, 0);

  this.clouds = new Group(this.game);
  this.clouds.classType = Cloud;
  this.game.add.existing(this.clouds);

  this.foreground = this.game.add.tileSprite(this.x, this.y + this.h - 77, this.w, 77, fore);
  this.foreground.autoScroll(FOREGROUND_SPEED, 0);
  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);
  this.foreground.body.offset = new Phaser.Point(0, 30);
  this.foreground.body.allowGravity = false;
  this.foreground.body.immovable = true;

  this.sadhappies = new Group(this.game);
  this.sadhappies.classType = SadHappy;
  this.game.add.existing(this.sadhappies);

  this.rocks = new Group(this.game);
  this.rocks.classType = Rock;
  this.game.add.existing(this.rocks);
  
  this.ouchies = new Group(this.game);
  this.ouchies.classType = Ouchy;
  this.game.add.existing(this.ouchies);

  this.hud = new Hud(this.game, this.x + 40, this.y + this.h - 26);

  this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, this.generateCloud, this);
  this.generateThings();
};

Environment.FOREGROUND_SPEED = FOREGROUND_SPEED;

Environment.Type = {
  TOP: 'top',
  BOTTOM: 'bottom'
};

Environment.create = function(game, type) {

  switch (type) {

    case Environment.Type.TOP:
      return new Environment(game, -30, 0, 1020, 360, 'orange_stripes', 'black_clouds', 'street', type);
      break;

    case Environment.Type.BOTTOM:
      return new Environment(game, -30, 360, 1020, 360, 'pink_stripes', 'blue_clouds', 'field', type);
      break;
  }
}

Environment.prototype = {};

Environment.prototype.update = function() {
  this.game.physics.arcade.collide(this.foreground, this.sadhappies);
  this.game.physics.arcade.collide(this.foreground, this.rocks);
  this.hud.update();
}

Environment.prototype.generateCloud = function() {
  var cloud = this.clouds.spawn(this.w, Rnd.realInRange(this.y, this.y + this.h - 120));
  cloud.setType(Cloud.randomType());
  cloud.body.velocity = new Phaser.Point(MIDGROUND_SPEED, 0);
}

Environment.prototype.generateSadHappy = function() {
  var sadhappy = this.sadhappies.spawn(this.w - 45, this.y);
  sadhappy.body.velocity = new Phaser.Point(FOREGROUND_SPEED, 0);
}

Environment.prototype.generateDuaneJohnson = function() {
  var duaneJohnson = this.rocks.spawn(this.w - 45, this.h + this.y - 110);
  duaneJohnson.body.velocity = new Phaser.Point(FOREGROUND_SPEED, 0);
}

Environment.prototype.generateThings = function() {
  if (Rnd.integerInRange(0,1)) {
    this.generateSadHappy();
  }
  else {
    this.generateDuaneJohnson();
  }
  this.game.time.events.add(Phaser.Timer.SECOND * Rnd.realInRange(1,3), this.generateThings, this);
}

Environment.prototype.generateOuchy = function () {
  var ouchy = this.ouchies.spawn(this.w - 45, this.y + this.h - 90);

  if (this.type === Environment.Type.BOTTOM) {
    ouchy.setType(Ouchy.BEE);
  }
  
  ouchy.body.velocity = new Phaser.Point(FOREGROUND_SPEED - ouchy.getSpeed(), 0);
}

module.exports = Environment;
