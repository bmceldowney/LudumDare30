'use strict';

var Environment = require('../prefabs/environment.js');
var Actor = require('../prefabs/actor.js');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1500;

    this.top = Environment.create(this.game, Environment.Type.TOP);
    this.bottom = Environment.create(this.game, Environment.Type.BOTTOM);

    this.robot = this.game.add.existing(new Actor(this.game, 20, 0, 0, 'robot'));
      this.robot.animations.add('walk');
      this.robot.animations.play('walk', 12, true);
    this.game.physics.enable(this.robot, Phaser.Physics.ARCADE);

    this.kid = this.game.add.existing(new Actor(this.game, 20, 360, 0, 'kid'));
      this.kid.animations.add('walk');
      this.kid.animations.play('walk', 12, true);
    this.game.physics.enable(this.kid, Phaser.Physics.ARCADE);

    window.kid = this.kid;
  },

  update: function() {
    this.top.update();
    this.bottom.update();
    this.game.physics.arcade.collide(this.top.foreground, this.robot);
    this.game.physics.arcade.collide(this.bottom.foreground, this.kid);

    if (this.game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
      this.robot.body.velocity.y = -420;
      this.kid.body.velocity.y = -420;
    }
  },

  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
