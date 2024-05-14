class Sprite {
    myPos;
    myImage;
    mySize;
    myIsCollideable;

    constructor({ thePos, theSize, theImage, theIsCollideable, theHFrames, theVFrames, theFrame, theFrameSize, theOffset, theAnimation }) {
        this.myPos = thePos;
        this.myImage = theImage;
        this.mySize = theSize;
        this.myIsCollideable = theIsCollideable
        this.myHFrames = theHFrames ?? 1
        this.myVFrames = theVFrames ?? 1
        this.myFrame = theFrame ?? 0
        this.myFrameMap = new Map()
        this.myFrameSize = theFrameSize ?? createVector(16,16)
        this.myOffset = theOffset ?? createVector(0,0)
        this.myAnimation = theAnimation ?? null
        this.makeFrameMap()
    }

    makeFrameMap() {
        let counter = 0
        for (let a = 0; a < this.myVFrames; a++) {
            for (let b = 0; b < this.myHFrames; b++) {
                this.myFrameMap.set(
                    counter,
                    createVector(b * this.myFrameSize.x, a * this.myFrameSize.y)
                )
                counter++
            }
        }
    }

    collide(thePos) {
        if (!this.myIsCollideable) {
            return false;
        }

        return abs(thePos.x - this.myPos.x) < CELLSIZE / 2 && abs(thePos.y - this.myPos.y) < CELLSIZE / 2

        // let theSpriteSize = theSprite.getSize()
        // let theDistance = abs(dist(this.getMiddle().x, this.getMiddle().y, theSprite.getMiddle().x, theSprite.getMiddle().y))
        // if (theDistance > abs(sqrt((this.mySize.x ^ 2) + (theSpriteSize.x ^ 2)))) {
        //     return false
        // }
        // return true
    }

    draw() {
        let frame = this.myFrameMap.get(this.myFrame)
        image(this.myImage, this.myPos.x * CELLSIZE + this.myOffset.x * CELLSIZE, this.myPos.y * CELLSIZE + this.myOffset.y * CELLSIZE, this.mySize.x * CELLSIZE, this.mySize.y * CELLSIZE, frame.x, frame.y, this.myFrameSize.x, this.myFrameSize.y)
    }

    step(theDelta) {
        if (!this.myAnimation) {
            return
        }
        this.myAnimation.step(theDelta)
        this.myFrame = this.myAnimation.getFrame()
    }

    playAnimation(theAnimation, theTime) {
        if (this.myAnimation) {
            this.myAnimation.play(theAnimation, theTime)
        }
    }

    setPos(theVector) {
        this.myPos = theVector
    }
    getPos() {
        return this.myPos
    }

    getSize() {
        return this.mySize
    }

    setSize(theSize) {
        this.mySize = theSize;
    }

    getMiddle() {
        return createVector(this.myPos.x + ((this.mySize.x * CELLSIZE)/ 2), this.myPos.y + ((this.mySize.y * CELLSIZE) / 2))
    }

}