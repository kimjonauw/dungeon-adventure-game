// Background Display
const DISPLAY_SCALE = 5;
const FLOOR_Y = 3;
const WALL_AMT = 2;
// Buttons Size
const BUTTON_WIDTH_SCALE = 4.1
const BUTTON_HEIGHT_SCALE = 10.6
// Button XY
const FIRST_COLUMN_X = 1.985
const SECOND_COLUMN_X = 4.025
const FIRST_ROW_Y = 5.1
const SECOND_ROW_Y = 10.3
// Button Corner Edge
const BUTTON_ROUNDING = 10;

// Hover Effect
const ORIGIN_TRANSPARENCY = 25
const MOUSE_ON_TRANSPARENCY = 100

// Information bars

const BAR_SCALE = 20
const HP_BAR_SCALE = 2;
const HP_BAR_BG_SCALE = 4;
const HP_BAR_BG_HEIGHT_SCALE = 2.2;



class BattleDisplay {
    constructor(theBattleSystem) {
        this.myBattleSystem = theBattleSystem;
        this.playerMaxHealth = this.myBattleSystem.player.getMaxHitPoints();
        this.mobInitialHealth = this.myBattleSystem.mob.myHitPoints;
        this.playerInitialStamina = this.myBattleSystem.player.myStamina;
        this.createClones();
    }

    displayBattle(){
        //window.dispatchEvent(new Event("e-transition"))
        push()
        fill('black')
        rect(0, 0, width, height)
        this.drawWall();
        this.drawFloor();
        //image(this.myTILEMAP, 0, (height * 2)/5, 1 * width/, 2 * height/5);
        pop()

        //background of textbox and buttons
        push()
        fill('white');
        noStroke();
        rect(0, height - height/5, width, height - height/5);
        pop()
        push()

        //buttons
        this.drawButtons()

        // this.drawButtonsText()

        //player spot
        this.playerClone.draw()

        //monster spot
        this.mobClone.draw()

        this.drawHealthStaminaBars()

        // Health numbers
        this.drawHealthStaminaNumbers();
        pop()
    }

    drawWall() {
        image(WALL_IMG, 0, (height * WALL_AMT)/DISPLAY_SCALE, width/WALL_AMT, height/DISPLAY_SCALE);
        image(WALL_IMG, width/WALL_AMT, (height * WALL_AMT)/DISPLAY_SCALE, width/WALL_AMT, height/DISPLAY_SCALE);
    }

    drawFloor() {
        for (let i = 0; i < DISPLAY_SCALE; i++) {
            image(FLOOR_IMG, (width * i/DISPLAY_SCALE), (height * FLOOR_Y)/DISPLAY_SCALE, width/DISPLAY_SCALE, height/DISPLAY_SCALE);
        }
    }

    drawButtons() {
        push()

        //Button Size
        const buttonWidth = width/BUTTON_WIDTH_SCALE;
        const buttonHeight = height/BUTTON_HEIGHT_SCALE;

        // basic attack button X,Y
        const rect1X = width/FIRST_COLUMN_X;
        const rect1Y = height - height/FIRST_ROW_Y;
        // special attack button X,Y
        const rect2X = width/FIRST_COLUMN_X;
        const rect2Y = height - height/SECOND_ROW_Y;
        // buff button X,Y
        const rect3X = width - width/SECOND_COLUMN_X;
        const rect3Y = height - height/FIRST_ROW_Y;
        // bag button X,Y
        const rect4X = width - width/SECOND_COLUMN_X;
        const rect4Y = height - height/SECOND_ROW_Y;

        rect(rect1X, rect1Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);
        rect(rect2X, rect2Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);
        rect(rect3X, rect3Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);
        rect(rect4X, rect4Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);

        textAlign(CENTER, CENTER);
        fill('black');

        text("Basic Attack", rect1X, rect1Y, buttonWidth, buttonHeight);
        switch (this.myBattleSystem.player.getClass()) {
            case 'Assassin':
                text("Quick Attack", rect2X, rect2Y, buttonWidth, buttonHeight);
                break;
            case 'Warrior':
                text("Crushing Blow", rect2X, rect2Y, buttonWidth, buttonHeight);
                break;
            case 'Priest':
                text("Heal", rect2X, rect2Y, buttonWidth, buttonHeight);
                break;
        }
        text("Buff", rect3X, rect3Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);
        text("Bag", rect4X, rect4Y, buttonWidth, buttonHeight, BUTTON_ROUNDING);

        // HEALTH POTION / BAG IS EMPTY
        fill(0, 0, 0, ORIGIN_TRANSPARENCY)
        if (
            mouseX > rect1X && mouseX < rect1X + buttonWidth && mouseY > rect1Y && mouseY < rect1Y + buttonHeight
        ) {
            fill(0, 0, 0, MOUSE_ON_TRANSPARENCY)
        }
        rect(rect1X, rect1Y, buttonWidth, buttonHeight, BUTTON_ROUNDING)

        // PILLAR OF ABSTRACTION
        fill(0, 0, 0, ORIGIN_TRANSPARENCY)
        if (
            mouseX > rect2X && mouseX < rect2X + buttonWidth && mouseY > rect2Y && mouseY < rect2Y + buttonHeight
        ) {
            fill(0, 0, 0, MOUSE_ON_TRANSPARENCY)
        }
        rect(rect2X, rect2Y, buttonWidth, buttonHeight, BUTTON_ROUNDING)

        // PILLAR OF ENCAPSULATION
        fill(0, 0, 0, ORIGIN_TRANSPARENCY)
        if (
            mouseX > rect3X && mouseX < rect3X + buttonWidth && mouseY > rect3Y && mouseY < rect3Y + buttonHeight
        ) {
            fill(0, 0, 0, MOUSE_ON_TRANSPARENCY)
        }
        rect(rect3X, rect3Y, buttonWidth, buttonHeight, BUTTON_ROUNDING)

        // PILLAR OF INHERITANCE
        fill(0, 0, 0, ORIGIN_TRANSPARENCY)
        if (
            mouseX > rect4X && mouseX < rect4X + buttonWidth && mouseY > rect4Y && mouseY < rect4Y + buttonHeight
        ) {
            fill(0, 0, 0, MOUSE_ON_TRANSPARENCY)
        }
        rect(rect4X, rect4Y, buttonWidth, buttonHeight, BUTTON_ROUNDING)

        pop()
    }


