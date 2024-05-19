
p5.disableFriendlyErrors = true; // disables FES uncomment to increase performance
let font
let CELLSIZE
let TILEMAP
let cellNumber = 15
function preload() {
  font = loadFont('./assets/fonts/LeagueSpartan-Regular.ttf')
  TILEMAP = loadImage('./assets/images/tilemap.png')
}
let ratio = 1;
let W, H;

let tick
let render
let tryMove
let M

let instanceTransition = new TransitionEffect()
let instanceGameLoop = null
let instanceFactory = null
let instanceTargetPos = null
let instancePlayer = null
let instanceBattle = null
let instanceTextBox = null


window.addEventListener("e-battle-start", (E) => {

  instanceTextBox.add({text:E['detail'].getName()+" battle"})
  instanceBattle = new BattleSystem(instancePlayer, E['detail'])
  instanceBattle.battleDisplay();
  console.log(E['detail'])
})

window.addEventListener("e-battle-end", (E) => {
  window.dispatchEvent(new Event('e-player-unfreeze'))
  console.log('battle end')
})

window.addEventListener("e-textbox-add", (E) => {
  // instanceTextBox.add()
})

window.addEventListener('e-transition', (E) => {
  instanceTransition.transition();
  console.log("here")
})

window.addEventListener("e-pickup", (E) => {
  instanceTextBox.add({text:"Found a " + E['detail'].getName() + "!"})
  window.dispatchEvent(new CustomEvent("e-entity-remove", E))
  // instanceFactory.removeEntity(E['detail'])
})

window.addEventListener("e-entity-remove", (E) => {
  instanceFactory.removeEntity(E['detail'])
})

window.addEventListener("e-player-freeze", (E) => {
  instancePlayer.setIsFrozen(1)
})

window.addEventListener("e-player-unfreeze", (E) => {
  instancePlayer.setIsFrozen(-1)
})

window.addEventListener("e-player-die", (E) => {
    instanceTextBox.add({text:"You died!"})
});

window.addEventListener("e-player-win", (E) => {
    instanceTextBox.add({text:"You win!"})
});

window.addEventListener("e-player-block", (E) => {
    instanceTextBox.add({text:instancePlayer.getName() + " has blocked!"});
});
window.addEventListener("e-player-heal", (E) => {
    instanceTextBox.add({text:instancePlayer.getName() + " has healed!"});
});

window.addEventListener("e-player-miss", (E) => {
    instanceTextBox.add({text:instancePlayer.getName() + " has missed!"});
});
window.addEventListener("e-monster-attack", (E) => {
    instanceTextBox.add({text:E['detail'].getName() + " has attacked!"});
});

window.addEventListener("e-monster-miss", (E) => {
    instanceTextBox.add({text:E['detail'].getName() + " has missed!"});
})

