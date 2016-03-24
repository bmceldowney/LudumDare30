(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(960, 720, Phaser.AUTO, 'ludum-dare-30');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":16,"./states/gameover":17,"./states/menu":18,"./states/play":19,"./states/preload":20}],3:[function(require,module,exports){
'use strict';

var Environment = require('./environment');
var speed = require('../services/gameSpeed');

var Actor = function(game, x, y, frame, type) {
  Phaser.Sprite.call(this, game, x, y, type, frame);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.animations.add('walk', [0,1,2,3,4,5,6,7]);
  this.animations.add('ouch', [8,9]);

  this.body.collideWorldBounds = true;
  this.speed = 60;
  this.jumpForce = -950;
  this.isOuched = false
  this.ouchDuration = .75 * 1000;
  this.health = 2;

  if (type == 'kid') {
    this.anchor.setTo(.3, 1);
    this.body.width = 32;
    this.body.offset.x = -8;
  }
  else if (type == 'robot') {
    this.anchor.setTo(.4, 1);
    this.body.width = 32;
    this.body.offset.x = -4;
    this.body.height = 120;
  }
};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.walkRight = function() {
  if (this.isOuched) return;

  this.scale.x = 1;
  this.body.facing = Phaser.RIGHT;

  if (this.body.touching.down) {
    this.body.velocity.x += this.speed + Math.abs(speed.getSpeed()) - Math.max(100, this.body.x - 100);
    this.animations.play('walk', 18, true);
  }
  else {
    this.body.velocity.x += this.speed + Math.abs(speed.getSpeed() * .5) - Math.max(100, this.body.x - 100);
  }
}

Actor.prototype.walkLeft = function() {
  if (this.isOuched) return;

  this.scale.x = -1;
  this.body.facing = Phaser.LEFT;

  if (this.body.touching.down) {
    this.body.velocity.x -= this.speed + Math.abs(speed.getSpeed());
    this.animations.play('walk', 12, true);
  }
  else {
    this.body.velocity.x -= this.speed + Math.abs(speed.getSpeed() * .5);
  }
}

Actor.prototype.stopWalking = function() {
  if (this.isOuched || this.body.touching.down == false) return;

  this.scale.x = 1;
  this.body.facing = Phaser.RIGHT;
  this.animations.play('walk', 12, true);
}

Actor.prototype.update = function () {
  if (this.isOuched) return;

  if (this.game.input.keyboard.justPressed(Phaser.Keyboard.UP) && this.body.touching.down) {
    this.animations.stop();
    this.frame = 3;
    this.body.velocity.y = this.jumpForce;
    this.body.velocity.x = 0;
  }
  else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    this.walkRight();
  }
  else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    this.walkLeft();
  }
  else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) == false &&
    this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) == false) {
    this.stopWalking();
  }
}

Actor.prototype.ouch = function () {
  if (this.isOuched) return;
  this.isOuched = true;
  this.game.time.events.add(this.ouchDuration, unOuch, this);
  this.animations.play('ouch', 10, true);
  this.body.velocity.y = this.jumpForce * .5;
  this.body.velocity.x = speed.getSpeed();
  this.health--;
  
  function unOuch () {
    this.isOuched = false;
    this.animations.play('walk', 12, true);
  }
}

