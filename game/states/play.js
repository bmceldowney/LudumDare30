'use strict';

var Environment = require('../prefabs/environment.js');
var Actor = require('../prefabs/actor.js');

function Play() {}

Play.prototype = {

  create: function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 500;

    this.top = Environment.create(this.game, Environment.Type.TOP);
    this.bottom = Environment.create(this.game, Environment.Type.BOTTOM);

    this.robot = this.game.add.existing(new Actor(this.game, 20, 0, 0, 'robot'));
    this.game.physics.enable(this.robot, Phaser.Physics.ARCADE);

    this.kid = this.game.add.existing(new Actor(this.game, 20, 360, 0, 'kid'));
      this.kid.animations.add('walk');
      this.kid.animations.play('walk', 12, true);
    this.game.physics.enable(this.kid, Phaser.Physics.ARCADE);
  },

  update: function() {
    this.game.physics.arcade.collide(this.top.foreground, this.robot);
    this.game.physics.arcade.collide(this.bottom.foreground, this.kid);
  },

  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
