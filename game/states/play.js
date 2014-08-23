'use strict';

var Environment = require('../prefabs/environment.js');
var Actor = require('../prefabs/actor.js');

function Play() {}

Play.prototype = {

  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.top = Environment.create(this.game, Environment.Type.TOP);
    this.bottom = Environment.create(this.game, Environment.Type.BOTTOM);

    this.robot = this.game.add.existing(new Actor(this.game, 20, 240, 0, 'robot'));
    this.kid = this.game.add.existing(new Actor(this.game, 20, 600, 0, 'kid'));
  },

  update: function() {

  },

  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
