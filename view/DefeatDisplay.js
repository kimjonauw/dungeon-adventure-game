class DefeatDisplay {
    constructor() {
        this.isRunning = false;
    }

    static draw(){
        push()
        fill('black')
        rect(0, 0, width, height)
        pop()
        console.log("hello")
    }

    static mouseClicked() {
        if (
            mouseX >= 0 &&
            mouseX <= width &&
            mouseY >= 0 &&
            mouseY <= height
            
        ) {
            
            this.isRunning = false;
            return
        }
    }
}