module.exports = Actor;

},{"../services/gameSpeed":12,"./environment":5}],4:[function(require,module,exports){
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

},{"../services/random":14}],5:[function(require,module,exports){
'use strict';

var Cloud = require('./cloud');
var Fliers = require('./fliers');
var Ouchy = require('./ouchy');
var Rock = require('./rock');
var Hud = require('./hud');
var Group = require('../groups/group');
var Rnd = require('../services/random');
var speed = require('../services/gameSpeed');

var Environment = function(game, x, y, w, h, back, mid, fore, type) {

  this.game = game;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.type = type;

  this.background = this.game.add.tileSprite(this.x, this.y, this.w, this.h, back);
  this.background.autoScroll(speed.getBackgroundSpeed(), 0);

  this.clouds = new Group(this.game);
  this.clouds.classType = Cloud;
  this.game.add.existing(this.clouds);

  this.foreground = this.game.add.tileSprite(this.x, this.y + this.h - 77, this.w, 77, fore);
  this.foreground.autoScroll(speed.getSpeed(), 0);
  this.game.physics.enable(this.foreground, Phaser.Physics.ARCADE);
  this.foreground.body.offset = new Phaser.Point(0, 30);
  this.foreground.body.allowGravity = false;
  this.foreground.body.immovable = true;

  this.sadhappies = new Group(this.game);
  this.sadhappies.classType = Fliers;
  this.game.add.existing(this.sadhappies);

  this.rocks = new Group(this.game);
  this.rocks.classType = Rock;
  this.game.add.existing(this.rocks);

  this.ouchies = new Group(this.game);
  this.ouchies.classType = Ouchy;
  this.game.add.existing(this.ouchies);

  this.hud = new Hud(this.game, this.x, this.y);

  this.game.time.events.loop(Phaser.Timer.SECOND * 2.25, this.generateCloud, this);
  this.generateThings();
};

Environment.Type = {
  TOP: 'top',
  BOTTOM: 'bottom'
};

Environment.create = function(game, type) {

  switch (type) {

    case Environment.Type.TOP:
      return new Environment(game, -30, 0, 1020, 360, 'orange_stripes', 'black_clouds', 'street', type);
      break;

    case Environment.Type.BOTTOM:
      return new Environment(game, -30, 360, 1020, 360, 'pink_stripes', 'blue_clouds', 'field', type);
      break;
  }
}

Environment.prototype = {};

Environment.prototype.update = function() {
  this.game.physics.arcade.collide(this.foreground, this.sadhappies);
  this.game.physics.arcade.collide(this.foreground, this.rocks);
  this.hud.update();

  this.background.autoScroll(speed.getBackgroundSpeed(), 0);
  this.foreground.autoScroll(speed.getSpeed(), 0);
}

Environment.prototype.generateCloud = function() {
  var cloud = this.clouds.spawn(this.w, Rnd.realInRange(this.y, this.y + this.h - 120));
  cloud.setType(Cloud.randomType());
  cloud.body.velocity = new Phaser.Point(speed.getMidgroundSpeed(), 0);
}

Environment.prototype.generateSadHappy = function() {
  
  var sadhappy = this.sadhappies.spawn(this.w - 45, 0);
    if (this.type === Environment.Type.BOTTOM) {
        sadhappy.setType(Fliers.BUTTERFLY);
        sadhappy.y = Rnd.integerInRange(0,1) ? this.h + this.y - 110 : this.h + this.y - 220;
    }
    else {
        sadhappy.setType(Fliers.HELICOPTER);
        sadhappy.y = Rnd.integerInRange(0,1) ? this.h + this.y - 110 : this.h + this.y - 220;
    }
  sadhappy.body.velocity = new Phaser.Point(speed.getSpeed(), 0);
}

Environment.prototype.generateDuaneJohnson = function() {
  var duaneJohnson = this.rocks.spawn(this.w - 45, this.h + this.y - 110);
  duaneJohnson.body.velocity = new Phaser.Point(speed.getSpeed(), 0);
}

Environment.prototype.generateThings = function() {
  if (Rnd.integerInRange(0,1)) {
    this.generateSadHappy();
  }
  else {
    this.generateDuaneJohnson();
  }
  this.game.time.events.add(Phaser.Timer.SECOND - speed.speedFactor, this.generateThings, this);
}

Environment.prototype.generateOuchy = function () {
  var ouchy = this.ouchies.spawn(this.w - 45, this.y + this.h - 90);

  if (this.type === Environment.Type.BOTTOM) {
    ouchy.setType(Ouchy.BEE);
    this.game.sound.play('bee', .8);
  } else {
    this.game.sound.play('rocketSound', .8);
  }

  ouchy.body.velocity = new Phaser.Point(speed.getSpeed() - ouchy.getSpeed(), 0);
}

module.exports = Environment;

},{"../groups/group":1,"../services/gameSpeed":12,"../services/random":14,"./cloud":4,"./fliers":6,"./hud":7,"./ouchy":8,"./rock":9}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
"use strict";
var distance = require('../services/distance');

var Hud = function(game, x, y) {

  this.game = game;
  this.score = 0;
  this.lives = 2;

  this.scoreText = this.game.add.bitmapText(x + 40, y + 335, 'pixelation', '0', 18);
  this.scoreText.align = 'left';
  this.scoreText.updateTransform();

  this.head = this.game.add.sprite(x + 30, y + 10, 'heads', 0);

  this.livesText = this.game.add.bitmapText(x + 80, y + 20, 'pixelation', 'x2', 18);
  this.livesText.align = 'left';
  this.livesText.updateTransform();

  this.distanceText = this.game.add.bitmapText(x + 150, y + 335, 'pixelation', distance.getDistance() + "m", 18);
  this.distanceText.align = 'left';
  this.distanceText.updateTransform();
}

Hud.prototype = {};

Hud.prototype.update = function() {
  this.livesText.text = 'x' + this.lives;
  this.livesText.updateTransform();
  this.scoreText.text = this.score;
  this.scoreText.updateTransform();
  this.distanceText.text = distance.getDistance() + "m";
  this.distanceText.updateTransform();
}

module.exports = Hud;
},{"../services/distance":11}],8:[function(require,module,exports){
'use strict';

var KEY = 'ouchies';

var Ouchy = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, KEY, frame);
  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.outOfBoundsKill = true;
  this.body.allowGravity = false;
  this.body.width = 24;
  this.setType();
  this.explosion = this.game.add.sprite(this.body.x, this.body.y, 'explosion');
};

