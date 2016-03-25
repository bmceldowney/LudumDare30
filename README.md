Ludum Dare 30
=============

http://bmceldowney.github.io/LudumDare30/dist/

What it is
----------

Ludum Dare is an accelerated video game development competition. Participants have
one weekend to build a game from scratch, and then submit them for review where they
will be judged on many different criteria including gameplay mechanics, story and
graphics.

How to build it
---------------

### You will need

#### NodeJS >= 0.10.x
[Node Version Manager](creationix/nvm) is highly recommended for switching between versions.
```bash
$ curl https://raw.githubusercontent.com/creationix/nvm/v0.13.1/install.sh | bash
$ nvm install 0.10
$ nvm use 0.10ode -v
v0.10.29
```

#### Grunt and Bower
Build and client-side package libraries. Necessary for winners.
```bash
$ sudo npm install -g grunt-cli bower
```

### Then...
```bash
$ git clone https://github.com/ninjascribble/LudumDare30.git
$ cd LudumDare30
$ npm install
...
$ grunt
```

It might take a while to install all the **npm** and **bower** dependencies
(PhaserJS is pretty huge).

Running `grunt` will build the project, immediately launch it in your browser
and start a **livereload** service that will watch for changes. Pretty sweet!

Contributors
------------
**Ben McEldowney:** https://github.com/bmceldowney  
**Benjamin Bostow:** https://github.com/bbostow  
**Scott Grogan:** https://github.com/ninjascribble  
**Jessica Eggerth:** www.linkedin.com/in/jessicaeggerth
