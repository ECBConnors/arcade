game = new Phaser.Game(600, 600, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });


// let barriers;
// let bullets;
// let frequency = Phaser.Timer.SECOND;
// let stars;
// let score = 0;
// let scoreDisplay;
// let attackLoop;
// let velocity = 200;
// let isGameOver = true;
// let slowMoFactor = 1.0;

frequency = Phaser.Timer.SECOND;
score = 0;
velocity = 200;
isGameOver = true;
slowMoFactor = 1.0;

function preload() {
  game.load.image('bullet', '../assets/snakeBlock.png')
  game.load.image('star', '../assets/star.png')
  game.load.image('barrier', '../assets/barrier.png')
  game.load.image('vertBarrier', '../assets/vertBarrier.png')
}

function create() {
  game.stage.backgroundColor = "#3333EE"
  game.physics.startSystem(Phaser.Physics.ARCADE)

  stars = game.add.group()
  stars.enableBody = true;
  star = stars.create(288, 288, 'star')
  star.body.immovable = true;

  barriers = game.add.group();
  barriers.enableBody = true;

  leftBarrier = barriers.create(255, 270, 'vertBarrier')
  rightBarrier = barriers.create(335, 270, 'vertBarrier')

  topBarrier = barriers.create(270, 250, 'barrier')
  botBarrier = barriers.create(270, 340, 'barrier')

  leftBarrier.body.immovable = true;
  rightBarrier.body.immovable = true;
  topBarrier.body.immovable = true;
  botBarrier.body.immovable = true;

  bullets = game.add.group()
  bullets.enableBody = true;

  leftBarrier.kill()
  rightBarrier.kill()
  topBarrier.kill()
  botBarrier.kill()

  scoreDisplay = game.add.text(16, 16, 'Score: 0', {fontSize: '32px', fill: '#000'})

  messageDisplay = game.add.text(120, 500, 'Press spacebar to start', {fontSize: '32px', fill: '#000'})

  rulesDisplay = game.add.text(10, 550, 'Use the arrow keys to defend the star', {fontSize: '32px', fill: '#000'})

  attackLoop = game.time.create(false)
  attackLoop.loop(frequency, attack, this)
}

function update() {
  game.physics.arcade.collide(bullets, barriers, blocked, null, this)
  game.physics.arcade.collide(bullets, star, gameOver, null, this)
  cursors = game.input.keyboard.createCursorKeys()
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  if (cursors.left.isDown) {
    leftBarrier.revive()
    rightBarrier.kill()
    topBarrier.kill()
    botBarrier.kill()
  } else if (cursors.right.isDown) {
    rightBarrier.revive()
    leftBarrier.kill()
    topBarrier.kill()
    botBarrier.kill()
  } else if (cursors.up.isDown) {
    topBarrier.revive()
    leftBarrier.kill()
    rightBarrier.kill()
    botBarrier.kill()
  } else if (cursors.down.isDown) {
    botBarrier.revive()
    leftBarrier.kill()
    topBarrier.kill()
    rightBarrier.kill()
  }

  if (spacebar.isDown && isGameOver) {
    messageDisplay.text = "";
    score = 0;
    slowMoFactor = 1.0;
    this.time.slowMotion = slowMoFactor;
    scoreDisplay.text = 'Score: ' + score;
    attackLoop.resume();
    attackLoop.start();
    isGameOver = false;
    star.revive()
  }
}

function attack() {
  let rand = Math.ceil(Math.random() * 4)
  let bullet;
  switch (rand) {
    case 1:
      bullet = bullets.create(290, -20, 'bullet')
      bullet.body.velocity.y = velocity
      break;
    case 2:
      bullet = bullets.create(620, 290, 'bullet')
      bullet.body.velocity.x = -velocity
      break;
    case 3:
      bullet = bullets.create(290, 620, 'bullet')
      bullet.body.velocity.y = -velocity
      break;
    case 4:
      bullet = bullets.create(-20, 290, 'bullet')
      bullet.body.velocity.x = velocity
  }
  game.physics.arcade.enable(bullet)
}

function blocked(bullet, barrier) {
  bullet.kill()
  score += 1
  scoreDisplay.text = 'Score: ' + score
  slowMoFactor = slowMoFactor * .95
  game.time.slowMotion = slowMoFactor
}

function gameOver(star, bullet) {
  star.kill()
  attackLoop.pause();
  bullets.removeAll(true)
  messageDisplay.text = "Press spacebar to start"
  isGameOver = true;
}
