  'use strict';

  function Play() {
  }

  Play.prototype = {

    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.top = {
        background: this.game.add.tileSprite(0,0,960,360,'orange_stripes')
      };

      this.bottom = {
        background: this.game.add.tileSprite(0,360,960,360,'pink_stripes')
      };

      this.top.background.autoScroll(-60, 0);
      this.bottom.background.autoScroll(-60, 0);
    },

    update: function() {

    },

    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;