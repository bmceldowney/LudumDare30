'use strict';

var Environment = require('../prefabs/environment.js');
var Actor = require('../prefabs/actor.js');
var ScoreKeeper = require('../services/scorekeeper');
var Rocket = require('../prefabs/rocket.js');
var GRAVITY = 2000;

function Play() {}

Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = GRAVITY;

    this.top = Environment.create(this.game, Environment.Type.TOP);
    this.bottom = Environment.create(this.game, Environment.Type.BOTTOM);

    this.robot = this.game.add.existing(new Actor(this.game, 120, 0, 0, 'robot'));
    this.kid = this.game.add.existing(new Actor(this.game, 120, 360, 0, 'kid'));
    this.rocket = this.game.add.existing(new Rocket(this.game, 20, 0, 0));

    ScoreKeeper.reset();
  },

  update: function() {

    this.top.hud.score = ScoreKeeper.robot;
    this.top.update();

    this.bottom.hud.score = ScoreKeeper.kid;
    this.bottom.update();

    this.robot.body.velocity.x = Environment.FOREGROUND_SPEED;
    this.game.physics.arcade.collide(this.top.foreground, this.robot);
    this.game.physics.arcade.collide(this.top.rocks, this.robot, function(sprite, rock) {
      sprite.body.velocity.x = 0;
    });

    this.kid.body.velocity.x = Environment.FOREGROUND_SPEED;
    this.game.physics.arcade.collide(this.bottom.foreground, this.kid);
    this.game.physics.arcade.collide(this.bottom.rocks, this.kid, function(sprite, rock) {
      sprite.body.velocity.x = 0;
    });

    this.game.physics.arcade.collide(this.top.foreground, this.rocket, this.rocketEsplode, null, this);
    this.game.physics.arcade.overlap(this.kid, this.bottom.ouchies, this.onOuched, null, this);
    this.game.physics.arcade.overlap(this.robot, this.top.ouchies, this.onOuched, null, this);

    this.game.physics.arcade.overlap(this.top.sadhappies, this.rocket, function(rocket, sadhappy) {
      this.rocketEsplode(null, rocket);
      sadhappy.makeSuperCool();
      ScoreKeeper.robot += 10;
      this.bottom.generateOuchy();
    }, null, this);
    
    if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {

      !this.robot.isOuched && this.rocket.fire(this.robot);

      !this.kid.isOuched && this.game.physics.arcade.overlap(this.kid, this.bottom.sadhappies, function(kid, sadhappy) {
        if (sadhappy.superCool == false) {
          sadhappy.makeSuperCool();
          ScoreKeeper.kid += 10;
          this.top.generateOuchy();
        }
      }, null, this);
    }

    this.robot.update();
    this.kid.update();
  },
  
  onOuched: function (actor, ouchy) {
    actor.ouch();
  },

  rocketEsplode: function (ground, rocket) {
    rocket.kill();
    var explosion = this.game.add.sprite(rocket.body.x, rocket.body.y, 'explosion');
    
    explosion.animations.add('initial', null, 256);
    explosion.animations.play('initial');
    this.game.time.events.add(Phaser.Timer.SECOND * .5, explosion.kill, explosion);
  },
  
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
