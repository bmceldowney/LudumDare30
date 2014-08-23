
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
    this.load.image('street', 'assets/frg_street.png');
    this.load.image('field', 'assets/frg_field.png');
    this.load.image('robot', 'assets/p1_jump.png');
    this.load.spritesheet('kid', 'assets/stormie_walk.png',61,120,8);
    this.load.atlas('blue_clouds', 'assets/bkg_blue-clouds.png', 'assets/bkg_blue-clouds.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas('black_clouds', 'assets/bkg_black-clouds.png', 'assets/bkg_black-clouds.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      // this.game.state.start('menu');
      this.game.state.start('play');

    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
