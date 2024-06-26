const VD_PRIEST_VECTOR_X = 4.5;

const VD_WARRIOR_VECTOR_X = 6.5;

const VD_ASSASSIN_VECTOR_X = 8.5;

const VD_DINO_VECTOR_X = 10.5;

const VD_VECTOR_Y_ONE = 9.5;

const VD_SCALE_BY_TWO = 2;
const VD_SCALE_BY_FOUR = 4;
const VD_SCALE_BY_EIGHT = 8;
const VD_SCALE_BY_TWENTY = 20;

const VD_MAIN_TEXT_SIZE = .05;
const VD_SMALL_TEXT_SIZE = .025;

/**
 * The VictoryDisplay class is responsible for managing and displaying the victory screen.
 * It provides methods to draw the screen, render characters, and handle mouse clicks.
 */
class VictoryDisplay {
    myIsRunning;
    myPriestDisplay;
    myWarriorDisplay;
    myAssassinDisplay;
    myDinoDisplay;

    /**
     * The constructor initializes the victory screen with characters.
     */
    constructor() {
        this.myIsRunning = false;
        this.myPriestDisplay = CharacterFactory.createCharacter("priest");
        this.myWarriorDisplay = CharacterFactory.createCharacter("warrior");
        this.myAssassinDisplay = CharacterFactory.createCharacter("assassin");
        this.myDinoDisplay = CharacterFactory.createCharacter("dino");

        this.myPriestDisplay.setPos(createVector(VD_PRIEST_VECTOR_X, VD_VECTOR_Y_ONE));
        this.myWarriorDisplay.setPos(createVector(VD_WARRIOR_VECTOR_X, VD_VECTOR_Y_ONE));
        this.myAssassinDisplay.setPos(createVector(VD_ASSASSIN_VECTOR_X, VD_VECTOR_Y_ONE));
        this.myDinoDisplay.setPos(createVector(VD_DINO_VECTOR_X, VD_VECTOR_Y_ONE));
    }

    /**
     * The draw method is used to draw the victory screen.
     * It displays a black background, text messages, and characters.
     */
    draw(){
        push()
        fill('black')
        rect(0, 0, width, height)
        fill("white")
        textAlign(CENTER, CENTER);
        textSize(width * VD_MAIN_TEXT_SIZE);
        text("You Have Won!", width/VD_SCALE_BY_TWO - width/VD_SCALE_BY_FOUR, height/VD_SCALE_BY_TWO - height/VD_SCALE_BY_EIGHT, width/VD_SCALE_BY_TWO, height/VD_SCALE_BY_FOUR)
        textSize(width * VD_SMALL_TEXT_SIZE);
        text("Click Screen to Main Menu", width/VD_SCALE_BY_TWO - width/VD_SCALE_BY_FOUR, height/VD_SCALE_BY_TWO + height/VD_SCALE_BY_TWENTY, width/VD_SCALE_BY_TWO, height/VD_SCALE_BY_FOUR)
        this.myPriestDisplay.draw();
        this.myWarriorDisplay.draw();
        this.myAssassinDisplay.draw();
        this.myDinoDisplay.draw();
        pop();
    }

    /**
     * The characterRendering method is used to update the characters' states.
     * @param {number} time - The current time or tick.
     */
    characterRendering(time) {
        this.myPriestDisplay.step(time);
        this.myWarriorDisplay.step(time);
        this.myAssassinDisplay.step(time);
        this.myDinoDisplay.step(time);
    }

    /**
     * The mouseClicked method is used to handle mouse click events.
     * It checks if the mouse click is within the screen bounds and stops the victory screen if it is.
     */
    mouseClicked() {
        if (
            mouseX >= 0 &&
            mouseX <= width &&
            mouseY >= 0 &&
            mouseY <= height
            
        ) {
            
            this.myIsRunning = false;
            return
        }
    }
}