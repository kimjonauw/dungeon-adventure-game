class VPauseMenu {
    static myCurrentScreen = 'none';
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
                this.myCurrentScreen = 'none'
            }

            //load
            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.4 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 0.6
            ) {
                console.log('load')
                this.myCurrentScreen = 'load'
                // this.setIsPaused()
                // VMainMenu.setMainMenu()
            }

            if (
                mouseX >= width / 2 - menuWidth / 2 &&
                mouseX <= width / 2 - menuWidth / 2 + menuWidth &&
                mouseY >= height / 2 - menuHeight / 2 + menuHeight * 0.8 &&
                mouseY <= height / 2 - menuHeight / 2 + menuHeight * 1.0
            ) {
                this.myCurrentScreen = 'none'
                VMainMenu.setMainMenu()
            }
        }
    }
    static keyPressed() {
        if (keyCode === 27 || keyCode === 80) { // escape key or p
            if (this.myCurrentScreen != 'none') {
                this.myCurrentScreen = 'none'
            } else {
                this.myCurrentScreen = 'paused'
            }

        }
    }


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
        if (this.myCurrentScreen == 'load') {
            push()
            textFont(FONT["REGULAR"])
            textSize(width / 30)
            noStroke()
            fill(0, 0, 0, 100)


            rect(width * 0.15, height / 2 - width / 10, width / 5, width / 5, 5 * M)
            rect(width * 0.4, height / 2 - width / 10, width / 5, width / 5, 5 * M)
            rect(width * 0.65, height / 2 - width / 10, width / 5, width / 5, 5 * M)

            fill(177,188,184)
            text("Save 1", width * 0.2, height * 0.675 - width / 10)
            text("Save 2", width * 0.45, height * 0.675 - width / 10)
            text("Save 3", width * 0.7, height * 0.675 - width / 10)

            pop()
        }
    }

    static getIsPaused() {
        return this.myCurrentScreen != 'none';
    }

}