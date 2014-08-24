'use strict';

var Environment = require('../prefabs/environment.js');
var Actor = require('../prefabs/actor.js');
var ScoreKeeper = require('../services/scorekeeper');
var Rocket = require('../prefabs/rocket.js');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1500;

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
    this.game.physics.arcade.collide(this.top.foreground, this.rocket, this.rocketEsplode);

    if (this.game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
      this.robot.body.velocity.y = -420;
      this.kid.body.velocity.y = -420;
    }

    if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {

      this.fireRocket();
      this.game.physics.arcade.overlap(this.robot, this.top.sadhappies, function(robot, sadhappy) {
        if (sadhappy.superCool == false) {
        sadhappy.makeSuperCool();
          ScoreKeeper.robot += 10;
        }
      });

      this.game.physics.arcade.overlap(this.kid, this.bottom.sadhappies, function(kid, sadhappy) {
        if (sadhappy.superCool == false) {
        sadhappy.makeSuperCool();
          ScoreKeeper.kid += 10;
        }
      });
    }
    
    // this.game.debug.body(this.rocket);
  },
  
  fireRocket: function () {
    var x = this.robot.body.x + 30;
    var y = this.robot.body.y + 60;

    this.rocket.reset(x, y, 1);
    this.rocket.body.velocity = new Phaser.Point(120, 100);
  },
  
  rocketEsplode: function (ground, rocket) {
    rocket.kill();        
  },
  
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
