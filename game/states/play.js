'use strict';

var Environment = require('../prefabs/environment.js');
var Actor = require('../prefabs/actor.js');
var ScoreKeeper = require('../services/scorekeeper');
var Rocket = require('../prefabs/rocket.js');
var speed = require('../services/gameSpeed');
var music = require('../services/music');
var GRAVITY = 4000;

function Play() {}

Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = GRAVITY;
    speed.speedFactor = 1;

    this.top = Environment.create(this.game, Environment.Type.TOP);
    this.bottom = Environment.create(this.game, Environment.Type.BOTTOM);
    this.bottom.hud.head.frame = 1;

    this.robot = this.game.add.existing(new Actor(this.game, 120, 0, 0, 'robot'));
    this.kid = this.game.add.existing(new Actor(this.game, 120, 360, 0, 'kid'));
    this.rocket = this.game.add.existing(new Rocket(this.game, 20, 0, 0));

    this.game.time.events.loop(Phaser.Timer.SECOND, function () {
      speed.tick();
    });
    
    music.playMainMusic();
    ScoreKeeper.reset();
    
    this.game.sound.add('explosion1');
    this.game.sound.add('explosion2');
    this.game.sound.add('explosion3');
    this.game.sound.add('rocketSound');
    this.game.sound.add('pop');
    this.game.sound.add('girlHurt1');
    this.game.sound.add('girlHurt2');
    this.game.sound.add('bee');
  },

  update: function() {

    this.top.hud.score = ScoreKeeper.robot;
    this.top.hud.lives = this.robot.health;
    this.top.update();

    this.bottom.hud.score = ScoreKeeper.kid;
    this.bottom.hud.lives = this.kid.health;
    this.bottom.update();

    if (this.robot.isOuched == false) {
      this.robot.body.velocity.x = 0;
    }
    this.game.physics.arcade.collide(this.top.foreground, this.robot);
    this.game.physics.arcade.collide(this.top.rocks, this.robot, function(sprite, rock) {
      sprite.body.velocity.x = -1 * speed.getSpeed();
    });

    if (this.kid.isOuched == false) {
      this.kid.body.velocity.x = 0;
    }
    this.game.physics.arcade.collide(this.bottom.foreground, this.kid);
    this.game.physics.arcade.collide(this.bottom.rocks, this.kid, function(sprite, rock) {
      sprite.body.velocity.x = -1 * speed.getSpeed();
    });

    this.game.physics.arcade.collide(this.top.foreground, this.rocket, this.rocketEsplode, null, this);
    this.game.physics.arcade.overlap(this.kid, this.bottom.ouchies, this.onOuched, null, this);
    this.game.physics.arcade.overlap(this.robot, this.top.ouchies, this.onOuched, null, this);

    this.game.physics.arcade.overlap(this.kid, this.bottom.sadhappies, function(kid, sadhappy) {
      sadhappy.makeSuperCool();
      ScoreKeeper.kid += 10;
      this.top.generateOuchy();
    }, null, this);

    this.game.physics.arcade.overlap(this.robot, this.top.sadhappies, function(kid, sadhappy) {
      sadhappy.makeSuperCool();
      ScoreKeeper.robot += 10;
      this.bottom.generateOuchy();
    }, null, this);

    this.robot.update();
    this.kid.update();

    if (this.robot.health < 0 || this.kid.health < 0) {
      ScoreKeeper.robotDead = Boolean(this.robot.health < 0);
      ScoreKeeper.kidDead = Boolean(this.kid.health < 0);
      console.log(ScoreKeeper, this.robot.health, this.kid.health);
      this.game.state.start('gameover');
    }
  },
  
  onOuched: function (actor, ouchy) {
    actor.ouch();
    ouchy.kill();
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
