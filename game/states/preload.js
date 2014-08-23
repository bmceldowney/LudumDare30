
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('pink_stripes', 'assets/bkg_pink-stripes.png');
    this.load.image('orange_stripes', 'assets/bkg_orange-stripes.png');
    this.load.image('blue_clouds', 'assets/bkg_blue-clouds.png');
    this.load.image('black_clouds', 'assets/bkg_black-clouds.png');
    this.load.image('street', 'assets/frg_street.png');
    this.load.image('field', 'assets/frg_field.png');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
