game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// let platforms;
// let ground;
// let ledge;
// let player;
// let score = 0;
// let scoreText;
// let bombs;
// let isGameOver = false;

score = 0;
isGameOver = false;

function preload() {
  game.load.image('sky', 'art/sky.png')
  game.load.image('ground', 'art/platform.png')
  game.load.image('star', 'art/star.png')
  game.load.spritesheet('dude', 'art/dude.png', 32, 48)
  game.load.image('bomb', 'art/bomb.png')
}

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  game.add.sprite(0, 0, 'sky')

  platforms = game.add.group()
  platforms.enableBody = true

  ground = platforms.create(0, game.world.height - 64, 'ground')
  ground.scale.setTo(2, 2)
  ground.body.immovable = true;

  ledge = platforms.create(400, 400, 'ground')
  ledge.body.immovable = true

  ledge = platforms.create(-150, 250, 'ground')
  ledge.body.immovable = true

  player = game.add.sprite(32, game.world.height - 150, 'dude')
  game.physics.arcade.enable(player)
  // player.body.bounce.y = 0.2
  player.body.gravity.y = 300
  player.body.collideWorldBounds = true

  player.animations.add('left', [0, 1, 2, 3], 10, true)
  player.animations.add('right', [5, 6, 7, 8], 10, true)

  stars = game.add.group()
  stars.enableBody = true

  for (var i = 0; i < 12; i++) {
    var star = stars.create(i * 70, 0, 'star')
    star.body.gravity.y = 20
    star.body.bounce.y = 0.7 + Math.random() * 0.2
  }

  scoreText = game.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'})

  bombs = game.add.group();
  bombs.enableBody = true;

}

function update() {
  let hitPlatforms = game.physics.arcade.collide(player, platforms)
  cursors = game.input.keyboard.createCursorKeys()
  player.body.velocity.x = 0
  if (cursors.left.isDown) {
    player.body.velocity.x = -150
    player.animations.play('left')
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150
    player.animations.play('right')
  } else {
    player.animations.stop()
    player.frame = 4
  }

  if (cursors.up.isDown && player.body.touching.down && hitPlatforms) {
    player.body.velocity.y = -350
  }

  game.physics.arcade.collide(stars, platforms)
  game.physics.arcade.collide(bombs, platforms)

  game.physics.arcade.collide(player, bombs, hitBomb, null, this)

  game.physics.arcade.overlap(player, stars, collectStar, null, this)
}

function collectStar(player, star) {
  star.kill();
  score += 10
  scoreText.text = 'Score: ' + score;

  if (stars.countLiving() === 0) {
    stars.iterate('alive', false, 1, reviveStars, this)
    // var x = (player.x < 400) ? (game.math.between(400, 800)) : (game.math.between(0, 400))
    var x = (player.x < 400) ? (Math.ceil(Math.random() * 400) + 400) : (Math.ceil(Math.random() * 400))
    var bomb = bombs.create(x, 16, 'bomb');
    bomb.body.bounce.set(1);
    bomb.body.collideWorldBounds = true;
    bomb.body.velocity.setTo((Math.ceil(Math.random() * 400) - 200), 20);
    bomb.body.allowGravity = false;
  }
}

function reviveStars(star) {
  star.reset(star.x, 0)
}

function hitBomb (player, bomb)
{
    game.physics.arcade.isPaused = true;
    gameOver()
}

function gameOver() {
  // bullets.removeAll(true)
  // messageDisplay.text = "Press spacebar to start"
  isGameOver = true;
}
