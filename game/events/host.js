'use strict';

var World = require('../services/world.js');

var HostEvent = function () {
};

HostEvent.prototype.calculateState = function (action) {
      //do some physicsy stuff
    var state ={actor:'kid',action:'jump'};
    World.pushState(state);
};

module.exports = new HostEvent();

