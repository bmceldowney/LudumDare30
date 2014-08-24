'use strict';
var Queue = require('../lib/queue.js');
var _ = require('underscore');

var World = function () {
    this.queue = new Queue();
};

World.prototype.pushState = function (state) {
    this.queue.enqueue(state);
};

World.prototype.getQueue = function () {
    var queueClone = _.clone(this.queue);
    this.queue = new Queue();
    return queueClone;
};

module.exports = new World();
