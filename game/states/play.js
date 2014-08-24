'use strict';

var Environment = require('../prefabs/environment.js');
var Actor = require('../prefabs/actor.js');
var ScoreKeeper = require('../services/scorekeeper');
var Rocket = require('../prefabs/rocket.js');
var JUMP_FORCE = -600;
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
    this.game.physics.arcade.collide(this.top.foreground, this.robot);
    this.game.physics.arcade.collide(this.top.rocks, this.robot);
    this.game.physics.arcade.collide(this.bottom.foreground, this.kid);
    this.game.physics.arcade.collide(this.bottom.rocks, this.kid);
    this.game.physics.arcade.collide(this.top.foreground, this.rocket, this.rocketEsplode, null, this);

    if (this.game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.kid.body.touching.down) {
      this.robot.body.velocity.y = JUMP_FORCE;
      this.kid.body.velocity.y = JUMP_FORCE;
    }

    this.robot.body.velocity.x = -80;
    this.kid.body.velocity.x = -80;

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.robot.body.velocity.x += 220;
      this.kid.body.velocity.x += 220;
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.robot.body.velocity.x -= 100;
      this.kid.body.velocity.x -= 100;
    }
    
    if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {

      this.rocket.fire(this.robot);
      this.game.physics.arcade.overlap(this.robot, this.top.sadhappies, function(robot, sadhappy) {
        if (sadhappy.superCool == false) {
          sadhappy.makeSuperCool();
          ScoreKeeper.robot += 10;
          this.bottom.generateOuchy();
        }
      }, null, this);

      this.game.physics.arcade.overlap(this.kid, this.bottom.sadhappies, function(kid, sadhappy) {
        if (sadhappy.superCool == false) {
          sadhappy.makeSuperCool();
          ScoreKeeper.kid += 10;
          this.top.generateOuchy();
        }
      }, null, this);
    }
  },
  
  rocketEsplode: function (ground, rocket) {
    rocket.kill();
    var explosion = this.game.add.sprite(rocket.body.x, rocket.body.y, 'explosion');
    
    explosion.animations.add('initial', null, 8);
    explosion.animations.play('initial');
  },
  
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