let TILEMAP_ASSASSIN
let TILEMAP_OGRE
let TILEMAP_SKELETON
let TILEMAP_GREMLIN
let TILEMAP_POTION_HEALTH
function setup() {
  TILEMAP_ASSASSIN = TILEMAP.get(32*16, 2 * 16, 9* 16, 2 * 16)
  TILEMAP_OGRE = TILEMAP.get(23*16, 10 * 16, 9* 16, 2 * 16)
  TILEMAP_SKELETON = TILEMAP.get(23*16, 4 * 16, 9* 16, 2 * 16)
  TILEMAP_GREMLIN = TILEMAP.get(23*16, 20 * 16, 9* 16, 2 * 16)
  TILEMAP_POTION_HEALTH = TILEMAP.get(18*16, 13 * 16, 1 * 16, 1 * 16)

  // randomSeed(0)
  window.innerHeight <= window.innerWidth
    ? ((W = Math.max(window.innerHeight, 1) * ratio),
      (H = Math.max(window.innerHeight, 1)))
    : ((W = Math.max(window.innerWidth, 1)),
      (H = Math.max(window.innerWidth, 1) / ratio));
  CELLSIZE = floor(W / cellNumber)
  createCanvas(CELLSIZE * cellNumber, CELLSIZE * cellNumber);
  M = CELLSIZE / 16
  textFont(font)
  if (!instanceGameLoop) {
    instanceGameLoop = new GameLoop();
  }
  if (instanceGameLoop) {
    instanceGameLoop.stop()
  }
  if (!instanceFactory) {
    instanceFactory = new Factory()
  }


  if (!instancePlayer) {
    let playerImage = createGraphics(50, 50)
    playerImage.background(255, 0, 0)
    instancePlayer = new Assassin({
      thePos: createVector((6), (6)),
      theSize: createVector(1, 2),
      theImage: TILEMAP_ASSASSIN,
      theHFrames: 9,
      theVFrames: 1,
      theFrame: 0,
      theFrameSize: createVector(16,32),
      theOffset: createVector(0, -1.2),
      theName: "Tester",
      theHitPoints: 1000,
      theAttack: new Attack(100, 100),
      theStamina: 10,
      theBag: [],
      theBlockPercentage: 0,
      theSpecialAttack: new Attack(200, 100),
      theAnimation: new Animations({
        stand: new FramePattern(ANIM_STAND),
        walk: new FramePattern(ANIM_WALK)
      }),
    });
    
    instanceTargetPos = instancePlayer.getPos().copy()
  }
  // instancePlayer.setSize(createVector(CELLSIZE, CELLSIZE * 2))



  // frameRate(60)
  // pixelDensity(4)
  let obstacleImage = createGraphics(CELLSIZE, CELLSIZE)
  obstacleImage.background(0, 0, 0)
  // for (let a = 0; a < 10000; a++) {
  //   instanceFactory.addEntity(new Sprite({ thePos: createVector(getCellToPos(round(random(-100,100))), getCellToPos(4)), theSize: createVector(CELLSIZE,CELLSIZE), theImage: obstacleImage, theIsCollideable: true }))
  // }






  tryMove = () => {


    let potentialTargetPos = instanceTargetPos.copy()
    let newDirection = null;
    if(!IS_PAUSED) {
      if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) { //D right
        potentialTargetPos.add(createVector(1, 0));
        newDirection = 'east'
        instancePlayer.playAnimation('walk')
      } else if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { //A left
        potentialTargetPos.add(createVector(-1, 0));
        newDirection = 'west'
        instancePlayer.playAnimation('walk')
      } else if (keyIsDown(87) || keyIsDown(UP_ARROW)) { //W up
        potentialTargetPos.add(createVector(0, -1));
        newDirection = 'north'
        instancePlayer.playAnimation('walk')
      } else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) { //S down
        potentialTargetPos.add(createVector(0, 1));
        newDirection = 'south'
        instancePlayer.playAnimation('walk')
      } else {
        instancePlayer.playAnimation('stand')
        return
      }
    }


    if (!instanceFactory.checkCollision(instancePlayer, potentialTargetPos)) {
      instanceTargetPos = potentialTargetPos
    } else {
      console.log('colliding')
    }

    instancePlayer.setDirection(newDirection)
    if (instanceFactory.checkDoor(instancePlayer, potentialTargetPos)) {
      instanceTargetPos = instancePlayer.getPos()
    }


  }


  instanceGameLoop.setTickFunction(
    (time) => {
      // console.log(time)
  
      if (!instancePlayer.getIsFrozen()) {

        let distance = moveTowards(instancePlayer, instanceTargetPos, 1/25)
        if (distance <= 0.01) {
          tryMove()
        }
        instancePlayer.step(time)
        instanceFactory.step(time)

      }
    }
  )
  instanceGameLoop.setRenderFunction(
    () => {
      background(0);
  
      push()
      translate(round(width / 2 - getCellToPos(instancePlayer.getPos().x) - CELLSIZE / 2), round(height / 2 - getCellToPos(instancePlayer.getPos().y) - CELLSIZE / 2));
      // drawGridDebug()
  
      // instanceFactory.drawDungeon(instancePlayer)
      // instanceFactory.drawOverworld(instancePlayer)
  

      instanceFactory.drawDungeon(instancePlayer)
      instanceFactory.draw(instancePlayer)
      instancePlayer.draw()

      pop()
  
  
      push()
      fill('red')
      textSize(width / 10);
      text(round(frameRate()), 0, width / 10)
  
      pop()
  
  
      if (IS_PAUSED) {
        let menuWidth = width * 0.75
        push()
        translate(menuWidth/6,menuWidth/6)
        textSize(menuWidth * 0.25)
        rect(0,0 , menuWidth)
        

        fill('red')
        rect(0,0 , menuWidth, menuWidth * 0.25)


        fill('blue')
        rect(0, menuWidth * 0.25, menuWidth, menuWidth * 0.25)

        fill('green')
        rect(0, menuWidth * 0.50, menuWidth, menuWidth * 0.25)

        fill('yellow')
        rect(0, menuWidth * 0.75, menuWidth, menuWidth * 0.25)

        fill('black')
        text("Resume", 0, menuWidth * 0.25)
        text("Options", 0, menuWidth * 0.5)
        text("Load", 0, menuWidth * 0.75)
        text("Save", 0, menuWidth * 1)
        pop()
      }
      // image(TILEMAP_PLAYER,0,0)
      if(instanceTransition.drawerStatus()) instanceTransition.drawer();
      if(instanceBattle != null && instanceBattle.inCombat) instanceBattle.drawer();
    }
  )
  instanceGameLoop.start()


  if (instanceTextBox) {
    instanceTextBox.loop.stop()
    let newTextBox = new TextBox()
    newTextBox.timeCurrent = instanceTextBox.timeCurrent
    newTextBox.currentTextEnd = instanceTextBox.currentTextEnd
    newTextBox.children = instanceTextBox.children
    instanceTextBox = newTextBox
    instanceTextBox.loop.start()
  }
  if (!instanceTextBox) {
    instanceTextBox = new TextBox()
    instanceTextBox.loop.start();
  

    //instanceTextBox.add({text:"Welcome to the Dungeon traveler", x:null, y:null, width:null, height:null, textSize: null})
    //instanceTextBox.add({text:"The game is still in development", x:null, y:null, width:null, height:null, textSize: null})
    //instanceTextBox.add({text:"Explore the dungeon and find the Keys to OO", x:null, y:null, width:null, height:null, textSize: null})
    //instanceTextBox.add({text:"Good Luck and Have fun", x:null, y:null, width:null, height:null, textSize: null})
  }
  console.log(instanceTextBox.children)

}