Ouchy.prototype = Object.create(Phaser.Sprite.prototype);
Ouchy.prototype.constructor = Ouchy;

Ouchy.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Ouchy.PLANE = ['plane'];
Ouchy.BEE = ['bee01', 'bee02'];

Ouchy.prototype.setType = function (value) {
  this.type = value || Ouchy.PLANE;
  this.animations.add('normal', this.type, 12, true);
  this.animations.play('normal');
}

Ouchy.prototype.getSpeed = function () {
  if (this.type === Ouchy.PLANE) return 400;
  
  return 250;
}

Ouchy.prototype.kill = function () {
  if (this.type === Ouchy.PLANE) {
    var number = Math.floor(Math.random() * 3) + 1;
    this.game.sound.play('explosion' + number);  
    this.explosion.reset(this.body.x - (this.explosion.width / 2), this.body.y - (this.height / 2) - (this.explosion.height / 2), 'explosion');
    
    this.explosion.animations.add('initial', null, 256);
    this.explosion.animations.play('initial');
    this.game.time.events.add(Phaser.Timer.SECOND * .5, this.explosion.kill, this.explosion);

  } else {
    var number = Math.floor(Math.random() * 2) + 1;
    this.game.sound.play('girlHurt' + number, .75);  
  }
  
  Phaser.Sprite.prototype.kill.call(this);
}

module.exports = Ouchy;

},{}],9:[function(require,module,exports){
'use strict';

var Rock = function(game, x, y, frame, type) {
    Phaser.Sprite.call(this, game, x, y, 'rock');
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
};

Rock.prototype = Object.create(Phaser.Sprite.prototype);
Rock.prototype.constructor = Rock;

Rock.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Rock;

},{}],10:[function(require,module,exports){
'use strict';

var Rocket = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'rocket', frame);

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.body.allowGravity = false;
  this.kill();
  this.readyToFire = true;
  this.refireDelay = 1 * 1000;
};

Rocket.prototype = Object.create(Phaser.Sprite.prototype);
Rocket.prototype.constructor = Rocket;

Rocket.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Rocket.prototype.fire = function (robot) {
  if (this.alive || !this.readyToFire) return;
  var x = robot.body.x + 30;
  var y = robot.body.y + 60;

  this.reset(x, y, 1);
  this.readyToFire = false;
  this.scale.x = robot.scale.x;
  this.body.velocity = new Phaser.Point(robot.scale.x * 300, 200);
  this.game.time.events.add(this.refireDelay, recycle, this);
}
  
function recycle () {
  this.readyToFire = true;
}
  