    drawHealthStaminaBars() {
        push()
        // Health bar
        let barWidth = width / DISPLAY_SCALE; // Width of the bars
        let barHeight = DISPLAY_SCALE; // Height of the bars

        let playerHealthPercentage = this.myBattleSystem.player.myHitPoints / this.playerMaxHealth;
        let playerHealthBarWidth = barWidth * playerHealthPercentage;
        let mobHealthPercentage = this.myBattleSystem.mob.myHitPoints / this.mobInitialHealth;
        let mobHealthBarWidth = barWidth * mobHealthPercentage;
        let playerStaminaPercentage = this.myBattleSystem.stamina / this.playerInitialStamina;
        let playerStaminaBarWidth = barWidth * playerStaminaPercentage;

        // Draw player's health bar
        fill('red');
        rect(width / BAR_SCALE, height - height / HP_BAR_SCALE, barWidth, barHeight, BUTTON_ROUNDING); // Draw the background of the health bar
        fill('green');
        rect(width / HP_BAR_BG_SCALE - playerHealthBarWidth, height - height / HP_BAR_SCALE, playerHealthBarWidth, barHeight, BUTTON_ROUNDING); // Draw the actual health bar

        // Draw mob's health bar
        fill('red');
        rect(width - width / HP_BAR_BG_SCALE, height - height / HP_BAR_SCALE, barWidth, barHeight, BUTTON_ROUNDING); // Draw the background of the health bar
        fill('green');
        rect(width - width / BAR_SCALE - mobHealthBarWidth, height - height / HP_BAR_SCALE, mobHealthBarWidth, barHeight, BUTTON_ROUNDING); // Draw the actual health bar

        // // Stamina bar
        fill('red');
        rect(width / BAR_SCALE, height - height / HP_BAR_BG_HEIGHT_SCALE, barWidth, barHeight, BUTTON_ROUNDING); // Draw the background of the health bar
        fill('yellow');
        rect(width / HP_BAR_BG_SCALE - playerStaminaBarWidth, height - height / HP_BAR_BG_HEIGHT_SCALE, playerStaminaBarWidth, barHeight, BUTTON_ROUNDING); // Draw the actual health bar
        pop()
    }

    drawHealthStaminaNumbers() {
        push()
        textAlign(RIGHT, CENTER);
        strokeWeight(5);
        fill('white');

        // Player's health
        text(this.myBattleSystem.player.myHitPoints + ' / ' + this.playerMaxHealth, width / 4.7, height - height / 2.1);

        // Mob's health
        text(this.myBattleSystem.mob.myHitPoints + ' / ' + this.mobInitialHealth, width - width / 11.3, height - height / 2.1);

        // Stamina numbers
        text(this.myBattleSystem.stamina + ' / ' + this.playerInitialStamina, width / 5.3, height - height / 2.3);
        pop()
    }

    createClones() {
        const playerConst = this.myBattleSystem.player.constructor;
        const mobConst = this.myBattleSystem.mob.constructor;
        this.playerClone = new playerConst({
            thePos: createVector((5), (8)),
            theSize: createVector(2, 4),
            theImage: this.myBattleSystem.player.myImage,
            theHFrames: 9,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 32),
            theOffset: createVector(0, -1.2),
            theName: "BATTLE_DISPLAY_ONE",
            theHitPoints: 1000,
            theAttack: new Attack(10000, 100),
            theStamina: 10,
            theBlockPercentage: 0,
            theMaxHitPoints: 1000,
            theSpecialAttack: new Attack(200, 100),
            theAnimation: new Animations({
              stand: new FramePattern(ANIM_STAND),
              walk: new FramePattern(ANIM_WALK)
            }),
        })
        this.mobClone = new mobConst ({
            thePos: createVector((10), (8)),
            theSize: createVector(2, 4),
            theImage: this.myBattleSystem.mob.myImage,
            theHFrames: 9,
            theVFrames: 1,
            theFrame: 0,
            theFrameSize: createVector(16, 32),
            theOffset: createVector(0, -1.2),
            theName: "BATTLE_DISPLAY_TWO",
            theHitPoints: 1000,
            theAttack: new Attack(10000, 100),
            theStamina: 10,
            theBlockPercentage: 0,
            theMaxHitPoints: 1000,
            theSpecialAttack: new Attack(200, 100),
            theAnimation: new Animations({
              stand: new FramePattern(ANIM_STAND),
              walk: new FramePattern(ANIM_WALK)
            }),
        })
    }



}