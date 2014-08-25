
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    this.asset = this.add.sprite(this.game.width * .5, this.game.height * .7, 'preloader');
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
    this.load.atlas('fliers', 'assets/fliers.png', 'assets/fliers.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.spritesheet('heads', 'assets/heads.png', 50, 50);
    this.load.audio('theme', ['assets/8BitMetal.wav']);
    this.load.audio('altTheme', ['assets/HappyLevel.wav']);
    this.load.audio('intro', ['assets/IntroLoop.wav']);
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
    if(!!this.ready && this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    var music = require('../services/music');
    music.init(this.game);
    
    music.playIntroMusic();
    this.asset.kill();

    this.titleText = this.game.add.bitmapText(this.game.width * .5, this.game.height * .4, 'pixelation', '"TOGETHER"', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    this.ready = true;

    this.pressSpacebar = this.game.add.bitmapText(this.game.width * .5, this.game.height * .67, 'pixelation', 'PRESS SPACEBAR TO PLAY', 22);
    this.pressSpacebar.updateTransform();
    this.pressSpacebar.x = this.game.width / 2 - this.pressSpacebar.textWidth / 2;

    this.game.time.events.loop(400, function() {
      if (!!this.pressSpacebar) {
        this.pressSpacebar.destroy();
        this.pressSpacebar = null;
      }
      else {
        this.pressSpacebar = this.game.add.bitmapText(this.game.width * .5, this.game.height * .67, 'pixelation', 'PRESS SPACEBAR TO PLAY', 22);
        this.pressSpacebar.updateTransform();
        this.pressSpacebar.x = this.game.width / 2 - this.pressSpacebar.textWidth / 2;
      }
    }, this);
  }
};

module.exports = Preload;