module.exports = Rocket;

},{}],11:[function(require,module,exports){
var speed = require('../services/gameSpeed');

var Distance = function () {
  this.startTime = null;

}

Distance.prototype.init = function (game) {
  this.game = game;
}

Distance.prototype.setStart = function () {
  this.distance = 0;
  this.startTime = this.game.time.now;
}

Distance.prototype.getDistance = function () {
  if (this.startTime === null) return;
  
  // assuming a base speed of 2 m/s
  var initialVelocity = 2; // m/s
  var finalVelocity = 2 * speed.speedFactor; // m/s
  var time = (this.game.time.now - this.startTime) / 1000; // s
  
  var distance = (initialVelocity + finalVelocity) * time / 2; // m
  
  return Math.round(distance);
}

module.exports = new Distance();

},{"../services/gameSpeed":12}],12:[function(require,module,exports){
var GameSpeed = function () {
  this.baseSpeed = -180;
  this.speedFactor = 1;
}

GameSpeed.prototype.tick = function () {
  this.speedFactor += .02;
}

GameSpeed.prototype.getSpeed = function () {
  return this.baseSpeed * this.speedFactor;
}

GameSpeed.prototype.getBackgroundSpeed = function () {
  return (this.baseSpeed * this.speedFactor) * .35;
}

GameSpeed.prototype.getMidgroundSpeed = function () {
  return (this.baseSpeed * this.speedFactor) * .7;
}

module.exports = new GameSpeed();
},{}],13:[function(require,module,exports){
var Music = function () {
}

Music.prototype.init = function (game) {
  this.game = game;
  this.mainMusic = this.game.add.audio('theme', 1, true);
  this.altMusic = this.game.add.audio('altTheme', 1, true);
  this.victoryMusic = this.game.add.audio('victory', 1, false);
  this.introMusic = this.game.add.audio('intro', 1, true);
}

Music.prototype.stopAll = function () {
  this.mainMusic.stop();
  this.victoryMusic.stop();
  this.altMusic.stop();
  this.introMusic.stop();
}

Music.prototype.playMainMusic = function () {
  this.stopAll();
  var number = Math.floor(Math.random() * 2) + 1;
  if (number > 1) {
    this.mainMusic.play();
  } else {
    this.altMusic.play();
  }
}

Music.prototype.playVictoryMusic = function () {
  this.stopAll();
  this.victoryMusic.play();
}

Music.prototype.playIntroMusic = function () {
  this.stopAll();
  this.introMusic.play();
}

module.exports = new Music();
},{}],14:[function(require,module,exports){
"use strict";

module.exports = new Phaser.RandomDataGenerator(['foo', 'bar', 'baz']);
},{}],15:[function(require,module,exports){
"use strict";

var ScoreKeeper = function() {
    this.reset();
}

ScoreKeeper.prototype = {};

ScoreKeeper.prototype.reset = function() {
    this.kid = 0;
    this.robot = 0;
    this.kidDead = false;
    this.robotDead = false;
}

module.exports = new ScoreKeeper();
},{}],16:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
    this.game.stage.disableVisibilityChange = true;
  }
};

