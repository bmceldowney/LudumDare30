
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
    this.load.image('pink_stripes', 'assets/rolling_hills_background.png');
    this.load.image('orange_stripes', 'assets/city_background.png');
    this.load.image('street', 'assets/asphault_street.png');
    this.load.image('field', 'assets/grass_field.png');
    this.load.image('rocket', 'assets/rocket.png');
    this.load.image('rocketSide', 'assets/rocketSide.png');
    this.load.spritesheet('robot', 'assets/rosie_walk.png',78,140,10);
    this.load.spritesheet('kid', 'assets/stormie_walk_w_can.png',91,120,10);
    this.load.spritesheet('explosion', 'assets/boom3_0.png',64,64,64);
    this.load.atlas('blue_clouds', 'assets/bkg_blue-clouds.png', 'assets/bkg_blue-clouds.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas('black_clouds', 'assets/bkg_black-clouds.png', 'assets/bkg_black-clouds.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('rock', 'assets/rock-70.png');
    this.load.image('sadhappy', 'assets/sadhappy.png');
    this.load.spritesheet('heads', 'assets/heads.png', 50, 50);
    this.load.audio('theme', ['assets/8BitMetal.wav']);
    this.load.audio('altTheme', ['assets/HappyLevel.wav']);
    this.load.audio('victory', ['assets/VictoryMusic.wav']);
    this.load.audio('explosion1', '../assets/explosion1.wav', true);
    this.load.audio('explosion2', '../assets/explosion2.wav', true);
    this.load.audio('explosion3', '../assets/explosion3.wav', true);
    this.load.audio('rocketSound', '../assets/sfx_fly.mp3', true);
    this.load.audio('pop', '../assets/Picked Coin Echo.wav', true);
    this.load.audio('girlHurt1', '../assets/Female - Oof 1.wav', true);
    this.load.audio('girlHurt2', '../assets/Female - Ouch 1.wav', true);
    this.load.audio('bee', '../assets/bee1.wav', true);
    this.load.atlas('ouchies', 'assets/ouchies.png', 'assets/ouchies.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.bitmapFont('pixelation', 'assets/pixelation/pixelation.png', 'assets/pixelation/pixelation.fnt');
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      require('../services/music').init(this.game);
      // this.game.state.start('menu');
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
