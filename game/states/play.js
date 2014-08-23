  'use strict';

  function Play() {
  }

  Play.prototype = {

    create: function() {

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.top = {
        background: this.game.add.tileSprite(0, 0, 960, 360, 'orange_stripes'),
        midground: this.game.add.tileSprite(0, 0, 960, 360, 'black_clouds'),
        foreground: this.game.add.tileSprite(0, 283, 960, 77, 'street')
      };

      this.bottom = {
        background: this.game.add.tileSprite(0, 360, 960, 360, 'pink_stripes'),
        midground: this.game.add.tileSprite(0, 360, 960, 360, 'blue_clouds'),
        foreground: this.game.add.tileSprite(0, 643, 960, 77, 'field')
      };

      this.top.background.autoScroll(-35, 0);
      this.top.midground.autoScroll(-60, 0);
      this.top.foreground.autoScroll(-90, 0);

      this.bottom.background.autoScroll(-35, 0);
      this.bottom.midground.autoScroll(-60, 0);
      this.bottom.foreground.autoScroll(-90, 0);
    },

    update: function() {

    },

    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;