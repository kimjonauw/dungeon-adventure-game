/**
 * VPauseMenu class
 * This class is responsible for creating and managing the pause menu in the game.
 * It includes methods for handling mouse clicks, key presses, drawing the menu, and checking if the game is paused.
 */
class VPauseMenu {

    /**
     * Current screen state. It can be 'none', 'paused', 'load', or 'save'.
     */
    static myCurrentScreen = 'none';

    /**
     * Handles mouse click events.
     * Depending on the current screen state and the mouse position, it performs different actions.
     */
    static mouseClicked() {
        let menuWidth = width * 0.6
        let menuHeight = width * 0.5
        if (this.myCurrentScreen == 'paused') {
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.0 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.2
            ) {
                Sound.play("S-button-clicked")
                this.myCurrentScreen = 'none'
            }

            //load
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.4 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.6
            ) {
                Sound.play("S-button-clicked")
                this.myCurrentScreen = 'load'

            }

            //save
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.6 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.8
            ) {
                Sound.play("S-button-clicked")
                this.myCurrentScreen = 'save'

            }

            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.8 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 1.0
            ) {
                Sound.play("S-button-clicked")
                this.myCurrentScreen = 'none'
                VMainMenu.setMainMenu()
            }
        } else if (this.myCurrentScreen == 'load' || this.myCurrentScreen == 'save') {

            if (
                mouseX >= width * 0.15 &&
                mouseX <= width * 0.15 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                Sound.play("S-button-clicked")
                if (this.myCurrentScreen == 'save') {
                    saveGame(0)
                } else {
                    loadGame(0)
                }
                this.myCurrentScreen = 'none'
                console.log('save 1')
            }

            if (
                mouseX >= width * 0.4 &&
                mouseX <= width * 0.4 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                Sound.play("S-button-clicked")
                if (this.myCurrentScreen == 'save') {
                    saveGame(1)
                } else {
                    loadGame(1)
                }
                this.myCurrentScreen = 'none'
                console.log('save 2')
            }

            if (
                mouseX >= width * 0.65 &&
                mouseX <= width * 0.65 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                Sound.play("S-button-clicked")
                if (this.myCurrentScreen == 'save') {
                    saveGame(2)
                } else {
                    loadGame(2)
                }
                this.myCurrentScreen = 'none'
                console.log('save 3')
            }

        }

    }
    static step(theTime) {
        if (this.myCharacterSave0) {
            this.myCharacterSave0.step(theTime)
        }
        if (this.myCharacterSave1) {
            this.myCharacterSave1.step(theTime)
        }
        if (this.myCharacterSave2) {
            this.myCharacterSave2.step(theTime)
        }
    }

    /**
     * Handles key press events.
     * If the escape key or 'p' is pressed, it toggles the pause state of the game.
     */
    static keyPressed() {
        if (keyCode === 27 || keyCode === 80) { // escape key or p
            if (this.myCurrentScreen != 'none') {
                this.myCurrentScreen = 'none'
            } else {
                this.myCurrentScreen = 'paused'
            }

        }
    }

    /**
     * Draws the pause menu on the screen.
     * The appearance of the menu depends on the current screen state.
     */
    static draw() {
        if (this.myCurrentScreen == 'paused') {
            let menuWidth = width * 0.6
            let menuHeight = width * 0.5
            push()
            textFont(FONT["REGULAR"])
            noStroke()
            translate(width / 2 - menuWidth / 2, height / 2 - menuHeight / 2)
            textSize(width / 30)
            fill(0, 0, 0, 100)
            rect(0, 0, menuWidth, menuHeight, 5 * M)
    
            // RESUME
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.2
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0,0 , menuWidth, menuHeight * 0.2, 5 * M)
    
            // OPTIONS
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.2 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.4
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0, menuHeight * 0.2, menuWidth, menuHeight * 0.2, 5 * M)
    
            // LOAD
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.4 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.6
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0, menuHeight * 0.40, menuWidth, menuHeight * 0.2, 5 * M)
    
            // SAVE
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.6 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.8
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0, menuHeight * 0.6, menuWidth, menuHeight * 0.2, 5 * M)

            // EXIT
            fill(0, 0, 0, 25)
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.8 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 1.0
            ) {
                fill(0, 0, 0, 100)   
            }
            rect(0, menuHeight * 0.8, menuWidth, menuHeight * 0.2, 5 * M)
    
            fill(177,188,184)
            textAlign(CENTER,CENTER);
    
            text("Resume", menuWidth / 2, menuHeight * 0.1)
            text("Options", menuWidth / 2, menuHeight * 0.3)
            text("Load", menuWidth / 2, menuHeight * 0.5)
            text("Save", menuWidth / 2, menuHeight * 0.7)
            text("Exit to Main Menu", menuWidth / 2, menuHeight * 0.9)
            pop()
        }


        if (this.myCurrentScreen == 'load' || this.myCurrentScreen == 'save') {
            push()
            textFont(FONT["REGULAR"])
            textSize(width / 30)
            noStroke()
            fill(0, 0, 0, 100)
            if (
                mouseX >= width * 0.15 &&
                mouseX <= width * 0.15 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                fill(0, 0, 0, 125)   
            }
            rect(width * 0.15, height / 2 - width / 10, width / 5, width / 5, 5 * M)

            fill(0, 0, 0, 100)
            if (
                mouseX >= width * 0.4 &&
                mouseX <= width * 0.4 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                fill(0, 0, 0, 125)   
            }
            rect(width * 0.4, height / 2 - width / 10, width / 5, width / 5, 5 * M)

            fill(0, 0, 0, 100)
            if (
                mouseX >= width * 0.65 &&
                mouseX <= width * 0.65 + width / 5 &&
                mouseY >= height / 2 - width / 10 &&
                mouseY <= height / 2 - width / 10 + width / 5
            ) {
                fill(0, 0, 0, 125)   
            }
            rect(width * 0.65, height / 2 - width / 10, width / 5, width / 5, 5 * M)

            fill(177,188,184)
            text("Save 1", width * 0.2, height * 0.675 - width / 10)
            text("Save 2", width * 0.45, height * 0.675 - width / 10)
            text("Save 3", width * 0.7, height * 0.675 - width / 10)

            let save = JSON.parse(window.localStorage.getItem("save"))
            if (save[0] && save[0]["data"]) {
                let date = new Date(save[0]["data"]['timestamp'])
                push()
                textSize(width / 40)
                text(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(), width * 0.185, height * 0.675 - width / 20)
                textSize(width / 45)
                let timeString = date.toLocaleTimeString('en-US')
                timeString = timeString.charAt(2) != ':' ? timeString = '0' + timeString : timeString
                text(timeString, width * 0.19, height * 0.675 - width / 35)
                pop()
                if ((this.myCharacterSave0 && this.myCharacterSave0.getName().toLowerCase() != save[0]["player"]["name"]) || !this.myCharacterSave0 ) {
                    this.myCharacterSave0 = CharacterFactory.createCharacter(save[0]["player"]["name"])
                    this.myCharacterSave0.setPos(createVector(3.5,7.5))
                }
                this.myCharacterSave0.draw()
            }
            if (save[1] && save[1]["data"]) {
                let date = new Date(save[1]["data"]['timestamp'])
                push()
                textSize(width / 40)
                text(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(), width * 0.435, height * 0.675 - width / 20)
                textSize(width / 45)
                let timeString = date.toLocaleTimeString('en-US')
                timeString = timeString.charAt(2) != ':' ? timeString = '0' + timeString : timeString
                text(timeString, width * 0.44, height * 0.675 - width / 35)
                pop()
                if ((this.myCharacterSave1 && this.myCharacterSave1.getName().toLowerCase() != save[1]["player"]["name"]) || !this.myCharacterSave1) {
                    this.myCharacterSave1 = CharacterFactory.createCharacter(save[1]["player"]["name"])
                    this.myCharacterSave1.setPos(createVector(7.5,7.5))
                }
                this.myCharacterSave1.draw()
            }
            if (save[2] && save[2]["data"]) {
                let date = new Date(save[2]["data"]['timestamp'])
                push()
                textSize(width / 40)
                text(date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear(), width * 0.685, height * 0.675 - width / 20)
                textSize(width / 45)
                let timeString = date.toLocaleTimeString('en-US')
                timeString = timeString.charAt(2) != ':' ? timeString = '0' + timeString : timeString
                text(timeString, width * 0.69, height * 0.675 - width / 35)
                pop()
                if ((this.myCharacterSave2 && this.myCharacterSave2.getName().toLowerCase() != save[2]["player"]["name"]) || !this.myCharacterSave2) {
                    this.myCharacterSave2 = CharacterFactory.createCharacter(save[2]["player"]["name"])
                    this.myCharacterSave2.setPos(createVector(11.5,7.5))
                }
                this.myCharacterSave2.draw()
            }

            pop()
        }
    
        // if (this.myCurrentScreen == 'save') {
        //     push()
        //     textFont(FONT["REGULAR"])
        //     textSize(width / 30)
        //     noStroke()
        //     fill(0, 0, 0, 100)
        //     if (
        //         mouseX >= width * 0.15 &&
        //         mouseX <= width * 0.15 + width / 5 &&
        //         mouseY >= height / 2 - width / 10 &&
        //         mouseY <= height / 2 - width / 10 + width / 5
        //     ) {
        //         fill(0, 0, 0, 125)   
        //     }
        //     rect(width * 0.15, height / 2 - width / 10, width / 5, width / 5, 5 * M)

        //     fill(0, 0, 0, 100)
        //     if (
        //         mouseX >= width * 0.4 &&
        //         mouseX <= width * 0.4 + width / 5 &&
        //         mouseY >= height / 2 - width / 10 &&
        //         mouseY <= height / 2 - width / 10 + width / 5
        //     ) {
        //         fill(0, 0, 0, 125)   
        //     }
        //     rect(width * 0.4, height / 2 - width / 10, width / 5, width / 5, 5 * M)

        //     fill(0, 0, 0, 100)
        //     if (
        //         mouseX >= width * 0.65 &&
        //         mouseX <= width * 0.65 + width / 5 &&
        //         mouseY >= height / 2 - width / 10 &&
        //         mouseY <= height / 2 - width / 10 + width / 5
        //     ) {
        //         fill(0, 0, 0, 125)   
        //     }
        //     rect(width * 0.65, height / 2 - width / 10, width / 5, width / 5, 5 * M)

        //     fill(177,188,184)
        //     text("Save 1", width * 0.2, height * 0.675 - width / 10)
        //     text("Save 2", width * 0.45, height * 0.675 - width / 10)
        //     text("Save 3", width * 0.7, height * 0.675 - width / 10)

        //     pop()
        // }
    }

    /**
     * Checks if the game is currently paused.
     * @returns {boolean} True if the game is paused, false otherwise.
     */
    static getIsPaused() {
        return this.myCurrentScreen != 'none';
    }

}