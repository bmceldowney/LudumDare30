'use strict';

var Rnd = require('../services/random');
var Cloud = function(game, x, y, type) {
    Phaser.Sprite.call(this, game, x, y, 'blue_clouds');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.setType(type);
};

Cloud.A = ['blue-cloud_0'];
Cloud.B = ['blue-cloud_1'];
Cloud.C = ['blue-cloud_2'];
Cloud.D = ['blue-cloud_3'];
Cloud.E = ['blue-cloud_4'];
Cloud.F = ['blue-cloud_5'];
Cloud.G = ['blue-cloud_6'];
Cloud.H = ['blue-cloud_7'];
Cloud.I = ['blue-cloud_8'];
Cloud.Types = [
    Cloud.A,
    Cloud.B,
    Cloud.C,
    Cloud.D,
    Cloud.E,
    Cloud.F,
    Cloud.G,
    Cloud.H,
    Cloud.I
];

Cloud.randomType = function() {
    return Rnd.pick(Cloud.Types);
}

Cloud.prototype = Object.create(Phaser.Sprite.prototype);
Cloud.prototype.constructor = Cloud;
module.exports = Cloud;

Cloud.prototype.reset = function(x, y, health, type) {
    Phaser.Sprite.prototype.reset.call(this, x, y, health);
    this.setType(type || this.type);
};

Cloud.prototype.setType = function(value) {
    this.type = value || Cloud.A;
    this.animations.add('normal', this.type, 2, true);
    this.animations.play('normal');
};
