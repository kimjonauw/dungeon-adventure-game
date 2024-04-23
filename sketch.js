
let player
let font
let cellSize
let cellNumber = 15
let targetPos
function preload() {
  font = loadFont('./assets/fonts/LeagueSpartan-Regular.ttf')
}
let ratio = 1;
let W, H;

let tick
let render
let tryMove

let gameLoop
let FactoryInstance 

function setup() {
 
  if (gameLoop) {
    gameLoop.stop()
  }

  window.innerHeight <= window.innerWidth
  ? ((W = Math.max(window.innerHeight, 1) * ratio),
    (H = Math.max(window.innerHeight, 1)))
  : ((W = Math.max(window.innerWidth, 1)),
    (H = Math.max(window.innerWidth, 1) / ratio));
  createCanvas(W, H);
  cellSize = W / cellNumber
  textFont(font)

  // frameRate(60)
  // pixelDensity(4)
  let obstacleImage = createGraphics(cellSize, cellSize)
  obstacleImage.background(0, 0, 0)
  FactoryInstance = new Factory()
  FactoryInstance.addEntity(new Sprite({ thePos: createVector(getCell(0), getCell(0)), theSize: createVector(cellSize,cellSize), theImage: obstacleImage, theIsCollideable: true }))
  FactoryInstance.addEntity(new Sprite({ thePos: createVector(getCell(9), getCell(4)), theSize: createVector(cellSize,cellSize), theImage: obstacleImage, theIsCollideable: true }))

  let playerImage = createGraphics(50, 50)
  playerImage.background(255, 0, 0)
  player = new Character({thePos: createVector(getCell(7), getCell(7)), theSize: createVector(cellSize, cellSize), theImage: playerImage})
  targetPos = player.getPos().copy()

  tryMove = () => {


    let currentTargetPos = targetPos.copy()
    if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //D right
      targetPos.add(createVector(cellSize, 0));
    } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //A left
      targetPos.add(createVector(-cellSize, 0));
    } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) { //W up
      targetPos.add(createVector(0, -cellSize));
    } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { //S down
      targetPos.add(createVector(0, cellSize));
    } else {
      return
    }
    

    if (FactoryInstance.checkCollision(player,targetPos)) {
      console.log('colliding')
      targetPos = currentTargetPos
    }
  
  }
  tick = (time) => {
    // console.log(time)
    let distance = moveTowards(player, targetPos, cellSize/17)
    if (distance <= 1) {
      tryMove()
    }
  
  }
  render = () => {
    background(220);
    
    push()
    translate(width / 2 - player.getPos().x - cellSize / 2, height / 2 - player.getPos().y - cellSize / 2);
    drawGridDebug()
  
    // circle(width / 2, height / 2, 200)
  
    FactoryInstance.draw()
    player.draw()
    pop()
  
  
    textSize(32);
    text(round(frameRate()), 0, 32)
  
  
    if (isPaused) {
      push()
      rectMode(CENTER)
      rect(width/2,height/2,width/2)
      pop()
    }
  
  }
  gameLoop = new GameLoop(tick, render)
  gameLoop.start()
  
  // let textBox = new TextBox()
  // textBox.loop.start()
  // textBox.add({text:"HELLO", x:width/2, y:height/2, width:100})
}

// function draw() {
//   tick()
//   render()
// }

function windowResized() {

  setup()
}

let isPaused = false
function keyPressed() {
  if (keyCode === 27 || keyCode === 80) { // escape key or p
    console.log(keyCode)
    isPaused = !isPaused
  }
}

function drawGridDebug() {

  for (let a = 0; a < cellNumber; a += 1) {

    for (let b = 0; b < cellNumber; b += 1) {
      rect(b * cellSize, a * cellSize, cellSize)
    }
  }
}

function getCell(theIndex) {
  return cellSize * theIndex
}

function moveTowards(person, destinationPosition, speed) {

  let distance = dist(destinationPosition.x, destinationPosition.y, person.getPos().x, person.getPos().y)

  if (distance <= speed) {
    // If we're close enough, just move directly to the destination
    person.getPos().set(destinationPosition)
  } else {
    // Otherwise, move by the specified speed in the direction of the destination
    let normalized = createVector(destinationPosition.x - person.getPos().x, (destinationPosition.y - person.getPos().y)).normalize()
    person.getPos().add(normalized.x * speed, normalized.y * speed)

    // Recalculate remaining distance after the move
    distance = dist(destinationPosition.x, destinationPosition.y, person.getPos().x, person.getPos().y)
  }

  return distance;
}