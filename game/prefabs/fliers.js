'use strict';
var KEY = 'fliers';
var Fliers = function (game, x, y, frame, type) {
    Phaser.Sprite.call(this, game, x, y, KEY);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.anchor.x = 0;
    this.anchor.y = 0;
    this.scale.x = .5;
    this.scale.y = .5;
    this.body.width *= .25;
    this.body.height = 25;
    this.setType();

};
Fliers.HELICOPTER = ['helicopter01', 'helicopter02', 'helicopter03']
Fliers.BUTTERFLY = ['butterfly01', 'butterfly02', 'butterfly03']

Fliers.prototype = Object.create(Phaser.Sprite.prototype);
Fliers.prototype.constructor = Fliers;

Fliers.prototype.makeSuperCool = function () {
    this.game.sound.play('pop');  

    this.kill();
};
Fliers.prototype.setType = function (value) {
    this.type = value || Fliers.HELICOPTER;
    this.animations.add('fly', this.type, 12, true);
    this.animations.play('fly');
};

module.exports = Fliers;
