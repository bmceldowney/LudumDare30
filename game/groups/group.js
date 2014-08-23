function Group(game, parent, name, addToStage, enableBody, physicsBodyType) {
    Phaser.Group.call(this, game, parent, name, addToStage, enableBody, physicsBodyType);
    this.key = 'blue_clouds';
}

Group.prototype = Object.create(Phaser.Group.prototype);
Group.prototype.constructor = Group;
module.exports = Group;

Group.prototype.spawn = function(x, y, health) {

    var child = this.getFirstDead() || this.create(0, 0);

    child.reset(x || 0, y || 0, health || 1);
    return child;
};