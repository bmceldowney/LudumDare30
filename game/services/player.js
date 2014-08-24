'use strict';
var Host = require('../events/host.js');

var Player = function(){};

Player.prototype.currentPlayer = function(){
    return ['robot','kid'];
};

Player.prototype.sendAction = function(action){
    Host.calculateState(action);
};

module.exports = Player;