module.exports = Boot;

},{}],17:[function(require,module,exports){
'use strict';

var ScoreKeeper = require('../services/scorekeeper');
var music = require('../services/music');
var distance = require('../services/distance');

function GameOver() {}

GameOver.prototype = {

  preload: function () {

  },

  create: function () {
    this.titleText = this.game.add.bitmapText(this.game.world.centerX, 225, 'pixelation', 'GAME OVER', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    this.totalText = this.game.add.bitmapText(this.game.world.centerX, 385, 'pixelation', 'Score: ' + (ScoreKeeper.kid + ScoreKeeper.robot), 32);
    this.totalText.updateTransform();
    this.totalText.x = this.game.width / 2 - this.totalText.textWidth / 2;

    this.distanceText = this.game.add.bitmapText(this.game.world.centerX, 425, 'pixelation', 'Distance: ' + distance.getDistance() + ' meters', 32);
    this.distanceText.updateTransform();
    this.distanceText.x = this.game.width / 2 - this.distanceText.textWidth / 2;

    var wendy = this.game.add.sprite(this.game.world.centerX - 80, 290, 'heads', 0);
    wendy.anchor.x = .5;
    wendy.frame = (ScoreKeeper.robotDead) ? 2 : 0;
    this.wendyText = this.game.add.bitmapText(this.game.world.centerX - 80, 345, 'pixelation', String(ScoreKeeper.robot), 18);
    this.wendyText.align = 'center';
    this.wendyText.x = this.game.width / 2 - this.wendyText.textWidth / 2 - 80;
    this.wendyText.updateTransform();

    this.plusSign = this.game.add.bitmapText(this.game.world.centerX, 305, 'pixelation', '+', 38);
    this.plusSign.updateTransform();
    this.plusSign.x = this.game.width / 2 - this.plusSign.textWidth / 2;

    var stormy = this.game.add.sprite(this.game.world.centerX + 80, 290, 'heads', 1);
    stormy.anchor.x = .5;
    stormy.frame = (ScoreKeeper.kidDead) ? 3 : 1;
    this.stormyText = this.game.add.bitmapText(this.game.world.centerX + 80, 345, 'pixelation', String(ScoreKeeper.kid), 18);
    this.stormyText.align = 'center';
    this.stormyText.x = this.game.width / 2 - this.stormyText.textWidth / 2 + 80;
    this.stormyText.updateTransform();

    music.playVictoryMusic();

    this.pressSpacebar = this.game.add.bitmapText(this.game.width * .5, this.game.height * .67, 'pixelation', 'PRESS SPACEBAR TO RESTART', 22);
    this.pressSpacebar.updateTransform();
    this.pressSpacebar.x = this.game.width / 2 - this.pressSpacebar.textWidth / 2;

    this.game.time.events.loop(400, function() {
      if (!!this.pressSpacebar) {
        this.pressSpacebar.destroy();
        this.pressSpacebar = null;
      }
      else {
        this.pressSpacebar = this.game.add.bitmapText(this.game.width * .5, this.game.height * .67, 'pixelation', 'PRESS SPACEBAR TO RESTART', 22);
        this.pressSpacebar.updateTransform();
        this.pressSpacebar.x = this.game.width / 2 - this.pressSpacebar.textWidth / 2;
      }
    }, this);
  },

  update: function () {
    if(this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{"../services/distance":11,"../services/music":13,"../services/scorekeeper":15}],18:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],19:[function(require,module,exports){
'use strict';

var Environment = require('../prefabs/environment.js');
var Actor = require('../prefabs/actor.js');
var ScoreKeeper = require('../services/scorekeeper');
var Rocket = require('../prefabs/rocket.js');
var speed = require('../services/gameSpeed');
var music = require('../services/music');
var distance = require('../services/distance');
var GRAVITY = 4000;

function Play() {}

Play.prototype = {

  create: function() {
    distance.setStart();
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = GRAVITY;
    speed.speedFactor = 1;

    this.top = Environment.create(this.game, Environment.Type.TOP);
    this.bottom = Environment.create(this.game, Environment.Type.BOTTOM);
    this.bottom.hud.head.frame = 1;

    this.robot = this.game.add.existing(new Actor(this.game, 120, 0, 0, 'robot'));
    this.kid = this.game.add.existing(new Actor(this.game, 120, 360, 0, 'kid'));
    this.rocket = this.game.add.existing(new Rocket(this.game, 20, 0, 0));

    this.game.time.events.loop(Phaser.Timer.SECOND, function () {
      speed.tick();
    });
    
    music.playMainMusic();
    ScoreKeeper.reset();
    
    this.game.sound.add('explosion1');
    this.game.sound.add('explosion2');
    this.game.sound.add('explosion3');
    this.game.sound.add('rocketSound');
    this.game.sound.add('pop');
    this.game.sound.add('girlHurt1');
    this.game.sound.add('girlHurt2');
    this.game.sound.add('bee');
  },

  update: function() {

    this.top.hud.score = ScoreKeeper.robot;
    this.top.hud.lives = this.robot.health;
    this.top.update();

    this.bottom.hud.score = ScoreKeeper.kid;
    this.bottom.hud.lives = this.kid.health;
    this.bottom.update();

    if (this.robot.isOuched == false) {
      this.robot.body.velocity.x = 0;
    }
    this.game.physics.arcade.collide(this.top.foreground, this.robot);
    this.game.physics.arcade.collide(this.top.rocks, this.robot, function(sprite, rock) {
      sprite.body.velocity.x = -1 * speed.getSpeed();
    });

    if (this.kid.isOuched == false) {
      this.kid.body.velocity.x = 0;
    }
    this.game.physics.arcade.collide(this.bottom.foreground, this.kid);
    this.game.physics.arcade.collide(this.bottom.rocks, this.kid, function(sprite, rock) {
      sprite.body.velocity.x = -1 * speed.getSpeed();
    });

    this.game.physics.arcade.collide(this.top.foreground, this.rocket, this.rocketEsplode, null, this);
    this.game.physics.arcade.overlap(this.kid, this.bottom.ouchies, this.onOuched, null, this);
    this.game.physics.arcade.overlap(this.robot, this.top.ouchies, this.onOuched, null, this);

    this.game.physics.arcade.overlap(this.kid, this.bottom.sadhappies, function(kid, sadhappy) {
      sadhappy.makeSuperCool();
      ScoreKeeper.kid += 10;
      this.top.generateOuchy();
    }, null, this);

    this.game.physics.arcade.overlap(this.robot, this.top.sadhappies, function(kid, sadhappy) {
      sadhappy.makeSuperCool();
      ScoreKeeper.robot += 10;
      this.bottom.generateOuchy();
    }, null, this);

    this.robot.update();
    this.kid.update();

    if (this.robot.health < 0 || this.kid.health < 0) {
      ScoreKeeper.robotDead = Boolean(this.robot.health < 0);
      ScoreKeeper.kidDead = Boolean(this.kid.health < 0);
      console.log(ScoreKeeper, this.robot.health, this.kid.health);
      this.game.state.start('gameover');
    }
  },
  
  onOuched: function (actor, ouchy) {
    actor.ouch();
    ouchy.kill();
  },

  rocketEsplode: function (ground, rocket) {
    rocket.kill();
    var explosion = this.game.add.sprite(rocket.body.x, rocket.body.y, 'explosion');
    
    explosion.animations.add('initial', null, 256);
    explosion.animations.play('initial');
    this.game.time.events.add(Phaser.Timer.SECOND * .5, explosion.kill, explosion);
  },
  
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;

},{"../prefabs/actor.js":3,"../prefabs/environment.js":5,"../prefabs/rocket.js":10,"../services/distance":11,"../services/gameSpeed":12,"../services/music":13,"../services/scorekeeper":15}],20:[function(require,module,exports){

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
    this.load.spritesheet('robot', 'assets/rosie_walk.png',78,140,10);
    this.load.spritesheet('kid', 'assets/stormie_walk_w_can.png',91,120,10);
    this.load.spritesheet('explosion', 'assets/boom3_0.png',64,64,64);
    this.load.atlas('blue_clouds', 'assets/bkg_blue-clouds.png', 'assets/bkg_blue-clouds.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.atlas('black_clouds', 'assets/bkg_black-clouds.png', 'assets/bkg_black-clouds.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.image('rock', 'assets/rock-70.png');
    this.load.atlas('fliers', 'assets/fliers.png', 'assets/fliers.json', null, Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
    this.load.spritesheet('heads', 'assets/heads.png', 50, 50);
    this.load.audio('theme', ['assets/8BitMetal.m4a']);
    this.load.audio('altTheme', ['assets/HappyLevel.m4a']);
    this.load.audio('intro', ['assets/IntroLoop.mp3']);
    this.load.audio('victory', ['assets/VictoryMusic.m4a']);
    this.load.audio('explosion1', 'assets/explosion1.m4a', true);
    this.load.audio('explosion2', 'assets/explosion2.m4a', true);
    this.load.audio('explosion3', 'assets/explosion3.m4a', true);
    this.load.audio('rocketSound', 'assets/sfx_fly.mp3', true);
    this.load.audio('pop', 'assets/Picked Coin Echo.m4a', true);
    this.load.audio('girlHurt1', 'assets/Female - Oof 1.m4a', true);
    this.load.audio('girlHurt2', 'assets/Female - Ouch 1.m4a', true);
    this.load.audio('bee', 'assets/bee1.m4a', true);
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
    require('../services/distance').init(this.game);
    var music = require('../services/music');
    music.init(this.game);
    
    music.playIntroMusic();
    this.asset.kill();

    this.titleText = this.game.add.bitmapText(this.game.width * .5, this.game.height * .4, 'pixelation', '"DIVIDED WE FAIL"', 48);
    this.titleText.updateTransform();
    this.titleText.x = this.game.width / 2 - this.titleText.textWidth / 2;

    this.ready = true;

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

},{"../services/distance":11,"../services/music":13}]},{},[2])