// function draw() {
//   tick()
//   render()
// }

function windowResized() {

  setup()
}

let IS_PAUSED = false;

function mouseClicked() {
  instanceTextBox.nextText();
  console.log(instanceTextBox)
  //console.log(textBox);

  if (instanceBattle && instanceBattle.inCombat) {
    // basic attack button
    let rect1X = width/2 + 5;
    let rect1Y = height - height/5 + 5;
    let rect1Width = width/4 - 5;
    let rect1Height = height/10 - 5;

// special attack button
    let rect2X = width/2 + 5;
    let rect2Y = height - height/10 + 5;
    let rect2Width = width/4 - 5;
    let rect2Height = height/10 - 10;

// buff button
    let rect3X = width - width/4 + 5;
    let rect3Y = height - height/5 + 5;
    let rect3Width = width/4 - 10;
    let rect3Height = height/10 - 5;

// bag button
    let rect4X = width - width/4 + 5;
    let rect4Y = height - height/10 + 5;
    let rect4Width = width/4 - 10;
    let rect4Height = height/10 - 10;

      if (mouseX > rect1X && mouseX < rect1X + rect1Width && mouseY > rect1Y && mouseY < rect1Y + rect1Height) {
        instanceBattle.turn("move_basic");
        instanceTextBox.add({text:instancePlayer.getName()+" used basic attack!"});
        console.log(instanceTextBox.children)      }

      if (mouseX > rect2X && mouseX < rect2X + rect2Width && mouseY > rect2Y && mouseY < rect2Y + rect2Height) {
        instanceBattle.turn("move_special");
        instanceTextBox.add({text:instancePlayer.getName()+" used special attack!"});
      }

      if (mouseX > rect3X && mouseX < rect3X + rect3Width && mouseY > rect3Y && mouseY < rect3Y + rect3Height) {
        instanceBattle.turn("move_buff");
        instanceTextBox.add({text:instancePlayer.getName()+" used buff!"});
      }

      if (mouseX > rect4X && mouseX < rect4X + rect4Width && mouseY > rect4Y && mouseY < rect4Y + rect4Height) {
        instanceBattle.turn("move_bag");
        instanceTextBox.add({text:"bag"});
      }
    }

}

function keyPressed() {
  if (!instancePlayer.getIsFrozen()) {

  
    if (keyCode === 27 || keyCode === 80) { // escape key or p
      console.log(keyCode)
      IS_PAUSED = !IS_PAUSED
    }
    if (keyCode === 32) { // space key
      instanceFactory.interact(instancePlayer)
      instanceTransition.transition();
    }

  }
 
  if (instanceBattle && instanceBattle.inCombat) {
    if (keyIsDown(49)) { //1 button temporary subsitiution key 1 attack
      instanceBattle.turn("move_basic");
      instanceTextBox.add({text:"basic"});
      console.log("this reaches")
      console.log(instanceTextBox.children)
    } else if (keyIsDown(50)) { //2 button temporary subsitiution key 2 supermove
      instanceBattle.turn("move_special");
      instanceTextBox.add({text:"special"});
    } else if (keyIsDown(51)) { //3 button temporary subsitiution key 3 heal
      instanceBattle.turn("move_buff");
      instanceTextBox.add({text:"buff"});
    } else if (keyIsDown(52)) { //4 button temporary subsitiution key 4 open bag /use potion
      instanceBattle.turn("move_bag");
      instanceTextBox.add({text:"bag"});
    } else {
      return
    }
  }



}

function drawGridDebug() {

  push()
  fill(255)
  strokeWeight(width / 500)
  for (let a = 0; a < cellNumber; a += 1) {

    for (let b = 0; b < cellNumber; b += 1) {
      rect(getCellToPos(b), getCellToPos(a), CELLSIZE)
    }
  }
  pop()
}

function getCellToPos(theIndex) {
  return CELLSIZE * theIndex
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